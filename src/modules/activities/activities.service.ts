import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { CreateActivityDto, UpdateActivityDto } from './dto/Activity.dto';

@Injectable()
export class ActivitiesService {
  constructor(private readonly prisma: PrismaService) {}

  async registerActivity(activity: CreateActivityDto) {
    const { pacienteId, ...data } = activity;

    return this.prisma.atividade.create({
      data: {
        ...data,
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
  }

  async getActivitiesByPacienteId(pacienteId: string) {
    return this.prisma.atividade.findMany({
      where: { pacienteId },
      orderBy: { data: 'desc' },
    });
  }

  async getActivityById(id: string) {
    return this.prisma.atividade.findUnique({
      where: { id },
      select: {
        id: true,
        tipo: true,
        descricao: true,
        data: true,
        pacienteId: true,
      },
    });
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
    return this.prisma.atividade.update({
      where: { id },
      data,
      select: {
        id: true,
        tipo: true,
        descricao: true,
        data: true,
        pacienteId: true,
      },
    });
  }
}
