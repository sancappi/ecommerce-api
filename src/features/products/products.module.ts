import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { PaginationService } from "src/common/pagination/pagination.service";
import { PaginationModule } from "src/common/pagination/pagination.module";

@Module({
    imports: [TypeOrmModule.forFeature([Product]), 
        PaginationModule],
    controllers: [ProductsController],
    providers: [ProductsService, PaginationService],
})
export class ProductsModule {}