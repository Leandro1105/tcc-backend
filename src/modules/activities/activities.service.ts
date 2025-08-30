import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { CreateActivityDto, UpdateActivityDto } from './dto/Activity.dto';
import { decrypt, encrypt } from 'src/utils/crypto';

@Injectable()
export class ActivitiesService {
  constructor(private readonly prisma: PrismaService) {}

  async registerActivity(activity: CreateActivityDto) {
    const { pacienteId, descricao, ...data } = activity;

    const createdActivity = await this.prisma.atividade.create({
      data: {
        ...data,
        descricao: encrypt(descricao),
        paciente: { connect: { id: pacienteId } },
      },
      select: {
        id: true,
        tipo: true,
        descricao: true,
        data: true,
        pacienteId: true,
      },
    });

    return {
      ...createdActivity,
      descricao: decrypt(createdActivity.descricao),
    };
  }

  async getActivitiesByPacienteId(pacienteId: string) {
    const atividades = await this.prisma.atividade.findMany({
      where: { pacienteId },
      orderBy: { data: 'desc' },
    });

    return atividades.map((atividade) => ({
      ...atividade,
      descricao: decrypt(atividade.descricao),
    }));
  }

  async getActivitiesFromPatients(psicologoId: string) {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const psicologoPacientes = await this.prisma.psicologoPaciente.findMany({
      where: { psicologoId },
      include: {
        paciente: {
          include: {
            atividades: {
              where: {
                data: {
                  gte: oneWeekAgo,
                },
              },
              orderBy: { data: 'desc' },
            },
          },
        },
      },
    });

    return psicologoPacientes.map((pp) => ({
      id: pp.paciente.id,
      nome: pp.paciente.nome,
      atividades: pp.paciente.atividades.map((atividade) => ({
        id: atividade.id,
        titulo: atividade.tipo,
        descricao: decrypt(atividade.descricao),
        data: atividade.data.toISOString(),
        categoria: atividade.tipo,
        pacienteId: atividade.pacienteId,
      })),
    }));
  }

  async deleteActivity(id: string) {
    return this.prisma.atividade.delete({
      where: { id },
      select: {
        id: true,
        pacienteId: true,
      },
    });
  }

  async updateActivity(id: string, data: UpdateActivityDto) {
    const { descricao, ...rest } = data;
    const updatedActivity = await this.prisma.atividade.update({
      where: { id },
      data: {
        ...rest,
        descricao: encrypt(descricao),
      },
      select: {
        id: true,
        tipo: true,
        descricao: true,
        data: true,
        pacienteId: true,
      },
    });

    return {
      ...updatedActivity,
      descricao: decrypt(updatedActivity.descricao),
    };
  }
}
