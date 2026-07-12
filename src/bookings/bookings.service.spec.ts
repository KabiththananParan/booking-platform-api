import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { BookingStatus } from '@prisma/client';

import { BookingsService } from './bookings.service';
import { PrismaService } from '../prisma/prisma.service';

const mockPrismaService = {
  booking: {
    create: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
  },
  service: {
    findUnique: jest.fn(),
  },
};

describe('BookingsService', () => {
  let service: BookingsService;

  const createBookingDto = {
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    customerPhone: '0771234567',
    bookingDate: '2026-12-20',
    bookingTime: '10:00',
    notes: 'Please arrive early',
    serviceId: 1,
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<BookingsService>(BookingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a booking successfully', async () => {
    mockPrismaService.service.findUnique.mockResolvedValue({
      id: 1,
      title: 'Haircut',
    });

    mockPrismaService.booking.create.mockResolvedValue({
      id: 1,
      ...createBookingDto,
      bookingDate: new Date(createBookingDto.bookingDate),
      status: BookingStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await service.create(createBookingDto);

    expect(result).toBeDefined();
    expect(result.customerName).toBe('John Doe');

    expect(mockPrismaService.service.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });

    expect(mockPrismaService.booking.create).toHaveBeenCalled();
  });

  it('should throw NotFoundException if service does not exist', async () => {
    mockPrismaService.service.findUnique.mockResolvedValue(null);

    await expect(service.create(createBookingDto)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should throw BadRequestException when booking date is in the past', async () => {
    mockPrismaService.service.findUnique.mockResolvedValue({
      id: 1,
      title: 'Haircut',
    });

    const dto = {
      ...createBookingDto,
      bookingDate: '2024-01-01',
    };

    await expect(service.create(dto)).rejects.toThrow(BadRequestException);
  });

  it('should update booking status successfully', async () => {
    mockPrismaService.booking.findUnique.mockResolvedValue({
      id: 1,
      status: BookingStatus.PENDING,
    });

    mockPrismaService.booking.update.mockResolvedValue({
      id: 1,
      status: BookingStatus.COMPLETED,
    });

    const result = await service.updateStatus(1, {
      status: BookingStatus.COMPLETED,
    });

    expect(result.status).toBe(BookingStatus.COMPLETED);

    expect(mockPrismaService.booking.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: {
        status: BookingStatus.COMPLETED,
      },
    });
  });

  it('should reject cancelled booking from being completed', async () => {
    mockPrismaService.booking.findUnique.mockResolvedValue({
      id: 1,
      status: BookingStatus.CANCELLED,
    });

    await expect(
      service.updateStatus(1, {
        status: BookingStatus.COMPLETED,
      }),
    ).rejects.toThrow(BadRequestException);
  });
});
