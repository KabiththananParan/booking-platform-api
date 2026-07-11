import { ConflictException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client'; 
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
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

    return this.usersService.createUser(createUserData);
    
  }
}
