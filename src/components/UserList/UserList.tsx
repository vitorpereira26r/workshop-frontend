import React, { useEffect, useState } from 'react'
import { User } from '../../entities/User';
import { deleteUserById, getUsers } from '../../services/User/UserServices';
import { CreateUserModal } from '../CreateUserModal/CreateUserModal';
import user_icon from '../../assets/icons/user-icon.png';
import editIcon from '../../assets/icons/edit-icon.png'
import deleteIcon from '../../assets/icons/delete-icon-red.png'
import { EditUserModal } from '../EditUserModal/EditUserModal';
import { DeleteConfirmationModal } from '../DeleteConfirmationModal/DeleteConfirmationModal';
import './UserList.css'
import '../List.css'

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

  const addUserToList = (newUser: User) => {
    setUsers((prevUsers) => [... prevUsers, newUser]);
  }

  const editUserToList = (newUser: User) => {
    const userIndex = users.findIndex((user) => user.id === newUser.id);

    if(userIndex !== -1){
      const updatedUsers = [...users];
      updatedUsers[userIndex] = newUser
      setUsers(updatedUsers);
    }
  }

  const closeEditModal = () => {
    setShowEditModal(false);
    setUserToEdit(initialUserState);
  }

  const onClose = () => {
    setShowAddModal(false);
  }

  return (
    <div>
      <CreateUserModal
        title={"Create User"}
        isOpen={showAddModal}
        onClose={onClose}
        addUserToList={addUserToList}
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
        editUserToList={editUserToList}
        user={userToEdit}
      />
      <div className='list'>
        {!showAddModal && (
          <div className='add-button'>
            <button onClick={handleAddButtonClick}>Create User</button>
          </div>
        )}
        <div>
          <ul className="list-list">
            {users.map((user) => (
              <li key={user.id} className="list-card">
                <div className="user-image">
                  <img src={user_icon}/>
                </div>
                <div className="list-info">
                  <span className='list-data name yellow-font'>{user.name}</span>
                  <span className='list-data email'>{user.email}</span>
                  <span className='list-data phone'>{user.phone}</span>
                </div>
                <div className='delete-edit'>
                  <button className='edit-btn' onClick={() => handleEdit(user)}><img src={editIcon} alt="edit" /></button>
                  <button className='delete-btn' onClick={() => handleDelete(user)}><img src={deleteIcon} alt="delete"/></button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
