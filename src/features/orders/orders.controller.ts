import { Controller, Get, Post, Put, Delete, Body, 
    Query, Param } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dtos/create-order.dto";

@Controller("orders")
export class OrdersController {
    constructor(
        private readonly ordersService: OrdersService
    ) {}

    @Post()
    createOrder(@Body() dados: CreateOrderDto) {
        const order = this.ordersService.createOrder(dados);
        return order;
    }

    @Get()
    getOrders(
        @Query("page") page: number,
        @Query("limit") limit: number
    ) {
        const orders = this.ordersService.getOrders(page, limit);
        return orders;
    }

    @Get(":id")
    getOrderById(@Param("id") id: string) {
        const order = this.ordersService.getOrderById(id);
        return order;
    }
}