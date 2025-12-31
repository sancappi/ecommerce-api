import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/features/users/dtos/create-user.dto";
import { UsersService } from "src/features/users/users.service";
import bcrypt from "bcrypt";
import { User } from "src/features/users/entities/user.entity";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async login(username: string, password: string) {
        try {
            const user = await this.usersService.getUserByUsername(username);
            
            if (await this.verifyPassword(
                user, 
                password,
                user?.password)) {
                    //delete user?.password;
                    const accessToken = await this.jwtService.signAsync({
                        sub: user?.id,
                        username: user?.username
                    });

                    return {
                        message: "Login successful!",
                        data: {
                            ...user,
                            accessToken
                        }
                    };
                }
            return {
                message: "Invalid username or password",
                data: null
            };
        } catch (error) {
            return error;
        }
    } 

    async signup(createUserDto: CreateUserDto) {
        try {
            const hashedPassword = this.hashPassword(
                createUserDto.password
            );
            const newUser: CreateUserDto = {
                ...createUserDto,
                password: hashedPassword
            };

            return await this.usersService.createUser(newUser)
        } catch (error) {
            return error;
        }
    }

    hashPassword(password: string) {
        return bcrypt.hashSync(password, 10);
    }

    async verifyPassword(user: User, password: string,
        hashedPassword: string
    ) {
        return user && (await bcrypt.compare(
            password, hashedPassword
        ))
    }
}