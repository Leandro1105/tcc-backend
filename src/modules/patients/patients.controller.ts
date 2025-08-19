import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePacienteDto, UpdatePacienteDto } from './dto/Patient.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { Public } from '../auth/decorators/is-public.decorator';

@Controller('')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Roles(Role.Psicologo)
  @Get('')
  async findAll() {
    return this.patientsService.findAll();
  }

  @Public()
  @Post('')
  async create(@Body() data: CreatePacienteDto) {
    return this.patientsService.create(data);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdatePacienteDto) {
    const user = await this.patientsService.update(id, data);

    return user;
  }

  @Roles(Role.Psicologo)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.patientsService.delete(id);
  }
}
