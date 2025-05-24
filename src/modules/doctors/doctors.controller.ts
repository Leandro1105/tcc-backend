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

@Controller('')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Get('')
  async findAll() {
    return this.doctorsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.doctorsService.findOne(id);
  }

  //Apenas usuários com a role de Psicologo podem criar usuários
  @Roles(Role.Psicologo)
  @Post('')
  async create(@Body() data: CreateDoctorDto) {
    return this.doctorsService.create(data);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateDoctorDto) {
    const user = await this.doctorsService.update(id, data);

    return user;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.doctorsService.delete(id);
  }
}
