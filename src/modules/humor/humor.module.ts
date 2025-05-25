import { Module } from '@nestjs/common';
import { HumorController } from './humor.controller';
import { HumorService } from './humor.service';
import { PrismaService } from 'src/common/prisma.service';

@Module({
  controllers: [HumorController],
  providers: [HumorService, PrismaService],
  exports: [HumorService],
})
export class HumorModule {}
