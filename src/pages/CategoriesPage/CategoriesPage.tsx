import React from 'react'
import './CategoriesPage.css'
import { Page } from '../Page'
import { CategoriesList } from '../../components/CategoriesList/CategoriesList'

export const CategoriesPage: React.FC = () => {
  return (
    <Page>
        <div className='category-page'>
        <h1 className='title'>Categories</h1>
        <p>Obs.: I will not allow in the application creation, updaye and delete of categories, the application have this fixed number of categories.</p>
        <CategoriesList/>
      </div>
    </Page>
  )
}
