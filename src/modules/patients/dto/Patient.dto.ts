import {
  IsDate,
  IsDateString,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Prisma, Tipo } from 'generated/prisma';

export class CreatePacienteDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  cpf: string;

  @IsOptional()
  @IsDateString()
  dataNascimento: Date;

  @IsNotEmpty()
  @IsString()
  telefone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  senha: string;

  @IsString()
  role: Tipo = Tipo.Paciente;
}

export class UpdatePacienteDto {
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
