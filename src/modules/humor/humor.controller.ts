import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { HumorService } from './humor.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { CreateHumorDto, UpdateHumorDto } from './dto/Humor.dto';

@Controller('')
export class HumorController {
  constructor(private readonly humorService: HumorService) {}

  @Roles(Role.Paciente)
  @Post('')
  async createHumor(@Body() data: CreateHumorDto) {
    return this.humorService.registerHumor(data);
  }

  @Get('paciente/:pacienteId')
  async getHumorByPacienteId(@Param('pacienteId') pacienteId: string) {
    return this.humorService.getHumorByPacienteId(pacienteId);
  }

  @Get(':id')
  async getHumorById(@Param('id') id: string) {
    return this.humorService.getHumorById(id);
  }

  @Roles(Role.Paciente)
  @Delete(':id')
  async deleteHumor(@Param('id') id: string) {
    return this.humorService.deleteHumor(id);
  }

  @Roles(Role.Paciente)
  @Patch(':id')
  async updateHumor(@Param('id') id: string, @Body() data: UpdateHumorDto) {
    return this.humorService.updateHumor(id, data);
  }
}
