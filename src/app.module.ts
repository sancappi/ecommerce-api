import { Module } from '@nestjs/common';
import { OrdersModule } from './features/orders/orders.module';
import { PaymentsModule } from './features/payments/payments.module';
import { ProductsModule } from './features/products/products.module';
import { ReviewsModule } from './features/reviews/reviews.module';
import { UsersModule } from './features/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommonModule } from './common/common.module';

@Module({
  imports: [OrdersModule, PaymentsModule, ProductsModule,
    ReviewsModule, UsersModule, CommonModule,
    
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>('HOST_NAME'),
        port: configService.get<number>("DB_PORT"),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: ["/**/*.entity{.ts, .js}"],
        synchronize: true,
      }),
    })],
  controllers: [],
  providers: [],
})
export class AppModule {}
