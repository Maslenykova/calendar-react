import React, { useState, useEffect } from 'react';
import Modal from '../modal/Modal';
import { createEvent } from '../../gateway/eventGeteway';
import './header.scss';
import { months } from '../../utils/dateUtils.js';


const Header = ({ weekDates, setWeekStartDate, loadEvents}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const createTask = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handlePrevWeek = () => {
    setWeekStartDate((prev) => new Date(prev.getTime() - 7 * 24 * 60 * 60 * 1000));
  };

  const handleNextWeek = () => {
    setWeekStartDate((prev) => new Date(prev.getTime() + 7 * 24 * 60 * 60 * 1000));
  };

  const handleToday = () => {
    setWeekStartDate(new Date());
  };

  const handleAddEvent = (newEvent) => {
    const { date, startTime, endTime, title, description } = newEvent;
    const dateFrom = new Date(`${date}T${startTime}`);
    const dateTo = new Date(`${date}T${endTime}`);
    const eventToSend = { title, dateFrom, dateTo, description };

    createEvent(eventToSend)
      .then(loadEvents)
      .catch(error => console.error('Ошибка при создании события:', error));
  };

  const handleModalSubmit = (formData) => {
    handleAddEvent(formData); 
    closeModal();
  };
  const getDisplayedMonths = (weekDates) => {
        if (!weekDates || weekDates.length === 0) return '';
    
        const firstMonth = months[weekDates[0].getMonth()];
        const lastMonth = months[weekDates[weekDates.length - 1].getMonth()];
        
        return firstMonth === lastMonth ? firstMonth : `${firstMonth} - ${lastMonth}`;
      };
    
      useEffect(() => {
        if (weekDates && weekDates.length > 0) {
          const firstDay = weekDates[0];
          const lastDay = weekDates[weekDates.length - 1];
    
          if (firstDay.getMonth() === 11 && lastDay.getMonth() === 0) {
              lastDay.getFullYear();
            } else {
              firstDay.getFullYear();
            }
        }
      }, [weekDates]);
    
      const displayedMonths = getDisplayedMonths(weekDates);

  return (
    <header className="header">
      <button className="create-task-btn button" onClick={createTask}>
        <i className="fas fa-plus create-task-btn__icon" aria-hidden="true"></i>
        <span> Create</span>
      </button>

      {isModalOpen && <Modal onClose={closeModal} onSubmit={handleModalSubmit} />}

      <div className="navigation">
        <button className="navigation__today-btn button" onClick={handleToday}>
          Today
        </button>
        <button className="icon-button navigation__nav-icon" onClick={handlePrevWeek}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="icon-button navigation__nav-icon" onClick={handleNextWeek}>
          <i className="fas fa-chevron-right"></i>
        </button>
        <span className="navigation__displayed-month">
          {displayedMonths} {new Date().getFullYear()}
       </span>
      </div>
    </header>
  );
};

export default Header;

