import { Module } from "@nestjs/common";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { Order } from "./entities/order.entity";
import { Product } from "../products/entities/product.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonModule } from "src/common/common.module";
import { PaginationService } from "src/common/pagination/pagination.service";

@Module({
    imports: [TypeOrmModule.forFeature([
        Order, Product
    ]), CommonModule],
    controllers: [OrdersController],
    providers: [OrdersService, PaginationService]
})
export class OrdersModule {}