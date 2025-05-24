import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { CreatePacienteDto, UpdatePacienteDto } from './dto/Pacient.dto';
import * as bcrypt from 'bcrypt';
import { Paciente } from 'generated/prisma';

@Injectable()
export class PacientsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreatePacienteDto) {
    const { senha } = createUserDto;

    const hashed = await bcrypt.hash(senha, 10);

    return this.prisma.paciente.create({
      data: {
        ...createUserDto,
        senha: hashed,
      },
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
    const user = await this.prisma.paciente.findUnique({
      where: { id },
      select: { id: true, email: true, role: true },
    });

    if (!user) throw new NotFoundException('Paciente não encontrado');

    return user;
  }

  async update(id: string, updateUserDto: UpdatePacienteDto) {
    const data = { ...updateUserDto };

    if (updateUserDto.senha) {
      data.senha = await bcrypt.hash(updateUserDto.senha, 10);
    }

    return this.prisma.paciente.update({
      where: { id },
      data: data,
    });
  }

  async delete(id: string): Promise<Paciente> {
    return this.prisma.paciente.delete({ where: { id } });
  }
}
