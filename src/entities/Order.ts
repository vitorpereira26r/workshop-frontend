import { Product } from "./Product";
import { User } from "./User";

interface Payment{
    id: number,
    moment: Date
}

export interface Order{
    id: number,
    moment: Date,
    orderStatus: String,
    client: User,
    itens: Product[],
    total: number,
    payment: Payment
}