import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dtos/create-product.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProductsService {
    constructor (
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ) {}

    async createProduct(createProductDto: CreateProductDto) {
        const product = this.productRepository.create(createProductDto);
        await this.productRepository.save(product);

        return {
            message: "Product created successfully",
            product
        };
    }
}