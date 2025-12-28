import { Controller, Get, Post, Put, Delete, Body, Param, Query } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dtos/create-product.dto";

@Controller("products")
export class ProductsController {
    constructor(
        private readonly productService: ProductsService
    ) {}

    @Post() 
    createProduct(@Body() dados: CreateProductDto) {
        const product = this.productService.createProduct(dados);
        return product;
    }

    @Get()
    getProduts(
        @Query("page") page: number,
        @Query("limit") limit: number
    ) {
        const products =  this.productService.getProducts(page, limit);
        return products;
    }

    @Get(":id")
    getProduct(@Param("id") id: string) {
        const product = this.productService.getProductById(id);
        return product;
    }
}