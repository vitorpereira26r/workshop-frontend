import React, { useEffect, useState } from 'react'
import { Modal } from '../Modal/Modal'
import { Order, ChangeOrderStatus } from '../../entities/Order';
import { changeStatus } from '../../services/Order/OrderServices';
import './ChangeStatusModal.css'

interface Props{
    title: string;
    isOpen: boolean;
    onClose: () => void;
    editOrderToList: (newOrder: Order) => void;
    order: Order|null;
}

export const ChangeStatusModal:React.FC<Props> = ({
    title,
    isOpen,
    onClose,
    editOrderToList, 
    order
}) => {

  const [options, setOptions] = useState<ChangeOrderStatus[]>([]);
  const [selectedOption, setSelectedOption] = useState<ChangeOrderStatus>({nameOrderStatus:""});

  useEffect(() => {
    const os1: ChangeOrderStatus = {
        nameOrderStatus: "SHIPPED"
    }
    const os2: ChangeOrderStatus = {
        nameOrderStatus: "DELIVERED"
    }
    const os3: ChangeOrderStatus = {
        nameOrderStatus: "CANCELED"
    }
    const newOptions = [os1, os2, os3];
    setSelectedOption({
        nameOrderStatus:""
    })
    setOptions(newOptions);
  }, [isOpen])

  const handleSubmit = async () => {
    if(order !== null){
        console.log(selectedOption);
        const newOrder: Order = await changeStatus(order.id, selectedOption);
        editOrderToList(newOrder);
        onClose();
    }
    //selectedOption.nameOrderStatus="";
  }

  const handleChange = (option: ChangeOrderStatus) => {
    console.log(option);
    setSelectedOption(option);
  }

  return (
    <Modal
        title={title}
        isOpen={isOpen}
        onClose={onClose}
    >
        <ul className='options-change-status'>
            {options.map((option) => (
                <li key={option.nameOrderStatus} className='option-change-status'>
                    <button className={selectedOption.nameOrderStatus === option.nameOrderStatus ? 'option-change-status-button-selected' : 'option-change-status-button'} onClick={() => handleChange(option)}>{option.nameOrderStatus}</button>
                </li>
            ))}
        </ul>
        <div>
            <button className='submit-change-status-button' onClick={handleSubmit}>Change Status</button>
        </div>
    </Modal>
  )
}
