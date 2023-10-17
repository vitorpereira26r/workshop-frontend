import React, { useEffect, useState } from 'react'
import { Order } from '../../entities/Order';
import deleteIcon from '../../assets/icons/delete-icon-red.png'
import { CreateOrderModal } from '../CreateOrderModal/CreateOrderModal';
import { DeleteConfirmationModal } from '../DeleteConfirmationModal/DeleteConfirmationModal';
import { deleteOrder, getAllOrders, payOrder } from '../../services/Order/OrderServices';
import { ChangeStatusModal } from '../ChangeStatusModal/ChangeStatusModal';
import { AddItemModal } from '../AddItemModal/AddItemModal';
import './OrderList.css'
import '../List.css'

export const OrderList: React.FC = () => {

  const [orders, setOrders] = useState<Order[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);
  const [changeStatusModalOpen, setChangeStatusModalOpen] = useState<boolean>(false);
  const [orderToChangeStatus, setOrderToChangeStatus] = useState<Order | null>(null);
  const [addItemModalOpen, setAddItemModalOpen] = useState<boolean>(false);
  const [orderToAddItem, setOrderToAddItem] = useState<Order | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    async function fetchAndSetOrders() {
      try{
        const orderData = await getAllOrders();
        orderData.sort((a, b) => a.id - b.id);
        setOrders(orderData);
      }
      catch(error){
        console.log(error);
      }
    }

    fetchAndSetOrders();
  }

  const handleAddButtonClick = () => {
    setShowAddModal(true);
  }

  const onClose = () => {
    setShowAddModal(false);
  }

  const addOrderToList = (newOrder: Order) => {
    setOrders((prevOrders) => [... prevOrders, newOrder]);
  }

  const handleDelete = (order: Order) => {
    setOrderToDelete(order);
    setShowDeleteModal(true);
  }

  const handleConfirmDelete = async () => {
    if(orderToDelete !== null){
      try{
        deleteOrder(orderToDelete.id);
        
        const updatedOrders = orders.filter((order) => order.id !== orderToDelete.id);
        setOrders(updatedOrders);
      }
      catch(error){
        setOrders((prevUsers) => [...prevUsers, orderToDelete]);
        throw error;
      }
      setShowDeleteModal(false);
      //fetchOrders();
      setOrderToDelete(null);
    }
  }

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setOrderToDelete(null);
  };

  const editOrderToList = (newOrder: Order) => {
    const orderIndex = orders.findIndex((order) => order.id === newOrder.id);

    if(orderIndex !== -1){
      const updatedOrders = [...orders];
      updatedOrders[orderIndex] = newOrder;
      setOrders(updatedOrders);
    }
  }

  const handlePay = async (order: Order) => {
    if(order === null){
      console.log("Order is null");
      return;
    }
    const newOrder = await payOrder(order.id);

    if(newOrder === null){
      console.log("New Order is null");
      return;
    }
    editOrderToList(newOrder);
  }

  const handleChangeStatus = (order: Order) =>{
    setChangeStatusModalOpen(true);
    setOrderToChangeStatus(order);
  }

  const closeChangeStatusModal = () => {
    setChangeStatusModalOpen(false);
    setOrderToChangeStatus(null);
  }

  const showAddButton = () => {
    if(showAddModal){
      return false;
    }
    if(changeStatusModalOpen){
      return false;
    }
    if(showDeleteModal){
      return false;
    }
    if(addItemModalOpen){
      return false;
    }
    return true;
  }

  const closeAddItemModal = () => {
    setAddItemModalOpen(false);
    setOrderToAddItem(null);
  }

  const handleAddItemModalOpen = (order: Order) => {
    setAddItemModalOpen(true);
    setOrderToAddItem(order);
  }

  return (
    <div>
      <CreateOrderModal
        title='Create Order'
        isOpen={showAddModal}
        onClose={onClose}
        addOrderToList={addOrderToList}
      />
      <ChangeStatusModal
        title='Change Status'
        isOpen={changeStatusModalOpen}
        onClose={closeChangeStatusModal}
        order={orderToChangeStatus}
        editOrderToList={editOrderToList}
      />
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
      <AddItemModal
        title="Add Item to Order"
        isOpen={addItemModalOpen}
        onClose={closeAddItemModal}
        order={orderToAddItem}
      />
      <div className='list-me'>
        {showAddButton() && (
          <div className='add-button-me'>
            <button onClick={handleAddButtonClick}>Create Order</button>
          </div>
        )}
        <div>
          <ul className="list-list-me">
            {orders.map((order) => (
              <li key={order.id} className="list-card-me">
                <div className="list-info-me">
                  <div className="list-data-me">
                    <strong>Order ID:</strong> {order.id}
                  </div>
                  <span className='list-data-me'><strong>Moment: </strong>{formatBackendDate(order.moment)}</span>
                  <span className='list-data-me'><strong>Order Status: </strong>{order.orderStatus}</span>
                  <span className='list-data-me'><strong>Client name: </strong>{order.client.name}</span>
                  <div className="list-data-me">
                    <strong>Total:</strong> ${order.total.toFixed(2)}
                  </div>
                  <div className='list-data-me'>
                    <strong>Products: </strong>
                    <ul className='product-list-me'>
                      {order.items.map((item) => 
                      <li key={item.product.id} className='product-item-me'>
                        <p>Name: {item.product.name}</p>
                        <p>Description: {item.product.description}</p>
                        <p>Price per item: ${item.product.price}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Subtotal: ${item.subTotal}</p>
                      </li>
                      )}
                    </ul>
                  </div>
                </div>
                <div className='delete-edit-me'>
                  {order.orderStatus === 'WAITING_PAYMENT' ? (
                  <button className='pay-btn-me' onClick={() => handlePay(order)}>
                    Pay
                  </button>
                  
                ) : (
                  <button className='change-status-btn-me' onClick={() => handleChangeStatus(order)}>
                    Change Status
                  </button>
                )}
                {order.orderStatus === 'WAITING_PAYMENT' && (
                  <button className='add-item-btn-me' onClick={() => handleAddItemModalOpen(order)}>Add Items</button>
                )}
                  <button className='delete-btn-me' onClick={() => handleDelete(order)}><img src={deleteIcon} alt="delete" className='delete-btn-me-img'/></button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function formatBackendDate(dateStringFromBackend: string): string {
  const dateObject = new Date(dateStringFromBackend);

  const year = dateObject.getUTCFullYear();
  const month = (dateObject.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = dateObject.getUTCDate().toString().padStart(2, '0');
  const hours = dateObject.getUTCHours().toString().padStart(2, '0');
  const minutes = dateObject.getUTCMinutes().toString().padStart(2, '0');
  const seconds = dateObject.getUTCSeconds().toString().padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
