import axios from "axios"
import { User } from "../entities/User";
import { Order, OrderProps, ChangeOrderStatus, AddItem } from "../entities/Order";
import { Product } from "../entities/Product";
import { Category } from "../entities/Category";

export const apiUrl = "https://workshop-springboot3-app-befefc2b19cc.herokuapp.com";
//const devApiUrl = "http://localhost:8080"

export const fetchUsers = async (): Promise<User[]> => {
    try{
        const response = await axios.get(`${apiUrl}/users`);
        const users: User[] = response.data
        return users;
    }
    catch(error){
        throw error;
    }
}

export const createUserApi = async (user: User): Promise<User> => {
    try{
        const response = await axios.post(`${apiUrl}/users`, user);
        const entity: User = response.data;
        return entity;
    }
    catch(error){
        throw error;
    }
}

export const deleteUser = async (id: number) =>{
    try{
        const response = await axios.delete(apiUrl + "/users/" + id);
        console.log(response);
    }
    catch(error){
        throw error;
    }
}

export const editUser = async (user: User, id: number): Promise<User> => {
    try{
        const response = await axios.put(apiUrl + "/users/" + id, user);
        console.log(response);
        const entity: User = response.data;
        return entity;
    }
    catch(error){
        throw error;
    }
}

export const getOrders = async (): Promise<Order[]> => {
    try{
        const response = await axios.get(apiUrl + "/orders");
        const orders: Order[] = response.data;
        return orders;
    }
    catch(error){
        throw error;
    }
}

export const createOrderApi = async (orderProps: OrderProps): Promise<Order> => {
    try{
        const response = await axios.post(apiUrl + "/orders", orderProps);
        const order: Order = response.data;
        return order;
    }
    catch(error){
        throw error;
    }
}

export const deleteOrderApi = async (id: number) => {
    try{
        const response = await axios.delete(apiUrl + "/orders/" + id);
        console.log(response);
    }
    catch(error){
        throw error;
    }
}

export const editOrderApi = async (orderProps: OrderProps, id: number): Promise<Order> => {
    try{
        const response = await axios.put(apiUrl + "/orders/" + id, orderProps);
        const order: Order = response.data;
        return order;
    }
    catch(error){
        throw error;
    }
}

export const payOrderApi = async (id: number): Promise<Order> => {
    try{
        const response =  await axios.post(apiUrl + "/orders/pay/" + id);
        const order: Order = response.data;
        return order;
    }
    catch(error){
        throw error;
    }
}

export const changeStatusOrderApi = async (id: number, nameOrderStatus: ChangeOrderStatus): Promise<Order> => {
    try{
        const url = apiUrl + "/orders/change-order-status/" + id;
        console.log("Url: " + url);
        const response =  await axios.post(url, nameOrderStatus);
        const order: Order = response.data;
        return order;
    }
    catch(error){
        console.log("Id: " + id);
        console.log("NameOrderStatus: " + nameOrderStatus);
        throw error;
    }
}

export const addItemToOrder = async (addItems: AddItem[]) => {
    try{
        for(let i = 0; i < addItems.length; i++){
            const addItem = addItems[i];

            const response = await axios.post(apiUrl + "/app/add-item", addItem);
            console.log(response)
            console.log(response.data)
        }
    }
    catch(error){
        throw error;
    }
}

export const getProductsApi = async (): Promise<Product[]> => {
    try{
        const response = await axios.get(apiUrl + "/products");
        const products: Product[] = response.data;
        return products;
    }
    catch(error){
        throw error;
    }
}

export const updateProductApi = async (product: Product, id: number): Promise<Product> =>{
    try{
        const response = await axios.put(apiUrl + "/products/" + id, product);
        const entity: Product = response.data;
        return entity;
    }
    catch(error){
        throw error;
    }
}

export const deleteProductApi = async (id: number) => {
    try{
        const response = await axios.delete(apiUrl + "/products/" + id);
        console.log(response);
    }
    catch(error){
        throw error;
    }
}

export const getCategoriesApi = async (): Promise<Category[]> => {
    try{
        const response = await axios.get(apiUrl + "/categories");
        const categories: Category[] = response.data;
        return categories
    }
    catch(error){
        throw error;
    }
}