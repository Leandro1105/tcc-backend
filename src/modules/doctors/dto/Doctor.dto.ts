import {
  IsDate,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Prisma, Tipo } from 'generated/prisma';

export class CreateDoctorDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  cpf: string;

  @IsNotEmpty()
  @IsString()
  crp: string;

  @IsNotEmpty()
  @IsString()
  telefone: string;

  @IsNotEmpty()
  @IsString()
  endereco: string;

  @IsNotEmpty()
  @IsInt()
  numero: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  senha: string;

  @IsString()
  role: Tipo = Tipo.Psicologo;
}

export class UpdateDoctorDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsString()
  senha?: string;

  @IsOptional()
  @IsString()
  telefone?: string;
}

export class CreateAtendimentoDto implements Prisma.AtendimentoCreateInput {
  @IsDate()
  @IsNotEmpty()
  data: Date;

  @IsString()
  @IsNotEmpty()
  observacoes: string;

  @IsString()
  @IsNotEmpty()
  pacienteId: string;

  @IsString()
  @IsNotEmpty()
  psicologoId: string;

  paciente: Prisma.PacienteCreateNestedOneWithoutConsultasInput;
  psicologo: Prisma.PsicologoCreateNestedOneWithoutConsultasInput;
}
