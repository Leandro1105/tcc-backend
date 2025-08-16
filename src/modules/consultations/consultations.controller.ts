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
import {
  CreateAvailableConsultationDto,
  ScheduleAvailableConsultationDto,
  UpdateAvailableConsultationDto,
  UpdateConsultationDto,
} from './dto/Consultation.dto';

@Controller('')
export class ConsultationsController {
  constructor(private readonly consultationsService: ConsultationsService) {}

  @Roles(Role.Paciente)
  @Get('paciente/:id')
  async getConsultationsByPatientId(@Param('id') id: string) {
    return this.consultationsService.getConsultationsByPatientId(id);
  }

  @Roles(Role.Psicologo)
  @Get('psicologo/:id')
  async getConsultationsByPsychologistId(@Param('id') id: string) {
    return this.consultationsService.getConsultationsByPsychologistId(id);
  }

  @Roles(Role.Psicologo, Role.Paciente)
  @Get('disponiveis/psicologo/:id')
  async getAvailableConsultationsByPsychologistId(@Param('id') id: string) {
    return this.consultationsService.getAvailableConsultationsByPsychologistId(
      id,
    );
  }

  @Roles(Role.Psicologo)
  @Post('')
  async createAvailableConsultation(
    @Body() data: CreateAvailableConsultationDto,
  ) {
    return this.consultationsService.createAvailableConsultation(data);
  }

  @Roles(Role.Paciente)
  @Post('agendar')
  async scheduleAvailableConsultation(
    @Body() data: ScheduleAvailableConsultationDto,
  ) {
    return this.consultationsService.scheduleAvailableConsultation(data);
  }

  @Roles(Role.Psicologo)
  @Patch('disponiveis/:id')
  async updateAvailableConsultation(
    @Param('id') id: string,
    @Body() data: UpdateAvailableConsultationDto,
  ) {
    return this.consultationsService.updateAvailableConsultation(id, data);
  }

  @Roles(Role.Psicologo)
  @Patch(':id')
  async updateConsultation(
    @Param('id') id: string,
    @Body() data: UpdateConsultationDto,
  ) {
    return this.consultationsService.updateConsultation(id, data);
  }

  @Roles(Role.Psicologo)
  @Delete(':id')
  async deleteConsultation(@Param('id') id: string) {
    return this.consultationsService.deleteConsultation(id);
  }

  @Roles(Role.Psicologo)
  @Delete('disponiveis/:id')
  async deleteAvailableConsultation(@Param('id') id: string) {
    return this.consultationsService.deleteAvailableConsultation(id);
  }
}
