import React, { useEffect, useState } from 'react';
import { Order, OrderProps } from '../../entities/Order';
import { Modal } from '../Modal/Modal';
import { createOrder } from '../../services/Order/OrderServices';
import { User } from '../../entities/User';
import { getUsers } from '../../services/User/UserServices';
import './CreateOrderModal.css';

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  addOrderToList: (newOrder: Order) => void;
}

export const CreateOrderModal: React.FC<ModalProps> = ({
  title,
  isOpen,
  onClose,
  addOrderToList,
}) => {

  const initialUserState: User = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    password: '',
  };
  
  const initialOrderState: OrderProps = {
    client: initialUserState,
    itens: [],
    total: 0.0,
  };

  const [order, setOrder] = useState<OrderProps>(initialOrderState);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User>(initialUserState);

  useEffect(() => {
    fetchUsers();
    if (!isOpen) {
      setOrder(initialOrderState);
      setSelectedUser(initialUserState);
    }
  }, [isOpen]);

  const fetchUsers = () => {
    async function fetchAndSetUsers() {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    fetchAndSetUsers();
  };

  const handleUserSelection = (user: User) => {
    console.log("User: ");
    console.log(user);

    setSelectedUser(user);

    const newOrder: OrderProps = {
      client: user,
      itens: [],
      total: 0.0,
    };

    setOrder(newOrder);
  };

  const handleSubmit = async () => {
    console.log("Selected User: ");
    console.log(selectedUser);

    console.log(order);

    if(order.client !== initialUserState){
      const newOrder: Order = await createOrder(order);
      addOrderToList(newOrder);
      onClose();
    }
    else{
      console.log("user null");
      console.log(order.client);
    }

  };

  return (
    <Modal
      title={title}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="create-order-modal">
        <h4>Select the user that you have the order:</h4>
        <div className="user-list-container">
          <ul className="user-list">
            {users.map((user) => (
              <li
                key={user.id}
                className={user === selectedUser ? 'selected' : ''}
                onClick={() => handleUserSelection(user)}
              >
                {user.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="form-actions">
          <button
            type="submit"
            className="styled-button blue-button"
            onClick={handleSubmit}
          >
            Create Order
          </button>
        </div>
      </div>
    </Modal>
  );
};
