import React from 'react';
import Hour from '../hour/Hour';
import './day.scss';

const Day = ({ dataDay, dayEvents }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const now = new Date();
  const currentDate = now.toISOString().split('T')[0]; 
  const dataDayFormatted = new Date(dataDay).toISOString().split('T')[0];

  const isToday = currentDate === dataDayFormatted;

  const currentTimePosition = isToday
  ? (now.getHours() + now.getMinutes() / 60) * (100 / 24)
  : null;

  return (

    <div className="calendar__day" data-day={dataDay}>


       {isToday && currentTimePosition !== null && ( 
        <div
          className="current-time-line"
          style={{
            top: `${currentTimePosition}%`, 
          }}
        ></div>
      )} 

      {hours.map((hour) => {
        const hourEvents = dayEvents.filter(
          (event) => event.dateFrom.getHours() === hour
        );

        return (
          <Hour key={dataDay + hour} dataHour={hour} hourEvents={hourEvents} />
        );
      })}
    </div>
  );
};

export default Day;


