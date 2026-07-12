import { Body, Controller, Post, Req } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { Service } from '@prisma/client';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Request } from 'express';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createServiceDto: CreateServiceDto,
    @Req() req,
  ): Promise<Service> {
    console.log(req.user);
    return this.servicesService.create(createServiceDto, req.user.userId);
  }
}
