import React, { useEffect, useState } from 'react'
import { AddItem, Order } from '../../entities/Order';
import { Product } from '../../entities/Product';
import { getProducts } from '../../services/Product/ProductServices';
import { Modal } from '../Modal/Modal';
import './AddItemModal.css'
import { addItem } from '../../services/Order/OrderServices';

interface Props{
    title: string;
    isOpen: boolean;
    onClose: () => void;
    order: Order|null;
}

export const AddItemModal:React.FC<Props> = ({
    title,
    isOpen,
    onClose,
    order
}) => {

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<AddItem[]>([]);
  const [quantityInputs, setQuantityInputs] = useState<{ [productId: number]: number }>({});

  useEffect(() => {
    if (!isOpen) {
        const newQuantityInputs: { [productId: number]: number } = {};
        products.forEach((product) => {
            newQuantityInputs[product.id] = 0;
        });
        setQuantityInputs(newQuantityInputs);
        setSelectedProducts([]);
    }
    fetchProducts();
  }, [isOpen]);

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

  const handleAddItem = (productId: number) => {
    const newItem: AddItem = {
        orderId: order ? order.id : 0,
        productId: productId,
        quantity: quantityInputs[productId] || 0
    };

    if(selectedProducts.length === 0){
        selectedProducts[0] = newItem;
    } else {
        selectedProducts[selectedProducts.length] = newItem; 
    }

    console.log(selectedProducts);
  }

  const getItemClass = (productId: number) => {
    const isProductAdded = selectedProducts.some(item => item.productId === productId);
    return `product-item-add ${isProductAdded ? 'product-item-added' : ''}`;
}

const handleSubmit = async () => {
    await addItem(selectedProducts);
    onClose();
}

  return (
    <Modal
        title={title}
        isOpen={isOpen}
        onClose={onClose}
    >
        <ul className='products-items-add'>
            {products.map((product) => (
                <li key={product.id} className={getItemClass(product.id)}>
                    <div className='product-add-info'>
                        <span className='product-item-add-name'>Name: {product.name}</span>
                        <span className='product-item-add-description'>Description: {product.description}</span>
                        <span className='product-item-add-price'>Price {product.price}</span>
                    </div>
                    <div className='submit-info-add'>
                        <input
                            type="number"
                            className='quantity-of-item'
                            placeholder='Quantity'
                            value={quantityInputs[product.id] || 0}
                            onChange={(e) => {
                                const value = parseInt(e.target.value);
                                setQuantityInputs({ ...quantityInputs, [product.id]: value });
                            }}
                        />
                        <button className='add-item-order-button' onClick={() => handleAddItem(product.id)}>Add Item</button>
                    </div>
                </li>
            ))}
        </ul>
        <div className='submit-itens-to-order-container'>
            <button className='submit-itens-to-order' onClick={handleSubmit}>Submit Itens</button>
        </div>
    </Modal>
  )
}
