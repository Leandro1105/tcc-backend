import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { CreateDoctorDto, UpdateDoctorDto } from './dto/Doctor.dto';
import * as bcrypt from 'bcrypt';
import { Psicologo } from 'generated/prisma';

@Injectable()
export class DoctorsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDoctorDto: CreateDoctorDto) {
    const { senha } = createDoctorDto;

    const hashed = await bcrypt.hash(senha, 10);

    return this.prisma.psicologo.create({
      data: {
        ...createDoctorDto,
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

  async findOne(
    id: string,
  ): Promise<{ id: string; email: string; role: string } | null> {
    const doctor = await this.prisma.psicologo.findUnique({
      where: { id },
      select: { id: true, email: true, role: true },
    });

    if (!doctor) throw new NotFoundException('Psicólogo não encontrado');

    return doctor;
  }

  async update(id: string, updateUserDto: UpdateDoctorDto) {
    const data = { ...updateUserDto };

    if (updateUserDto.senha) {
      data.senha = await bcrypt.hash(updateUserDto.senha, 10);
    }

    return this.prisma.psicologo.update({
      where: { id },
      data: data,
      select: { id: true, email: true },
    });
  }

  async delete(id: string): Promise<Omit<Psicologo, 'senha'>> {
    return this.prisma.psicologo.delete({ where: { id } });
  }
}
