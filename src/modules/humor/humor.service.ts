import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { CreateHumorDto, UpdateHumorDto } from './dto/Humor.dto';

@Injectable()
export class HumorService {
  constructor(private readonly prisma: PrismaService) {}

  async registerHumor(humor: CreateHumorDto) {
    const { pacienteId, ...data } = humor;

    return this.prisma.humor.create({
      data: {
        ...data,
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
  }

  async getHumorByPacienteId(pacienteId: string) {
    const fifteenDaysAgo = new Date();
    fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);

    return this.prisma.humor.findMany({
      where: {
        pacienteId,
        data: {
          gte: fifteenDaysAgo,
        },
      },
      orderBy: { data: 'desc' },
    });
  }

  async getHumorById(id: string) {
    return this.prisma.humor.findUnique({
      where: { id },
      select: {
        id: true,
        observacoes: true,
        escala: true,
        data: true,
        pacienteId: true,
      },
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
    return this.prisma.humor.update({
      where: { id },
      data,
      select: {
        id: true,
        observacoes: true,
        escala: true,
        data: true,
        pacienteId: true,
      },
    });
  }
}
