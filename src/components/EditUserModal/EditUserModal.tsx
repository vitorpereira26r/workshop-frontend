import React, { useEffect, useState } from 'react'
import { Modal } from '../Modal/Modal'
import { User } from '../../entities/User';
import { updateUserById } from '../../services/User/UserServices';
import './EditUserModal.css'

interface ModalProps{
    title: string;
    isOpen: boolean;
    onClose: () => void;
    user: User;
}

export const EditUserModal:React.FC<ModalProps> = ({title, isOpen, onClose, user}) => {

  const [userToUpdate, setUserToUpdate] = useState<User>({...user});

  useEffect(() => {
    setUserToUpdate({...user});
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserToUpdate({
      ...user,
      [name]: value,
    });
  }

  const handleSubmit = () => {
    updateUserById(userToUpdate, userToUpdate.id);
    onClose();
  }

  return (
    <Modal title={title} isOpen={isOpen} onClose={onClose}>
      <form className="create-user-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userToUpdate.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={userToUpdate.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={userToUpdate.phone}
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
