import { Module } from '@nestjs/common';
import { PacientsService } from './pacients.service';
import { PrismaService } from 'src/common/prisma.service';
import { PacientsController } from './pacients.controller';

@Module({
  controllers: [PacientsController],
  providers: [PacientsService, PrismaService],
  exports: [PacientsService],
})
export class PacientsModule {}
