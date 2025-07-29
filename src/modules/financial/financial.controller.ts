import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { FinancialService } from './financial.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { CreateFinancialDto, UpdateFinancialDto } from './dto/Financial.dto';

@Controller('')
export class FinancialController {
  constructor(private readonly financialService: FinancialService) {}

  @Roles(Role.Psicologo)
  @Get('psicologo/:psicologoId')
  async getPsychologistPayments(@Param('psicologoId') psicologoId: string) {
    return this.financialService.getPsychologistPayments(psicologoId);
  }

  @Roles(Role.Psicologo)
  @Get(':id')
  async getPaymentById(@Param('id') id: string) {
    return this.financialService.getPaymentById(id);
  }

  @Roles(Role.Psicologo)
  @Get('consulta/:id')
  async getPaymentByConsultationId(@Param('id') id: string) {
    return this.financialService.getPaymentByConsultationId(id);
  }

  @Roles(Role.Psicologo)
  @Post('')
  async createPayment(@Body() data: CreateFinancialDto) {
    return this.financialService.createPayment(data);
  }

  @Roles(Role.Psicologo)
  @Patch(':id')
  async updatePayment(
    @Param('id') id: string,
    @Body() data: UpdateFinancialDto,
  ) {
    return this.financialService.updatePayment(id, data);
  }

  @Roles(Role.Psicologo)
  @Patch('status/:id')
  async changePaymentStatus(
    @Param('id') id: string,
    @Body() data: UpdateFinancialDto,
  ) {
    return this.financialService.changePaymentStatus(id, data.status);
  }
}
