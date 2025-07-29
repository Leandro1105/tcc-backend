import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ConsultationsService } from './consultations.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { CreateConsultationDto } from './dto/Consultation.dto';

@Controller('')
export class ConsultationsController {
  constructor(private readonly consultationsService: ConsultationsService) {}

  @Roles(Role.Paciente)
  @Get('paciente/:id')
  async getConsultationsByPatientId(@Param('id') id: string) {
    return this.consultationsService.getConsultationsByPatientId(id);
  }

  @Roles(Role.Paciente)
  @Get('paciente/:id')
  async getConsultationsByPsychologistId(@Param('id') id: string) {
    return this.consultationsService.getConsultationsByPsychologistId(id);
  }

  @Roles(Role.Psicologo)
  @Get(':id')
  async getConsultationById(@Param('id') id: string) {
    return this.consultationsService.getConsultationById(id);
  }

  @Roles(Role.Psicologo)
  @Post('')
  async createConsultation(@Body() data: CreateConsultationDto) {
    return this.consultationsService.createConsultation(data);
  }

  @Roles(Role.Psicologo)
  @Patch(':id')
  async updateConsultation(
    @Param('id') id: string,
    @Body() data: CreateConsultationDto,
  ) {
    return this.consultationsService.updateConsultation(id, data);
  }

  @Roles(Role.Psicologo)
  @Delete(':id')
  async deleteConsultation(@Param('id') id: string) {
    return this.consultationsService.deleteConsultation(id);
  }
}
