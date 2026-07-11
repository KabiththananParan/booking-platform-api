import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthResponseDto } from './dto/auth-response.dto';


@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

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

        const payload = {
            sub: createdUser.id
        }

        const accessToken = this.jwtService.sign(payload);

        return {
            accessToken,
            user: {
                id: createdUser.id,
                name: createdUser.name,
                email: createdUser.email,
            },
        };
    }
}
