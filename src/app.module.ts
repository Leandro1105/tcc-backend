import { Module } from '@nestjs/common';
import { APP_GUARD, RouterModule } from '@nestjs/core';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/guards/jwt.guard';
import { RolesGuard } from './modules/auth/roles/roles.guard';
import { PatientsModule } from './modules/patients';
import { PrismaService } from './common/prisma.service';
import { DoctorsModule } from './modules/doctors';

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
    ]),
    AuthModule,
    PatientsModule,
    DoctorsModule,
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
