import { Module } from '@nestjs/common';
import { OrdersModule } from './features/orders/orders.module';
import { PaymentsModule } from './features/payments/payments.module';
import { ProductsModule } from './features/products/products.module';
import { ReviewsModule } from './features/reviews/reviews.module';
import { UsersModule } from './features/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [OrdersModule, PaymentsModule, ProductsModule,
    ReviewsModule, UsersModule, 
    
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>('HOST_NAME'),
        port: configService.get<number>("PORT"),
        username: configService.get<string>('USERNAME'),
        password: configService.get<string>('PASSWORD'),
        database: configService.get<string>('DATABASE'),
        entities: ["/**/*.entity{.ts, .js}"],
        synchronize: true,
      }),
    })],
  controllers: [],
  providers: [],
})
export class AppModule {}
