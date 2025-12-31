import { Controller, Post, Get, Put, Delete,
    Body, Param, Query} from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) {}

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    @Get(":id")
    findUser(@Param("id") id: string) {
        return this.usersService.getUserById(id);
    }

    @Get("username/:username") 
    findUserByUsername(@Param("username") username: string) {
        return this.usersService.getUserByUsername(username);
    }
}