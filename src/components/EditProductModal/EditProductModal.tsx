import React, { useEffect, useState } from 'react'
import { Product } from '../../entities/Product';
import { updateProduct } from '../../services/Product/ProductServices';
import { Modal } from '../Modal/Modal';
import './EditProductModal.css'

interface ModalProps{
    title: string;
    isOpen: boolean;
    onClose: () => void;
    editProductToList: (newUser: Product) => void;
    product: Product;
}

export const EditProductModal:React.FC<ModalProps> = ({
    title,
    isOpen,
    onClose,
    editProductToList,
    product
}) => {

  const [productToEdit, setProductToEdit] = useState<Product>({...product});

  useEffect(() => {
    setProductToEdit({...product});
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductToEdit((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  }

  const handleSubmit = () => {
    console.log(productToEdit);
    updateProduct(productToEdit, productToEdit.id);
    editProductToList(productToEdit);
    onClose();
  }

  return (
    <Modal
        title={title}
        isOpen={isOpen}
        onClose={onClose}
    >
        <form className="create-product-form" onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="name" className="form-label">Name:</label>
            <input
                className='input-name-edit'
                type="text"
                id="name"
                name="name"
                value={productToEdit.name}
                onChange={handleInputChange}
            />
        </div>
        <div className="form-group">
            <label htmlFor="description" className="form-label">Description:</label>
            <textarea
                className='input-description-edit'
                id="description"
                name="description"
                value={productToEdit.description}
                onChange={handleInputChange}
            />
        </div>
        <div className="form-group">
            <label htmlFor="price" className="form-label">Price:</label>
            <input
                className='input-price-edit'
                type="number"
                id="price"
                name="price"
                value={productToEdit.price}
                onChange={handleInputChange}
            />
        </div>
        <div className="form-actions">
          <button type="submit" className='styled-button blue-button'>Update User</button>
        </div>
      </form>
    </Modal>
  )
}
