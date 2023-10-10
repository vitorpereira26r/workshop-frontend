import React, { useEffect, useState } from 'react'
import { Order, OrderProps } from '../../entities/Order';
import { Modal } from '../Modal/Modal';
import { createOrder } from '../../services/Order/OrderServices';
import { User } from '../../entities/User';
import { getUsers } from '../../services/User/UserServices';
import { Dropdown } from '../Dropdown/Dropdown';

interface ModalProps{
    title: string;
    isOpen: boolean;
    onClose: () => void;
    addOrderToList: (newOrder: Order) => void;
}

export const CreateOrderModal: React.FC<ModalProps> = ({title, isOpen, onClose, addOrderToList}) => {

  const inicialOrderState: OrderProps = {
    client: null,
    itens: [],
    total: 0.0
  }

  const [order, setOrder] = useState<OrderProps>(inicialOrderState);
  const [users, setUsers] = useState<User[]>([]);
  const [usersString, setUsersString] = useState<string[]>([]);

  useEffect(() => {
    fetchUsers();
    if(!isOpen){
        setOrder(inicialOrderState);
    }
    turnIntoString();
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
  }

  const turnIntoString = () => {
    const userList = users.map((user) => user.name);
    setUsersString(userList);
  }

  const handleInputChange = (username: string|null) => {
    console.log(username);
    if(username !== null){
      const user: User|undefined = users.find((u) => u.name === username);
      console.log(user?.name);
  
      if(user !== undefined){
        console.log("here")
        setOrder((prevOrder) => ({
          ...prevOrder,
          client: user,
        }));
        console.log(order.client)
      }
    }
    }

  const handleSubmit = async () => {
    if(order.client !== null){
      const newOrder: Order = await createOrder(order);
      addOrderToList(newOrder);
      onClose();
    } else {
      console.log(order.client)
    }
  }

  return (
    <Modal title={title} isOpen={isOpen} onClose={onClose}>
      <div className='custom-modal'> {/* Adicione a classe personalizada para o modal */}
        <Dropdown options={usersString} title={'Users'} handleSelection={handleInputChange} />
        <div className='form-actions'>
          <button type='submit' className='styled-button blue-button' onClick={handleSubmit}>
            Create Order
          </button>
        </div>
      </div>
    </Modal>
  )
}
