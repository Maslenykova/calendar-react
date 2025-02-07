import React from 'react';
import Day from '../day/Day';

import './week.scss';


const Week = ({ weekDates, events }) => {

  return (
    <div className="calendar__week">
      {weekDates.map((dayStart) => {
        const dayEnd = new Date(dayStart);
        dayEnd.setHours(23, 59, 59, 999);

        const dayEvents = events.filter(
          (event) => event.dateFrom >= dayStart && event.dateFrom <= dayEnd
        );

        return (
          <Day
            key={dayStart.toISOString()}
            dataDay={dayStart.getDate()}
            dayEvents={dayEvents}
          />
        );
      })}
    </div>
  );
};

export default Week;

