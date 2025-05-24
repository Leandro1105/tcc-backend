import { Module } from '@nestjs/common';
import { APP_GUARD, RouterModule } from '@nestjs/core';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/guards/jwt.guard';
import { RolesGuard } from './modules/auth/roles/roles.guard';
import { PacientsModule } from './modules/pacients';
import { PrismaService } from './common/prisma.service';

@Module({
  imports: [
    RouterModule.register([
      {
        path: '/login',
        module: AuthModule,
      },
      {
        path: '/pacientes',
        module: PacientsModule,
      },
    ]),
    AuthModule,
    PacientsModule,
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
