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

  const showAddButton = () => {
    if(showAddModal){
      return false;
    }
    if(showDeleteModal){
      return false;
    }
    if(showEditModal){
      return false;
    }
    return true;
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
      <div className='list-me'>
        {showAddButton() && (
          <div className='add-button-me'>
            <button onClick={handleAddButtonClick}>Create User</button>
          </div>
        )}
        <div>
          <ul className="list-list-me">
            {users.map((user) => (
              <li key={user.id} className="list-card-me">
                <div className="user-image-me">
                  <img src={user_icon}/>
                </div>
                <div className="list-info-me">
                  <span className='list-data-me name yellow-font'>Username: {user.name}</span>
                  <span className='list-data-me email'><strong>Email: </strong>{user.email}</span>
                  <span className='list-data-me phone'><strong>Phone Number: </strong>{user.phone}</span>
                </div>
                <div className='delete-edit-me'>
                  <button className='edit-btn-me' onClick={() => handleEdit(user)}><img src={editIcon} alt="edit" /></button>
                  <button className='delete-btn-me' onClick={() => handleDelete(user)}><img src={deleteIcon} alt="delete"/></button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
