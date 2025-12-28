import { Module } from "@nestjs/common";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { Order } from "./entities/order.entity";
import { Product } from "../products/entities/product.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([
        Order, Product
    ])],
    controllers: [OrdersController],
    providers: [OrdersService]
})
export class OrdersModule {}