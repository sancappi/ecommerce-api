import { Controller, Post, Get, Put, Delete, Body, Param, Query } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "src/features/users/dtos/create-user.dto";
import { LoginUserDto } from "./auth.dtos/login.dto";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Post("signup")
    signup(@Body() createUserDto: CreateUserDto) {
        return this.authService.signup(createUserDto);
    }

    @Post("login")
    login(@Body() loginUserDto: LoginUserDto) {
        const {username, password} = loginUserDto;
        return this.authService.login(username, password);
    }
}