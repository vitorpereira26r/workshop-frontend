import { Product } from "../../entities/Product";
import { getProductsApi } from "../Api";

export const getProducts = async (): Promise<Product[]> => {
    try{
        const products: Product[] = await getProductsApi();
        return products;
    }
    catch(error){
        throw error;
    }
}