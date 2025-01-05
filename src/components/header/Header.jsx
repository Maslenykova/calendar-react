import React, { useState } from 'react';
import Modal from '../modal/Modal';
import './header.scss';
import { days, generateWeekRange } from '../../utils/dateUtils.js';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
 

  const createTask = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = (formData) => {
    console.log('Form Data:', formData);
  };


  const currentMonth = new Date().toLocaleString('default', { month: 'long' });

  return (
    <header className="header">
      <button className="create-task-btn" onClick={createTask}>
        <i className="fas fa-plus create-task-btn__icon" aria-hidden="true"></i>
        <span>Create</span>
      </button>

      {isModalOpen && <Modal onClose={closeModal} onSubmit={handleModalSubmit} />}

      <div className="navigation">
        <button className="navigation__today-btn button" >
          Today
        </button>
        <button
          className="icon-button navigation__nav-icon"
          aria-label="Previous week"
         
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button
          className="icon-button navigation__nav-icon"
          aria-label="Next week"
        
        >
          <i className="fas fa-chevron-right"></i>
        </button>
        <span className="navigation__displayed-month">{currentMonth}</span>
      </div>
    </header>
  );
};

export default Header;