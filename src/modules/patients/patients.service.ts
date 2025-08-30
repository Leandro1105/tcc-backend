import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { CreatePacienteDto, UpdatePacienteDto } from './dto/Patient.dto';
import * as bcrypt from 'bcrypt';
import { Paciente } from 'generated/prisma';
import { decrypt, encrypt } from 'src/utils/crypto';

@Injectable()
export class PatientsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPacienteDto: CreatePacienteDto) {
    const { cpf, telefone, senha, ...rest } = createPacienteDto;

    const hashed = await bcrypt.hash(senha, 10);

    return this.prisma.paciente.create({
      data: {
        ...rest,
        cpf: encrypt(cpf),
        telefone: encrypt(telefone),
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

    return pacients.map((pacient) => ({
      ...pacient,
      cpf: decrypt(pacient.cpf),
      telefone: decrypt(pacient.telefone),
    }));
  }

  async update(id: string, updateUserDto: UpdatePacienteDto) {
    const { telefone, ...rest } = updateUserDto;

    if (updateUserDto.senha) {
      rest.senha = await bcrypt.hash(updateUserDto.senha, 10);
    }

    return this.prisma.paciente.update({
      where: { id },
      data: {
        ...rest,
        telefone: encrypt(telefone),
      },
      select: { id: true, email: true },
    });
  }

  async delete(id: string): Promise<Omit<Paciente, 'senha'>> {
    return this.prisma.paciente.delete({ where: { id } });
  }
}
