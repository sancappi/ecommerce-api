import { Module } from '@nestjs/common';
import { OrdersModule } from './features/orders/orders.module';
import { PaymentsModule } from './features/payments/payments.module';
import { ProductsModule } from './features/products/products.module';
import { ReviewsModule } from './features/reviews/reviews.module';
import { UsersModule } from './features/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [OrdersModule, PaymentsModule, ProductsModule,
    ReviewsModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
