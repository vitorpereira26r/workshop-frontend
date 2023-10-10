import { Product } from "./Product";
import { User } from "./User";


export interface Order{
    id: number,
    moment: string,
    orderStatus: string,
    client: User,
    items: OrderItem[],
    total: number,
    payment: Payment
}

export interface OrderItem{
    quantity: number,
    price: number,
    product: Product,
    subTotal: number
}

export interface OrderProps{
    client: User | null,
    itens: Product[],
    total: number
}

interface Payment{
    id: number,
    moment: Date
}

export interface ChangeOrderStatus{
    nameOrderStatus: string;
}