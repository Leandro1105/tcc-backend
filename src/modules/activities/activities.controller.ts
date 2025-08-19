import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { CreateActivityDto, UpdateActivityDto } from './dto/Activity.dto';

@Controller('')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Roles(Role.Paciente)
  @Post('')
  async createActivity(@Body() data: CreateActivityDto) {
    return this.activitiesService.registerActivity(data);
  }

  @Roles(Role.Paciente)
  @Get('paciente/:pacienteId')
  async getActivitiesByPacienteId(@Param('pacienteId') pacienteId: string) {
    return this.activitiesService.getActivitiesByPacienteId(pacienteId);
  }

  @Roles(Role.Psicologo)
  @Get('psicologo/:id')
  async getActivitiesFromPatients(@Param('id') id: string) {
    return this.activitiesService.getActivitiesFromPatients(id);
  }

  @Roles(Role.Paciente)
  @Delete(':id')
  async deleteActivity(@Param('id') id: string) {
    return this.activitiesService.deleteActivity(id);
  }

  @Roles(Role.Paciente)
  @Patch(':id')
  async updateActivity(
    @Param('id') id: string,
    @Body() data: UpdateActivityDto,
  ) {
    return this.activitiesService.updateActivity(id, data);
  }
}
