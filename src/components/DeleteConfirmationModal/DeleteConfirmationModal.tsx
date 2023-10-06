import React from 'react';
import { Modal } from '../Modal/Modal';

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
      <p>Are you sure you want to delete this user?</p>
      <div className="modal-actions">
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
