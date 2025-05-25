import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import {
  CreateConsultationDto,
  UpdateConsultationDto,
} from './dto/Consultation.dto';

@Injectable()
export class ConsultationsService {
  constructor(private readonly prisma: PrismaService) {}

  async getConsultationsByPatientId(patientId: string) {
    return this.prisma.atendimento.findMany({
      where: {
        pacienteId: patientId,
      },
      include: {
        psicologo: true,
      },
    });
  }

  async getConsultationById(id: string) {
    return this.prisma.atendimento.findUnique({
      where: {
        id,
      },
      include: {
        psicologo: true,
      },
    });
  }

  async createConsultation(data: CreateConsultationDto) {
    const { pacienteId, psicologoId, ...rest } = data;
    return this.prisma.atendimento.create({
      data: {
        ...rest,
        paciente: {
          connect: {
            id: pacienteId,
          },
        },
        psicologo: {
          connect: {
            id: psicologoId,
          },
        },
      },
    });
  }

  async updateConsultation(id: string, data: UpdateConsultationDto) {
    return this.prisma.atendimento.update({
      where: {
        id,
      },
      data: data,
    });
  }

  async deleteConsultation(id: string) {
    return this.prisma.atendimento.delete({
      where: {
        id,
      },
    });
  }
}
