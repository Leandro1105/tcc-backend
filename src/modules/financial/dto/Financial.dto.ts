import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Prisma, Status } from 'generated/prisma';

export class CreateFinancialDto implements Prisma.PagamentoCreateInput {
  @IsNumber()
  @IsNotEmpty()
  valor: number;

  @IsDate()
  @IsNotEmpty()
  data: Date;

  @IsDate()
  @IsNotEmpty()
  dataVencimento: Date;

  @IsInt()
  @IsNotEmpty()
  parcela: number;

  @IsNotEmpty()
  status: Status = Status.Pendente;

  @IsNotEmpty()
  @IsString()
  atendimentoId: string;

  atendimento: Prisma.AtendimentoCreateNestedOneWithoutPagamentosInput;
}

export class UpdateFinancialDto {
  @IsOptional()
  @IsNumber()
  valor?: number;

  @IsOptional()
  @IsDate()
  dataVencimento?: Date;

  @IsOptional()
  status?: boolean;

  @IsOptional()
  @IsString()
  atendimentoId: string;
}
