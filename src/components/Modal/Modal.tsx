import React from 'react';
import closeIcon from '../../assets/icons/tinny-close-icon-black.png'
import './Modal.css';

interface ModalProps {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ title, isOpen, onClose, children }) => {

  const overlayRef = React.useRef(null);

  const handleOverlayClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if(e.target === overlayRef.current){
        onClose();
    }
  }

  if(!isOpen){
    return null;
  }

  return (
    <div className='modal'>
        <div className='modal-overlay' onClick={handleOverlayClick} ref={overlayRef}/>
        <div className='modal-box'>
            <button className='modal-close-btn' onClick={onClose}>
                <img src={closeIcon} alt="close-modal" />
            </button>
            <div className='modal-title'>
                {title}
            </div>
            <div>
                {children}
            </div>
        </div>
    </div>
  );
};
