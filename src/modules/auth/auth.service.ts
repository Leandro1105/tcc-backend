import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/common/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.prisma.paciente.findUnique({
      where: { email: username },
    });
    if (user && (await bcrypt.compare(password, user.senha))) {
      const { ...result } = user;
      return result;
    }
    const psicologo = await this.prisma.psicologo.findUnique({
      where: { email: username },
    });
    if (psicologo && (await bcrypt.compare(password, psicologo.senha))) {
      const { ...result } = psicologo;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getProfile(userId: string) {
    const paciente = await this.prisma.paciente.findUnique({
      where: { id: userId },
      select: {
        id: true,
        nome: true,
        role: true,
      },
    });
    if (paciente) {
      return paciente;
    }
    const psicologo = await this.prisma.psicologo.findUnique({
      where: { id: userId },
      select: {
        id: true,
        nome: true,
        role: true,
      },
    });
    if (psicologo) {
      return psicologo;
    }
    return null;
  }
}
