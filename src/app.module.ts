import { Module } from '@nestjs/common';
import { APP_GUARD, RouterModule } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/guards/jwt.guard';
import { RolesGuard } from './modules/auth/roles/roles.guard';
import { PrismaService } from './common/prisma.service';
import {
  ActivitiesModule,
  ConsultationsModule,
  DashboardModule,
  DoctorsModule,
  FinancialModule,
  HumorModule,
  PatientsModule,
} from './modules';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    RouterModule.register([
      {
        path: '/login',
        module: AuthModule,
      },
      {
        path: '/pacientes',
        module: PatientsModule,
      },
      {
        path: '/psicologos',
        module: DoctorsModule,
      },
      {
        path: '/consultas',
        module: ConsultationsModule,
      },
      {
        path: '/humor',
        module: HumorModule,
      },
      {
        path: '/atividades',
        module: ActivitiesModule,
      },
      {
        path: '/financeiro',
        module: FinancialModule,
      },
      {
        path: '/dashboard',
        module: DashboardModule,
      },
    ]),
    AuthModule,
    PatientsModule,
    DoctorsModule,
    ConsultationsModule,
    HumorModule,
    ActivitiesModule,
    FinancialModule,
    DashboardModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    PrismaService,
  ],
})
export class AppModule {}
