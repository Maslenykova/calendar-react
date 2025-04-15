import React from 'react';
import Day from '../day/Day';
import './week.scss';

const Week = ({ weekDates, events, setEvents }) => {
  return (
    <div className="calendar__week">
      {weekDates.map(dayStart => {
        const dayEnd = new Date(dayStart);
        dayEnd.setHours(23, 59, 59, 999);

        const dayEvents = events.filter(
          event =>
            new Date(event.dateFrom) >= new Date(dayStart) &&
            new Date(event.dateFrom) <= new Date(dayEnd),
        );

        return (
          <Day
            key={dayStart.toISOString()}
            dataDay={dayStart}
            dayEvents={dayEvents}
            events={events}
            setEvents={setEvents}
          />
        );
      })}
    </div>
  );
};

export default Week;
