import { Product } from "../../entities/Product";
import { createProductApi, deleteProductApi, getProductsApi, updateProductApi } from "../Api";

export const getProducts = async (): Promise<Product[]> => {
    try{
        const products: Product[] = await getProductsApi();
        return products;
    }
    catch(error){
        throw error;
    }
}

export const createProduct = async (product: Product): Promise<Product> => {
    try{
        const newProduct: Product = await createProductApi(product);
        return newProduct;
    }
    catch(error){
        throw error;
    }
}

export const updateProduct = async (product: Product, id: number): Promise<Product> => {
    try{
        const entity: Product = await updateProductApi(product, id);
        return entity;
    }
    catch(error){
        throw error;
    }
}

export const deleteProduct = async (id: number) => {
    try{
        deleteProductApi(id);
    }
    catch(error){
        throw error;
    }
}