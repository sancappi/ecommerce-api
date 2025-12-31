import { Product } from "src/features/products/entities/product.entity";
import { User } from "src/features/users/entities/user.entity";
import { Column, Entity, ManyToOne, 
    PrimaryGeneratedColumn } from "typeorm";

export enum OrderStatus {
    PENDING = "PENGING",
    APROVED = "APROVED",
    DECLINED = "DECLINED",
    CANCELLED = "CANCELLED"
} 

@Entity("orders")
export class Order {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    quantity: number;

    @Column({
        default: OrderStatus.PENDING
    })
    status: OrderStatus;

    @Column(
        "decimal",
        {
            precision: 5,
            scale: 2,
            default: 0
        }
    )
    totalPrice: number;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP"
    })
    createAt: Date;

    @ManyToOne(() => Product, product => 
        product.orders)
    product: Product;

    @ManyToOne(() => User, user => user.orders)
    customer: User;
}
