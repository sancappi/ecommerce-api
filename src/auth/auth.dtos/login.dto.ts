import {PickType} from "@nestjs/mapped-types";
import { CreateUserDto } from "src/features/users/dtos/create-user.dto";

export class LoginUserDto extends PickType(CreateUserDto, [
    "username",
    "password"
] as const) {}