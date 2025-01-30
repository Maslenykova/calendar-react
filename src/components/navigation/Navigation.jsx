import React from 'react';
import './navigation.scss';

import { days } from '../../utils/dateUtils.js';
const Navigation = ({ weekDates }) => {
  const today = new Date();

  return (
    <header className="calendar__header">
      {weekDates.map((dayDate) => {
        const isToday =
          dayDate.getDate() === today.getDate() &&
          dayDate.getMonth() === today.getMonth() &&
          dayDate.getFullYear() === today.getFullYear();

        return (
          <div
            className= "calendar__day-label day-label"
            key={dayDate}
          >
            <span className="day-label__day-name">{days[dayDate.getDay()]}</span>
            <span className={`day-label__day-number ${isToday ? 'current-day' : ''}`}>{dayDate.getDate()}</span>
          </div>
        );
      })}
    </header>
  );
};


export default Navigation;