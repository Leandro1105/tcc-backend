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

@Controller('')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get('')
  async findAll() {
    return this.patientsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.patientsService.findOne(id);
  }

  //Apenas usuários com a role de Psicologo podem criar usuários
  @Roles(Role.Psicologo)
  @Post('')
  async create(@Body() data: CreatePacienteDto) {
    return this.patientsService.create(data);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdatePacienteDto) {
    const user = await this.patientsService.update(id, data);

    return user;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.patientsService.delete(id);
  }
}
