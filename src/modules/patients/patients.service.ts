import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { CreatePacienteDto, UpdatePacienteDto } from './dto/Patient.dto';
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
}
