import React, { useEffect, useState } from 'react'
import { User } from '../../entities/User';
import { getUsers } from '../../services/User/UserServices';
import './UserList.css'
import user_icon from '../../assets/icons/user-icon.png';
import { CreateUserModal } from '../CreateUserModal/CreateUserModal';

export const UserList:React.FC = () => {

  const [users, setUsers] = useState<User[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    async function fetchAndSetUsers() {
        try {
          const usersData = await getUsers();
          setUsers(usersData);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      }
  
      fetchAndSetUsers();
  }, []);

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

  const handleAddButtonClick = () => {
    setShowAddModal(true);
  }

  const onClose = () => {
    setShowAddModal(false);
    fetchUsers();
  }

  return (
    <div>
      <CreateUserModal
        title={"Create User"}
        isOpen={showAddModal}
        onClose={onClose}
      />
      <div className='users'>
        <div>
          <button className='add-button' onClick={handleAddButtonClick}>Create User</button>
        </div>
        <div>
          <ul className="user-list">
            {users.map((user) => (
              <li key={user.id} className="user-card">
                <div className="user-image">
                  <img src={user_icon}/>
                </div>
                <div className="user-info">
                  <span className='user-data name yellow-font'>{user.name}</span>
                  <span className='user-data email blue-font'>{user.email}</span>
                  <span className='user-data phone green-font'>{user.phone}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
