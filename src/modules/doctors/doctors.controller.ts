import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto, UpdateDoctorDto } from './dto/Doctor.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { Public } from '../auth/decorators/is-public.decorator';

@Controller('')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Roles(Role.Paciente)
  @Get('')
  async findAll() {
    return this.doctorsService.findAll();
  }

  @Roles(Role.Psicologo)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.doctorsService.findOne(id);
  }

  @Public()
  @Post('')
  async create(@Body() data: CreateDoctorDto) {
    return this.doctorsService.create(data);
  }

  @Roles(Role.Psicologo)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateDoctorDto) {
    const user = await this.doctorsService.update(id, data);

    return user;
  }

  @Roles(Role.Psicologo)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.doctorsService.delete(id);
  }
}
