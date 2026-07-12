import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { Service } from '@prisma/client';

@Injectable()
export class ServicesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createServiceDto: CreateServiceDto,
    userId: number,
  ): Promise<Service> {
    return this.prisma.service.create({
      data: {
        title: createServiceDto.title,
        description: createServiceDto.description,
        duration: createServiceDto.duration,
        price: createServiceDto.price,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }
}