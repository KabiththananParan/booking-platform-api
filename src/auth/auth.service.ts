import { ConflictException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client'; 
import { RegisterDto } from './dto/register.dto';
import { RegisterResponseDto } from './dto/register-response.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  async register(registerDto: RegisterDto): Promise<RegisterResponseDto> {
    const existingUser = await this.usersService.findByEmail(registerDto.email);

    if (existingUser) {
        throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const createUserData = {
        name: registerDto.name,
        email: registerDto.email,
        password: hashedPassword,
    };

    const createdUser = await this.usersService.createUser(createUserData);
    const response = new RegisterResponseDto();
    response.id = createdUser.id;
    response.name = createdUser.name;
    response.email = createdUser.email;

    return response;

    
  }
}
