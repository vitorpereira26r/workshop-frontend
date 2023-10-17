import React, { useEffect, useState } from 'react'
import editIcon from '../../assets/icons/edit-icon.png'
import deleteIcon from '../../assets/icons/delete-icon-red.png'
import { Product } from '../../entities/Product'
import { deleteProduct, getProducts } from '../../services/Product/ProductServices';
import './ProductsList.css'
import "../List.css"
import { EditProductModal } from '../EditProductModal/EditProductModal';
import { DeleteConfirmationModal } from '../DeleteConfirmationModal/DeleteConfirmationModal';
import { CreateProductModal } from '../CreateProductModal/CreateProductModal';

export const ProductsList:React.FC = () => {

  const inicialProductState: Product = {
    id: 0,
    name: "",
    description: "",
    price: 0.0,
    categories: []
  }

  const [products, setProducts] = useState<Product[]>([]);
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [productToEdit, setProductToEdit] = useState<Product>(inicialProductState);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [productToDelete, setProductToDelete] = useState<Product>(inicialProductState);

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

  const handleEditButtonClick = (product: Product) => {
    setEditModalOpen(true);
    setProductToEdit(product);
  }

  const editProductToList = (newProduct: Product) => {
    const productIndex = products.findIndex((product) => product.id === newProduct.id);

    if(productIndex !== -1){
      const updatedProducts = [...products];
      updatedProducts[productIndex] = newProduct;
      setProducts(updatedProducts);
    }
  }

  const onCloseEditModal = () => {
    setEditModalOpen(false);
    setProductToEdit(inicialProductState);
  }

  const handleDeleteButtonClick = (product: Product) => {
    setDeleteModalOpen(true);
    setProductToDelete(product);
  }

  const handleConfirmDelete = async () => {
    if(productToDelete !== inicialProductState){
      try{
        console.log(productToDelete);
        deleteProduct(productToDelete.id);
        
        const updatedProducts = products.filter((product) => product.id !== productToDelete.id);
        setProducts(updatedProducts);
      }
      catch(error){
        setProducts((prevProducts) => [...prevProducts, productToDelete]);
        throw error;
      }
      setDeleteModalOpen(false);
      setProductToDelete(inicialProductState);
    }
  }

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setProductToDelete(inicialProductState);
  }

  const handleAddButtonClick = () => {
    setAddModalOpen(true);
  }

  const closeAddModal = () =>{
    setAddModalOpen(false);
  }

  const addProductToList = (newProduct: Product) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  }

  const showAddButton = () => {
    if(editModalOpen){
      return false;
    }
    if(deleteModalOpen){
      return false;
    }
    if(addModalOpen){
      return false;
    }
    return true;
  }

  return (
    <div>
      <CreateProductModal
        title='Create Product'
        isOpen={addModalOpen}
        onClose={closeAddModal}
        addProductToList={addProductToList}
      />
      <EditProductModal
        title={"Edit Product"}
        isOpen={editModalOpen}
        onClose={onCloseEditModal}
        editProductToList={editProductToList}
        product={productToEdit}
      />
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
        <div className='list-me'>
        {showAddButton() && (
          <div className='add-button-me'>
            <button onClick={handleAddButtonClick}>Create Product</button>
          </div>
        )}
            <div>
                <ul className='list-list-me'>
                    {products.map((product) => (
                        <li key={product.id} className='list-card-me'>
                            <div className='list-info-me'>
                                <span className='list-data-me'>{product.name}</span>
                                <span className='list-data-me'>{product.description}</span>
                                <span className='list-data-me'>{formatPrice(product.price)}</span>
                                <div className="categories-container-me">
                                  {product.categories.map((category) => (
                                    <span key={category.id} className="category-me">{category.name}</span>
                                  ))}
                                </div>
                            </div>
                            <div className='delete-edit-me'>
                                <button className='edit-btn-me' onClick={() => handleEditButtonClick(product)}><img src={editIcon} alt="edit" /></button>
                                <button className='delete-btn-me' onClick={() => handleDeleteButtonClick(product)}><img src={deleteIcon} alt="delete"/></button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
  )
}

function formatPrice(price: number | undefined): string {
  if (typeof price === 'number') {
    return "$" + price.toFixed(2);
  }
  return "$" + price + ".00"; 
}
