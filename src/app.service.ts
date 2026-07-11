import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async getHello(): Promise<string> {
    const users = await this.prisma.user.count();

    return `Database connected successfully! Total users: ${users}`;
  }
}
