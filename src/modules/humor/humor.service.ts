import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { CreateHumorDto, UpdateHumorDto } from './dto/Humor.dto';
import { decrypt, encrypt } from 'src/utils/crypto';

@Injectable()
export class HumorService {
  constructor(private readonly prisma: PrismaService) {}

  async registerHumor(humor: CreateHumorDto) {
    const { pacienteId, observacoes, ...data } = humor;

    const createdHumor = await this.prisma.humor.create({
      data: {
        ...data,
        observacoes: encrypt(observacoes),
        paciente: { connect: { id: pacienteId } },
      },
      select: {
        id: true,
        escala: true,
        data: true,
        observacoes: true,
        pacienteId: true,
      },
    });

    return {
      ...createdHumor,
      observacoes: decrypt(createdHumor.observacoes),
    };
  }

  async getHumorByPacienteId(pacienteId: string) {
    const fifteenDaysAgo = new Date();
    fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);

    const humores = await this.prisma.humor.findMany({
      where: {
        pacienteId,
        data: {
          gte: fifteenDaysAgo,
        },
      },
      orderBy: { data: 'desc' },
    });

    return humores.map((humor) => ({
      ...humor,
      observacoes: decrypt(humor.observacoes),
    }));
  }

  async getHumorFromPatients(psicologoId: string) {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const psicologoPacientes = await this.prisma.psicologoPaciente.findMany({
      where: { psicologoId },
      include: {
        paciente: {
          include: {
            humor: {
              where: {
                data: {
                  gte: sevenDaysAgo,
                },
              },
              orderBy: { data: 'desc' },
            },
            consultas: {
              where: { psicologoId },
              orderBy: { data: 'desc' },
              take: 1,
            },
          },
        },
      },
    });

    return psicologoPacientes.map((pp) => {
      const humorsFromLastWeek = pp.paciente.humor;
      const totalRegistros = humorsFromLastWeek.length;
      const mediaHumor =
        totalRegistros > 0
          ? humorsFromLastWeek.reduce((sum, humor) => sum + humor.escala, 0) /
            totalRegistros
          : 0;

      const ultimoHumor = humorsFromLastWeek.map((humor) => ({
        id: humor.id,
        data: humor.data.toISOString(),
        escala: humor.escala,
        observacoes: decrypt(humor.observacoes),
        pacienteId: humor.pacienteId,
      }));

      const ultimaConsulta =
        pp.paciente.consultas.length > 0
          ? pp.paciente.consultas[0].data.toISOString()
          : null;

      return {
        id: pp.paciente.id,
        nome: pp.paciente.nome,
        email: pp.paciente.email,
        telefone: pp.paciente.telefone,
        ultimoHumor,
        totalRegistros,
        mediaHumor: Math.round(mediaHumor * 10) / 10,
        ultimaConsulta,
      };
    });
  }

  async deleteHumor(id: string) {
    return this.prisma.humor.delete({
      where: { id },
      select: {
        id: true,
        pacienteId: true,
      },
    });
  }

  async updateHumor(id: string, data: UpdateHumorDto) {
    const { observacoes, ...rest } = data;
    const updatedHumor = await this.prisma.humor.update({
      where: { id },
      data: {
        ...rest,
        observacoes: encrypt(observacoes),
      },
      select: {
        id: true,
        observacoes: true,
        escala: true,
        data: true,
        pacienteId: true,
      },
    });

    return {
      ...updatedHumor,
      observacoes: decrypt(updatedHumor.observacoes),
    };
  }
}
