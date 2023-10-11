import React from 'react'
import './ProductsPage.css'
import { Page } from '../Page'
import { ProductsList } from '../../components/ProductsList/ProductsList'

export const ProductsPage: React.FC = () => {
  return (
    <Page>
        <div className='product-page'>
        <h1 className='title'>Products</h1>
        <ProductsList/>
      </div>
    </Page>
  )
}
