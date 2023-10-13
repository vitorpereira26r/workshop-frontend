import React, { useEffect, useState } from 'react'
import { Modal } from '../Modal/Modal'
import { User } from '../../entities/User';
import { createUser } from '../../services/User/UserServices';
import './CreateUserModal.css'

interface ModalProps{
    title: string;
    isOpen: boolean;
    onClose: () => void;
    addUserToList: (newUser: User) => void;
}

export const CreateUserModal:React.FC<ModalProps> = ({title, isOpen, onClose, addUserToList}) => {

  const initialUserState: User = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    password: '',
  };

  const [user, setUser] = useState<User>(initialUserState);

  useEffect(() => {
    if (!isOpen) {
      setUser(initialUserState);
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  }

  const handleSubmit = async () => {
    createUser(user);
    addUserToList(user);
    onClose();
  }

  return (
    <Modal title={title} isOpen={isOpen} onClose={onClose}>
      <form className="create-user-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className='label-create-user' htmlFor="name">Name:</label>
          <input
            className='input-create-user'
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            className='input-create-user'
            type="text"
            id="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            className='input-create-user'
            type="text"
            id="phone"
            name="phone"
            value={user.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            className='input-create-user'
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-actions">
          <button type="submit" className='styled-button blue-button'>Create User</button>
        </div>
      </form>
    </Modal>
  )
}
