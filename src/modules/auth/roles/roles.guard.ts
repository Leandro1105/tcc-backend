import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/common/prisma.service';
import { Role } from '../enums/role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const requestuser = request.user;

    if (!requestuser) return false;

    const paciente = await this.prisma.paciente.findUnique({
      where: { id: requestuser.userId },
      select: { role: true },
    });
    const psicologo = await this.prisma.psicologo.findUnique({
      where: { id: requestuser.userId },
      select: { role: true },
    });
    const user = paciente || psicologo;

    return requiredRoles.some((role) => user.role.includes(role));
  }
}
