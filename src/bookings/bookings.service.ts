import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from '@prisma/client';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';
import { BookingStatus } from '@prisma/client';

@Injectable()
export class BookingsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const service = await this.prisma.service.findUnique({
      where: { id: createBookingDto.serviceId },
    });

    if (!service) {
      throw new NotFoundException(
        `Service with ID ${createBookingDto.serviceId} not found`,
      );
    }

    const bookingDate = new Date(createBookingDto.bookingDate);
    const today = new Date();
    bookingDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (bookingDate < today) {
      throw new BadRequestException(
        `Booking date ${createBookingDto.bookingDate} is in the past`,
      );
    }

    return this.prisma.booking.create({
      data: {
        customerName: createBookingDto.customerName,
        customerEmail: createBookingDto.customerEmail,
        customerPhone: createBookingDto.customerPhone,
        bookingDate: new Date(createBookingDto.bookingDate),
        bookingTime: createBookingDto.bookingTime,
        notes: createBookingDto.notes,
        service: {
          connect: {
            id: createBookingDto.serviceId,
          },
        },
      },
    });
  }
  async findAll(): Promise<Booking[]> {
    return this.prisma.booking.findMany();
  }
  async findOne(id: number): Promise<Booking> {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
    });
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    return booking;
  }
  async updateStatus(
    id: number,
    updateBookingStatusDto: UpdateBookingStatusDto,
  ): Promise<Booking> {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    if (
      booking.status === BookingStatus.CANCELLED &&
      updateBookingStatusDto.status === BookingStatus.COMPLETED
    ) {
      throw new BadRequestException(
        'Cancelled bookings cannot be marked as completed',
      );
    }

    return this.prisma.booking.update({
      where: { id },
      data: {
        status: updateBookingStatusDto.status,
      },
    });
  }
}
