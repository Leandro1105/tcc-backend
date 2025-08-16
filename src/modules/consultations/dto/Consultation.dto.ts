import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Prisma } from 'generated/prisma';

export class UpdateConsultationDto implements Prisma.AtendimentoUpdateInput {
  @Type(() => Date)
  @IsOptional()
  @IsDate()
  data?: Date;

  @IsOptional()
  @IsString()
  observacoes?: string;
}

export class CreateAvailableConsultationDto
  implements Prisma.AtendimentoDisponivelCreateInput
{
  @Type(() => Date)
  @IsNotEmpty()
  @IsDate()
  data: Date;

  @IsNotEmpty()
  @IsString()
  descricao: string;

  @IsOptional()
  @IsString()
  observacoes?: string;

  @IsNotEmpty()
  @IsNumber()
  valor: number;

  @IsNotEmpty()
  @IsString()
  psicologoId: string;

  psicologo: Prisma.PsicologoCreateNestedOneWithoutAtendimentosDisponiveisInput;
}

export class UpdateAvailableConsultationDto
  implements Prisma.AtendimentoDisponivelUpdateInput
{
  @Type(() => Date)
  @IsOptional()
  @IsDate()
  data?: Date;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsString()
  observacoes?: string;

  @IsOptional()
  @IsNumber()
  valor?: number;
}

export class ScheduleAvailableConsultationDto {
  @IsNotEmpty()
  @IsString()
  availableConsultationId: string;

  @IsNotEmpty()
  @IsString()
  pacienteId: string;

  @IsOptional()
  @IsString()
  observacoes?: string;
}
