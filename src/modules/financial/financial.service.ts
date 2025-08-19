import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { CreateFinancialDto, UpdateFinancialDto } from './dto/Financial.dto';

@Injectable()
export class FinancialService {
  constructor(private readonly prisma: PrismaService) {}

  async getPsychologistPayments(psicologoId: string) {
    return this.prisma.pagamento.findMany({
      where: {
        atendimento: {
          psicologoId: psicologoId,
        },
      },
      include: {
        atendimento: {
          include: {
            paciente: {
              select: {
                nome: true,
              },
            },
          },
        },
      },
    });
  }

  async getPaymentsByPatientId(pacienteId: string) {
    return this.prisma.pagamento.findMany({
      where: {
        atendimento: {
          pacienteId: pacienteId,
        },
      },
      include: {
        atendimento: {
          include: {
            psicologo: {
              select: {
                nome: true,
              },
            },
          },
        },
      },
    });
  }

  async getPaymentByConsultationId(consultationId: string) {
    return this.prisma.pagamento.findMany({
      where: {
        atendimentoId: consultationId,
      },
      include: {
        atendimento: true,
      },
    });
  }

  async createPayment(payment: CreateFinancialDto) {
    const { atendimentoId, ...data } = payment;
    return this.prisma.pagamento.create({
      data: {
        ...data,
        atendimento: {
          connect: {
            id: atendimentoId,
          },
        },
      },
    });
  }

  async updatePayment(id: string, payment: UpdateFinancialDto) {
    const { atendimentoId, status, ...data } = payment;
    const paymentStatus = status ? 'Pago' : 'Pendente';

    return this.prisma.pagamento.update({
      where: {
        id,
      },
      data: {
        ...data,
        status: paymentStatus,
        atendimento: {
          connect: {
            id: atendimentoId,
          },
        },
      },
    });
  }

  async changePaymentStatus(id: string, paid: boolean) {
    const paymentStatus = paid ? 'Pago' : 'Pendente';

    return this.prisma.pagamento.update({
      where: {
        id,
      },
      data: {
        status: paymentStatus,
      },
    });
  }
}
