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
  const [searchTerm, setSearchTerm] = useState<string>('');

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
/*
  const getItemClass = (productId: number) => {
    const isProductAdded = selectedProducts.some(item => item.productId === productId);
    return `product-item-add ${isProductAdded ? 'product-item-added' : ''}`;
  }*/

  const handleSubmit = async () => {
    await addItem(selectedProducts);
    onClose();
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Modal
        title={title}
        isOpen={isOpen}
        onClose={onClose}
    >
        <div className="search-bar">
        <input
        className='input-search-bar-add-item'
          type="text"
          placeholder="Search by product name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
        <div className='scrollable-list'>
        <ul className='products-items-add-me'>
            {filteredProducts.map((product) => (
                <li key={product.id} className={`product-item-add ${selectedProducts.some(item => item.productId === product.id) ? 'product-item-added' : ''}`}>
                    <div className='product-add-info-me'>
                        <span className='product-item-add-name-me'>Name: {product.name}</span>
                        <span className='product-item-add-description-me'>Description: {product.description}</span>
                        <span className='product-item-add-price-me'>Price {product.price}</span>
                    </div>
                    <div className='submit-info-add-me'>
                        <input
                            type="number"
                            className='quantity-of-item-me'
                            placeholder='Quantity'
                            value={quantityInputs[product.id] || 0}
                            onChange={(e) => {
                                const value = parseInt(e.target.value);
                                setQuantityInputs({ ...quantityInputs, [product.id]: value });
                            }}
                        />
                        <button className='add-item-order-button-me' onClick={() => handleAddItem(product.id)}>Add Item</button>
                    </div>
                </li>
            ))}
        </ul>
        </div>
        <p>{"Refresh the page to see the products added to the order. (still trying to solve that!)"}</p>
        <div className='submit-itens-to-order-container-me'>
            <button className='submit-itens-to-order-me' onClick={handleSubmit}>Submit Itens</button>
        </div>
    </Modal>
  )
}
