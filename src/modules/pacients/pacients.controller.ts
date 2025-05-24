import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PacientsService } from './pacients.service';
import { CreatePacienteDto, UpdatePacienteDto } from './dto/Pacient.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';

@Controller('')
export class PacientsController {
  constructor(private readonly pacientsService: PacientsService) {}

  @Get('')
  async findAll() {
    return this.pacientsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.pacientsService.findOne(id);
  }

  //Apenas usuários com a role de Psicologo podem criar usuários
  @Roles(Role.Psicologo)
  @Post('')
  async create(@Body() data: CreatePacienteDto) {
    return this.pacientsService.create(data);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdatePacienteDto) {
    const user = await this.pacientsService.update(id, data);

    return user;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.pacientsService.delete(id);
  }
}
