import { IsDecimal, IsObject,
    IsString, IsUrl, Length, Validate
} from "class-validator";
import {ProductSpecs} from "../custom-validators/product-specs";

export class CreateProductDto {
    @IsString({
        message: "Name must be a string."
    })
    @Length(5, 25, {
        message: "Name must be between 5 and 25 characters."
    })
    name: string;

    @IsString({
        message: "Description must be a string."
    })
    @Length(25, 255, {
        message: "Description must be between 25 and 255 characters"
    })
    description: string;

    @IsDecimal({
        decimal_digits: "2",
    }, {
        message: "Price must be a decimal number."
    })
    price: number;

    @IsObject({
        message: "Specs must be a valid object."
    })
    @Validate(ProductSpecs)
    specs: Record<string, string>;

    @IsString({
        message: "Image must be a string."
    })
    @IsUrl({
        require_protocol: true
    }, {
        message: "Image must be a valid URL."
    })
    image: string;
}