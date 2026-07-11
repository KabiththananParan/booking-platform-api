import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthResponseDto } from './dto/auth-response.dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private createAuthResponse(user: User): AuthResponseDto {
    const payload = {
      sub: user.id,
    };
    const accessToken = this.jwtService.sign(payload);
    const response = new AuthResponseDto();

    response.accessToken = accessToken;

    response.user = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    return response;
  }

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
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

    return this.createAuthResponse(createdUser);
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const existingUser = await this.usersService.findByEmail(loginDto.email);

    if (!existingUser) {
      throw new UnauthorizedException('Email not found');
    }

    const passwordMatch = await bcrypt.compare(
      loginDto.password,
      existingUser.password,
    );

    if (passwordMatch === false) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return this.createAuthResponse(existingUser);
  }
}
