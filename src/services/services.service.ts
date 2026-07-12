import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { Service } from '@prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateServiceDto } from './dto/update-service.dto';

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
  async findAll(): Promise<Service[]> {
    return this.prisma.service.findMany();
  }
  async findOne(id: number): Promise<Service | null> {
    const service = await this.prisma.service.findUnique({
      where: { id },
    });

    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    return service;
  }
  async update(
    id: number,
    updateServiceDto: UpdateServiceDto,
  ): Promise<Service> {
    const service = await this.prisma.service.findUnique({
      where: { id },
    });

    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }

    return this.prisma.service.update({
      where: { id },
      data: updateServiceDto,
    });
  }
  async remove(id: number): Promise<Service> {
    const service = await this.prisma.service.findUnique({
      where: { id },
    });

    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }

    return this.prisma.service.delete({
      where: { id },
    });
  }
}
