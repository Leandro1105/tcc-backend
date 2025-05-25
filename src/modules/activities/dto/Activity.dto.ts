import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Prisma } from 'generated/prisma';

export class CreateActivityDto implements Prisma.AtividadeCreateInput {
  @IsString()
  @IsNotEmpty()
  tipo: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsDate()
  @IsNotEmpty()
  data: Date;

  @IsInt()
  @Min(1, { message: 'O valor mínimo permitido é 1.' })
  @Max(5, { message: 'O valor máximo permitido é 5.' })
  @IsNotEmpty()
  impacto: number;

  @IsString()
  @IsNotEmpty()
  pacienteId: string;

  paciente: Prisma.PacienteCreateNestedOneWithoutAtividadesInput;
}

export class UpdateActivityDto implements Prisma.AtividadeUpdateInput {
  @IsString()
  @IsOptional()
  tipo?: string;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsDate()
  @IsOptional()
  data?: Date;

  @IsInt()
  @Min(1, { message: 'O valor mínimo permitido é 1.' })
  @Max(5, { message: 'O valor máximo permitido é 5.' })
  @IsOptional()
  impacto?: number;
}
