import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import {
  CreateActivityDto,
  CreateHumorDto,
  CreatePacienteDto,
  UpdatePacienteDto,
} from './dto/Patient.dto';
import * as bcrypt from 'bcrypt';
import { Paciente } from 'generated/prisma';

@Injectable()
export class PatientsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPacienteDto: CreatePacienteDto) {
    const { senha } = createPacienteDto;

    const hashed = await bcrypt.hash(senha, 10);

    return this.prisma.paciente.create({
      data: {
        ...createPacienteDto,
        senha: hashed,
      },
      select: { id: true, email: true },
    });
  }

  async findAll() {
    const pacients = await this.prisma.paciente.findMany({
      select: {
        id: true,
        nome: true,
        cpf: true,
        dataNascimento: true,
        telefone: true,
        email: true,
      },
    });

    return pacients;
  }

  async findOne(
    id: string,
  ): Promise<{ id: string; email: string; role: string } | null> {
    const pacient = await this.prisma.paciente.findUnique({
      where: { id },
      select: { id: true, email: true, role: true },
    });

    if (!pacient) throw new NotFoundException('Paciente não encontrado');

    return pacient;
  }

  async update(id: string, updateUserDto: UpdatePacienteDto) {
    const data = { ...updateUserDto };

    if (updateUserDto.senha) {
      data.senha = await bcrypt.hash(updateUserDto.senha, 10);
    }

    return this.prisma.paciente.update({
      where: { id },
      data: data,
      select: { id: true, email: true },
    });
  }

  async delete(id: string): Promise<Omit<Paciente, 'senha'>> {
    return this.prisma.paciente.delete({ where: { id } });
  }

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
        pacienteId: true,
      },
    });
  }
}
