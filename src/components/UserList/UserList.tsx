import React, { useEffect, useState } from 'react'
import { User } from '../../entities/User';
import { deleteUserById, getUsers } from '../../services/User/UserServices';
import { CreateUserModal } from '../CreateUserModal/CreateUserModal';
import user_icon from '../../assets/icons/user-icon.png';
import editIcon from '../../assets/icons/edit-icon.png'
import deleteIcon from '../../assets/icons/delete-icon-red.png'
import './UserList.css'
import { DeleteConfirmationModal } from '../DeleteConfirmationModal/DeleteConfirmationModal';
import { EditUserModal } from '../EditUserModal/EditUserModal';

export const UserList:React.FC = () => {

  const initialUserState: User = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    password: '',
  };

  const [users, setUsers] = useState<User[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User>(initialUserState);

  useEffect(() => {
    fetchUsers();
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

  const handleDelete = (user: User) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  } 

  const handleConfirmDelete = async () => {
    if(userToDelete !== null){
      try{
        deleteUserById(userToDelete.id);
        
        const updatedUsers = users.filter((user) => user.id !== userToDelete.id);
        setUsers(updatedUsers);
        fetchUsers();
      }
      catch(error){
        setUsers((prevUsers) => [...prevUsers, userToDelete]);
        throw error;
      }
      setShowDeleteModal(false);
      setUserToDelete(null);
    }
  }

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  const handleAddButtonClick = () => {
    setShowAddModal(true);
  }

  const handleEdit = (user: User) => {
    setShowEditModal(true);
    setUserToEdit(user);
  }

  const closeEditModal = () => {
    setShowEditModal(false);
    fetchUsers();
    setUserToEdit(initialUserState);
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
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
      <EditUserModal
        title={"Edit User"}
        isOpen={showEditModal}
        onClose={closeEditModal}
        user={userToEdit}
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
                <div className='delete-edit'>
                  <button className='edit-btn' onClick={() => handleEdit(user)}><img src={editIcon} alt="edit" /></button>
                  <button className='delete-btn' onClick={() => handleDelete(user)}><img src={deleteIcon} alt="delete" className='delete-btn'/></button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
