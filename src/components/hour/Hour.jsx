import React from 'react';
import Event from '../event/Event';


const Hour = ({ dataHour, hourEvents, events, setEvents}) => {
 
  return (
    <div className="calendar__time-slot" data-time={dataHour + 1}>
      {hourEvents.map(({ id, dateFrom, dateTo, title, description }) => {
     
        return (
          <Event
            key={id}
            id={id}
            title={title}
            description={description}
            dateFrom={dateFrom}
            dateTo={dateTo}
            events={events}
            setEvents={setEvents}
          />
        );
      })}
    </div>
  );
};

export default Hour;

