import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { CreateDoctorDto, UpdateDoctorDto } from './dto/Doctor.dto';
import * as bcrypt from 'bcrypt';
import { Psicologo } from 'generated/prisma';
import { encrypt } from 'src/utils/crypto';

@Injectable()
export class DoctorsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDoctorDto: CreateDoctorDto) {
    const { senha, cpf, telefone, ...rest } = createDoctorDto;

    const hashed = await bcrypt.hash(senha, 10);

    return this.prisma.psicologo.create({
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
    const doctors = await this.prisma.psicologo.findMany({
      select: {
        id: true,
        nome: true,
        crp: true,
        endereco: true,
        numero: true,
        _count: {
          select: {
            pacientes: true,
            consultas: true,
          },
        },
      },
    });

    return doctors.map((doctor) => ({
      id: doctor.id,
      nome: doctor.nome,
      crp: doctor.crp,
      endereco: doctor.endereco,
      numero: doctor.numero,
      pacientes: doctor._count.pacientes,
      atendimentos: doctor._count.consultas,
    }));
  }

  async update(id: string, updateUserDto: UpdateDoctorDto) {
    const { telefone, ...rest } = updateUserDto;

    if (updateUserDto.senha) {
      rest.senha = await bcrypt.hash(updateUserDto.senha, 10);
    }

    return this.prisma.psicologo.update({
      where: { id },
      data: {
        ...rest,
        telefone: encrypt(telefone),
      },
      select: { id: true, email: true },
    });
  }

  async delete(id: string): Promise<Omit<Psicologo, 'senha'>> {
    return this.prisma.psicologo.delete({ where: { id } });
  }
}
