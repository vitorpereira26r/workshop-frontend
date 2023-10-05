import React from 'react'
import { Page } from '../Page'
import { UserList } from '../../components/UserList/UserList'
import './UsersPage.css'
import { Modal } from '../../components/Modal/Modal'

export const UsersPage:React.FC = () => {

  return (
    <Page>
      <div className='user-page'>
        <h1 className='title'>Users</h1>
        <UserList/>
      </div>
    </Page>
  )
}
