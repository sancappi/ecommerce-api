import { Injectable } from "@nestjs/common";
import { CreateOrderDto } from "./dtos/create-order.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order } from "./entities/order.entity";
import { Product } from "../products/entities/product.entity";
import { PaginationService } from "src/common/pagination/pagination.service";

@Injectable()
export class OrdersService {

    constructor(
            @InjectRepository(Order)
            private orderRepository: Repository<Order>,
            
            @InjectRepository(Product)
            private productRepository: Repository<Product>,

            private readonly paginationService: PaginationService
        ) {}

    async createOrder(createOrderDto: CreateOrderDto) {
        try {
            const {productId, quantity, 
                totalPrice} = createOrderDto;
            
            const product = await this.productRepository.findOne({
                where: {id: productId}
            });

            if (!product) {
                return {
                    message: "product not found!"
                }
            }

            const order = this.orderRepository.create({
                product,
                quantity,
                totalPrice
            });

            await this.orderRepository.save(order);

            return {
                message: "Order created successfully.",
                order
            };
        } catch (error) {
            return {
                message: "An error occurred!",
                error
            }
        }
    }

    async getOrders(page = 1, limit = 10) {
        const orders = await this.orderRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            relations: [
                "product"
            ],
            select: {
                product: {
                    name: true,
                    price: true,
                    image: true,
                }
            }
        });

        const totalItems = await this.orderRepository.count();
        
        const meta = this.paginationService.getPaginationMeta(
            page, limit, totalItems
        );

        return {
            orders,
            meta
        };
    }

    async getOrderById(id: string) {
        const order = await this.orderRepository.find({
            where: {id},
            relations: ["product"]
        });

        return {order};
    }
}