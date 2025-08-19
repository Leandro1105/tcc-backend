import { Controller, Get, Param } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';

@Controller('')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Roles(Role.Paciente)
  @Get('paciente/:pacienteId')
  async getPatientDashboard(@Param('pacienteId') pacienteId: string) {
    return this.dashboardService.getPatientDashboard(pacienteId);
  }

  @Roles(Role.Psicologo)
  @Get('psicologo/:psicologoId')
  async getPsychologistDashboard(@Param('psicologoId') psicologoId: string) {
    return this.dashboardService.getPsychologistDashboard(psicologoId);
  }

  @Roles(Role.Psicologo)
  @Get('financeiro/psicologo/:psicologoId')
  async getPsychologistPayments(@Param('psicologoId') psicologoId: string) {
    return this.dashboardService.getPsychologistPayments(psicologoId);
  }
}
