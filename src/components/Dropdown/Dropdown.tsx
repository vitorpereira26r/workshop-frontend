import React, { useState } from 'react'
import './Dropdown.css'


interface DropdownProps {
    options: string[];
    title: string;
    handleSelection: (userName: string|null) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({options, title, handleSelection}) => {

  const [selectedOption, setSelectedOption] = useState<string|null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<Boolean>(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(true);
  }

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
    handleSelection(selectedOption);
  }

  return (
    <div className='dropdown-input'>
        <input
            type="text"
            placeholder={title}
            value={selectedOption || ''}
            onChange={() => {}}
            onClick={toggleDropdown}
        />
        {isDropdownOpen && (
            <ul className='dropdown-options'>
                {options.map((option) => (
                    <li key={option} onClick={() => handleOptionSelect(option)}>
                        {option}
                    </li>
                ))}
            </ul>
        )}
    </div>
  )
}
