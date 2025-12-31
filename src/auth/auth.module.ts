import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "src/features/users/users.module";
import { UsersService } from "src/features/users/users.service";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Module({
    imports: [
        UsersModule, JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>("JWT_SECRET"),
                signOptions: {expiresIn: "24h"},
                global: true,
            }),
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, UsersService]
})
export class AuthModule {}