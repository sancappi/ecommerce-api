import { Order } from "src/features/orders/entities/order.entity";
import { Column, Entity, OneToMany, 
    PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
    ADMIN = "ADMIN",
    USER = "USER",
    MERCHANT = "MERCHANT"
}

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({unique: true})
    email: string;

    @Column({unique: true})
    username: string;

    @Column()
    password: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER
    })
    role: UserRole;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP"
    })
    createAt: Date;

    @OneToMany(() => Order, order => order.customer)
    orders: Order[];
}
