import { Injectable, ForbiddenException } from '@nestjs/common';
import { AuthDto } from './dto';

import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private config: ConfigService) {}

  async login(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }
    if (user.password !== dto.password) {
      throw new ForbiddenException('Credentials incorrect');
    }
    return { message: 'Login successful', email: user.email };
  }

  async register(dto: AuthDto) {
    await this.prisma.user
      .create({
        data: {
          email: dto.email,
          password: dto.password,
          name: dto.name,
        },
      })
      .catch((error) => {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email already exists');
        }
        throw error;
      });
    return { message: 'Register successful' };
  }
}
