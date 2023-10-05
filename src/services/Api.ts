import axios from "axios"
import { User } from "../entities/User";

export const apiUrl = "https://workshop-springboot3-app-befefc2b19cc.herokuapp.com";
const devApiUrl = "http://localhost:8080"

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