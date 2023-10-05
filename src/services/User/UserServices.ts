import { createUserApi, fetchUsers } from "../Api";
import { User } from "../../entities/User";

export const getUsers = async (): Promise<User[]> => {
    try {
        const users: User[] = await fetchUsers();
        return users;
    }
    catch(error){
        throw error;
    }
}

export const createUser = async (user: User): Promise<User> => {
    try {
        const entity: User = await createUserApi(user);
        return entity;
    }
    catch(error){
        throw error;
    }
}