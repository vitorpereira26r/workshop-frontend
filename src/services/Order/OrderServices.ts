import { Order, OrderProps, ChangeOrderStatus, AddItem } from "../../entities/Order";
import { addItemToOrder, changeStatusOrderApi, createOrderApi, deleteOrderApi, getOrders, payOrderApi } from "../Api";

export const getAllOrders = async (): Promise<Order[]> => {
    try{
        const orders: Order[] = await getOrders();
        return orders;
    }
    catch(error){
        throw error;
    }
}

export const createOrder = async (orderProps: OrderProps): Promise<Order> => {
    try{
        const order: Order = await createOrderApi(orderProps);
        return order
    }
    catch(error){
        throw error;
    }
}

export const deleteOrder = async (id: number) => {
    try{
        deleteOrderApi(id);
    }
    catch(error){
        throw error;
    }
}

export const payOrder = async (id: number): Promise<Order> => {
    try{
        const order: Order = await payOrderApi(id);
        return order;
    }
    catch(error){
        throw error;
    }
}

export const changeStatus = async (id: number, newStatus: ChangeOrderStatus): Promise<Order> => {
    try{
        const order: Order = await changeStatusOrderApi(id, newStatus);
        return order;
    }
    catch(error){
        throw error;
    }
}

export const addItem = async(addItems: AddItem[]) => {
    try{
        await addItemToOrder(addItems);
    }
    catch(error){
        throw error;
    }
}