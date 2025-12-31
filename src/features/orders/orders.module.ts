import { Module } from "@nestjs/common";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { Order } from "./entities/order.entity";
import { Product } from "../products/entities/product.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PaginationService } from "src/common/pagination/pagination.service";
import { PaginationModule } from "src/common/pagination/pagination.module";

@Module({
    imports: [TypeOrmModule.forFeature([
        Order, Product
    ]), PaginationModule],
    controllers: [OrdersController],
    providers: [OrdersService, PaginationService]
})
export class OrdersModule {}