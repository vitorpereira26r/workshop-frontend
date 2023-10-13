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
  const initialOrderState: OrderProps = {
    client: null,
    itens: [],
    total: 0.0,
  };

  const [order, setOrder] = useState<OrderProps>(initialOrderState);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
    if (!isOpen) {
      setOrder(initialOrderState);
      setSelectedUser(null);
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

  const handleUserSelection = (username: string | null) => {
    setSelectedUser(username);
  };

  const handleSubmit = async () => {
    if (selectedUser) {
      const user = users.find((u) => u.name === selectedUser);

      if (user) {
        setOrder((prevOrder) => ({
          ...prevOrder,
          client: user,
        }));

        const newOrder: Order = await createOrder(order);
        addOrderToList(newOrder);
        onClose();
      }
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
                className={user.name === selectedUser ? 'selected' : ''}
                onClick={() => handleUserSelection(user.name)}
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
