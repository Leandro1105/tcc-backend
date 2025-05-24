import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PrismaService } from 'src/common/prisma.service';
import { PatientsController } from './patients.controller';

@Module({
  controllers: [PatientsController],
  providers: [PatientsService, PrismaService],
  exports: [PatientsService],
})
export class PatientsModule {}
