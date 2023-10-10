import React from 'react'
import { Page } from '../Page'
import './OrdersPage.css'
import { OrderList } from '../../components/OrdersList/OrderList'

export const OrdersPage: React.FC = () => {
  return (
    <Page>
        <div className='order-page'>
            <h1 className='title'>Orders Page</h1>
            <OrderList/>
        </div>
    </Page>
  )
}
