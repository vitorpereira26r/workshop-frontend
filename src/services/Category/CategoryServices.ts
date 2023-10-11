import { Category } from "../../entities/Category";
import { getCategoriesApi } from "../Api";

export const getCategories = async (): Promise<Category[]> => {
    try{
        const categories: Category[] = await getCategoriesApi();
        return categories;
    }
    catch(error){
        throw error;
    }
}