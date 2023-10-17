import React, { useEffect, useState } from 'react';
import { Product } from '../../entities/Product';
import { Modal } from '../Modal/Modal';
import { createProduct } from '../../services/Product/ProductServices';
import './CreateProductModal.css';
import { Category } from '../../entities/Category';
import { getCategories } from '../../services/Category/CategoryServices';

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  addProductToList: (newProduct: Product) => void;
}

export const CreateProductModal: React.FC<ModalProps> = ({
  title,
  isOpen,
  onClose,
  addProductToList,
}) => {
  const initialProductState: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0.0,
    categories: [],
  };

  const [product, setProduct] = useState<Product>(initialProductState);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (!isOpen) {
      fetchCategories();
      setProduct(initialProductState);
      setSelectedCategories([]);
    }
  }, [isOpen]);

  const fetchCategories = async () => {
    try {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching Categories:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleCategoryClick = (selectedCategory: Category) => {
    if (selectedCategories.some((category) => category.id === selectedCategory.id)) {
      // If already selected, remove it
      const updatedSelectedCategories = selectedCategories.filter(
        (category) => category.id !== selectedCategory.id
      );
      setSelectedCategories(updatedSelectedCategories);
    } else {
      // If not selected, add it
      setSelectedCategories([...selectedCategories, selectedCategory]);
    }
  };

  const handleSubmit = async () => {
    createProduct({ ...product, categories: selectedCategories });
    addProductToList({ ...product, categories: selectedCategories });
    onClose();
  };

  return (
    <Modal title={title} isOpen={isOpen} onClose={onClose}>
      <form className="create-product-form">
        <div className="form-group-product">
          <label className="label-create-product" htmlFor="name">
            Name:
          </label>
          <input
            className="input-name-edit"
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group-product">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <textarea
            className="input-description-edit"
            id="description"
            name="description"
            value={product.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price" className="form-label">
            Price:
          </label>
          <input
            className="input-price-edit"
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleInputChange}
          />
        </div>
        <div className="categories-container">
          {categories.map((category) => (
            <button
              key={category.id}
              type='button'
              className={`category-button ${selectedCategories.some((c) => c.id === category.id) ? 'selected' : ''}`}
              onClick={() => handleCategoryClick(category)}
            >
              {category.id} {category.name}
            </button>
          ))}
        </div>
        <div className="form-actions">
          <button type="button" onClick={handleSubmit} className="styled-button blue-button">
            Create Product
          </button>
        </div>
      </form>
    </Modal>
  );
};
