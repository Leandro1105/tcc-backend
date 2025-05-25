import { Module } from '@nestjs/common';
import { APP_GUARD, RouterModule } from '@nestjs/core';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/guards/jwt.guard';
import { RolesGuard } from './modules/auth/roles/roles.guard';
import { PatientsModule } from './modules/patients';
import { PrismaService } from './common/prisma.service';
import { DoctorsModule } from './modules/doctors';
import { ConsultationsModule } from './modules/consultations/consultations.module';
import { HumorModule } from './modules/humor/humor.module';
import { ActivitiesModule } from './modules/activities/activities.module';
import { FinancialModule } from './modules/financial/financial.module';

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
        path: 'psicologos',
        module: DoctorsModule,
      },
      {
        path: 'consultas',
        module: ConsultationsModule,
      },
      {
        path: 'humor',
        module: HumorModule,
      },
      {
        path: 'atividades',
        module: ActivitiesModule,
      },
      {
        path: 'financeiro',
        module: FinancialModule,
      },
    ]),
    AuthModule,
    PatientsModule,
    DoctorsModule,
    ConsultationsModule,
    HumorModule,
    ActivitiesModule,
    FinancialModule,
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
