import { Module } from "@nestjs/common";
import { PaginationService } from "./pagination/pagination.service";

@Module({
    imports: [],
    controllers: [],
    providers: [PaginationService],
    exports: [PaginationService]
})
export class CommonModule {}