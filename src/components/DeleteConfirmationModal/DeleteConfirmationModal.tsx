import React from 'react';
import { Modal } from '../Modal/Modal';
import './DeleteConfirmationModal.css'

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onCancel,
  onConfirm,
}) => {
  return (
    <Modal title="Delete Confirmation" isOpen={isOpen} onClose={onCancel}>
      <div className="modal-actions">
        <p>Are you sure you want to delete this user?</p>
        <button className="styled-button red-button" onClick={onConfirm}>
          Confirm Delete
        </button>
        <button className="styled-button blue-button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </Modal>
  );
};
