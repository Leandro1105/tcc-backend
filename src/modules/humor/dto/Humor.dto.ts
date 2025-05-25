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

export class CreateHumorDto implements Prisma.HumorCreateInput {
  @IsDate()
  @IsNotEmpty()
  data: Date;

  @IsInt()
  @Min(1, { message: 'O valor mínimo permitido é 1.' })
  @Max(5, { message: 'O valor máximo permitido é 5.' })
  @IsNotEmpty()
  escala: number;

  @IsString()
  @IsNotEmpty()
  observacoes: string;

  @IsString()
  @IsNotEmpty()
  pacienteId: string;

  paciente: Prisma.PacienteCreateNestedOneWithoutAtividadesInput;
}

export class UpdateHumorDto implements Prisma.HumorUpdateInput {
  @IsDate()
  @IsOptional()
  data?: Date;

  @IsInt()
  @Min(1, { message: 'O valor mínimo permitido é 1.' })
  @Max(5, { message: 'O valor máximo permitido é 5.' })
  @IsOptional()
  escala?: number;

  @IsString()
  @IsOptional()
  observacoes?: string;
}
