import React, { useEffect, useState } from 'react'
import editIcon from '../../assets/icons/edit-icon.png'
import deleteIcon from '../../assets/icons/delete-icon-red.png'
import { Product } from '../../entities/Product'
import { getProducts } from '../../services/Product/ProductServices';
import './ProductsList.css'
import "../List.css"

export const ProductsList:React.FC = () => {

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    async function fetchAndSetProducts() {
      try{
        const productData = await getProducts();
        productData.sort((a, b) => a.id - b.id);
        setProducts(productData);
      }
      catch(error){
        console.log(error);
      }
    }

    fetchAndSetProducts();
  }

  return (
    <div>
        <div className='list'>
            <div>
                <ul className='list-list'>
                    {products.map((product) => (
                        <li key={product.id} className='list-card'>
                            <div className='list-info'>
                                <span className='list-data'>{product.name}</span>
                                <span className='list-data'>{product.description}</span>
                                <span className='list-data'>{formatPrice(product.price)}</span>
                            </div>
                            <div className='delete-edit'>
                                <button className='edit-btn'><img src={editIcon} alt="edit" /></button>
                                <button className='delete-btn'><img src={deleteIcon} alt="delete"/></button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
  )
}

function formatPrice(price: number): string{
    return "$" + price.toFixed(2);
}
