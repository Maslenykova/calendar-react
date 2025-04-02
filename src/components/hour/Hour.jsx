import React from 'react';
import Event from '../event/Event';
import { formatMins } from '../../../src/utils/dateUtils.js';

const Hour = ({ dataHour, hourEvents, onDeleteEvent }) => {
 
  return (
    <div className="calendar__time-slot" data-time={dataHour + 1}>
      {hourEvents.map(({ id, dateFrom, dateTo, title, description }) => {
        const eventStart = `${dateFrom.getHours()}:${formatMins(dateFrom.getMinutes())}`;
        const eventEnd = `${dateTo.getHours()}:${formatMins(dateTo.getMinutes())}`;

        console.log(`${dateFrom.getMinutes()}px`)

        return (
          <Event
            key={id}
            id={id}
            height={`${(dateTo - dateFrom) / (1000 * 60)}px`}
            marginTop={`${dateFrom.getMinutes()}px`}
            time={`${eventStart} - ${eventEnd}`}
            title={title}
            description={description}
            dateFrom={dateFrom}
            onDeleteEvent={onDeleteEvent}
          />
        );
      })}
    </div>
  );
};

export default Hour;

