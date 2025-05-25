import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Prisma } from 'generated/prisma';

export class CreateConsultationDto implements Prisma.AtendimentoCreateInput {
  @IsNotEmpty()
  @IsDate()
  data: Date;

  @IsNotEmpty()
  @IsString()
  observacoes: string;

  @IsNotEmpty()
  @IsString()
  pacienteId: string;

  @IsNotEmpty()
  @IsString()
  psicologoId: string;

  paciente: Prisma.PacienteCreateNestedOneWithoutConsultasInput;
  psicologo: Prisma.PsicologoCreateNestedOneWithoutConsultasInput;
}

export class UpdateConsultationDto implements Prisma.AtendimentoUpdateInput {
  @IsOptional()
  @IsDate()
  data?: Date;

  @IsOptional()
  @IsString()
  observacoes?: string;
}
