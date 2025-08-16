import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import {
  CreateAvailableConsultationDto,
  ScheduleAvailableConsultationDto,
  UpdateAvailableConsultationDto,
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
        pagamentos: true,
      },
    });
  }

  async getConsultationsByPsychologistId(psychologistId: string) {
    return this.prisma.atendimento.findMany({
      where: {
        psicologoId: psychologistId,
      },
      include: {
        paciente: {
          select: {
            id: true,
            nome: true,
            email: true,
          },
        },
        pagamentos: true,
      },
    });
  }

  async getAvailableConsultationsByPsychologistId(id: string) {
    return this.prisma.atendimentoDisponivel.findMany({
      where: {
        psicologoId: id,
      },
      include: {
        psicologo: {
          select: {
            id: true,
            nome: true,
            email: true,
            crp: true,
            telefone: true,
            endereco: true,
            numero: true,
          },
        },
      },
    });
  }

  async createAvailableConsultation(data: CreateAvailableConsultationDto) {
    const { psicologoId, ...rest } = data;
    return this.prisma.atendimentoDisponivel.create({
      data: {
        ...rest,
        psicologo: {
          connect: {
            id: psicologoId,
          },
        },
      },
    });
  }

  async updateAvailableConsultation(
    id: string,
    data: UpdateAvailableConsultationDto,
  ) {
    return this.prisma.atendimentoDisponivel.update({
      where: {
        id,
      },
      data: data,
    });
  }

  async scheduleAvailableConsultation(data: ScheduleAvailableConsultationDto) {
    const availableConsultation =
      await this.prisma.atendimentoDisponivel.findUnique({
        where: {
          id: data.availableConsultationId,
        },
      });

    if (!availableConsultation) {
      throw new Error('Consulta disponível não encontrada');
    }

    return this.prisma.$transaction(async (tx) => {
      const scheduledConsultation = await tx.atendimento.create({
        data: {
          data: availableConsultation.data,
          observacoes:
            data.observacoes || availableConsultation.observacoes || '',
          paciente: {
            connect: {
              id: data.pacienteId,
            },
          },
          psicologo: {
            connect: {
              id: availableConsultation.psicologoId,
            },
          },
        },
        include: {
          paciente: true,
          psicologo: true,
        },
      });

      await tx.atendimentoDisponivel.delete({
        where: {
          id: data.availableConsultationId,
        },
      });

      return scheduledConsultation;
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

  async deleteAvailableConsultation(id: string) {
    return this.prisma.atendimentoDisponivel.delete({
      where: {
        id,
      },
    });
  }
}
