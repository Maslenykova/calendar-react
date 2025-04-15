import React, { useState } from 'react';
import { formatMins } from '../../../src/utils/dateUtils.js';
import { deleteEvent } from '../../gateway/eventGeteway.jsx';
import './event.scss';

const Event = ({ id, title, description, dateFrom, dateTo, setEvents, events }) => {
  const [isDeleteBtnVisble, setDeleteBtnVisble] = useState(false);

  const eventStart = `${dateFrom.getHours()}:${formatMins(dateFrom.getMinutes())}`;
  const eventEnd = `${dateTo.getHours()}:${formatMins(dateTo.getMinutes())}`;

  const onDelete = () => {
    const now = new Date();
    const eventStartTime = new Date(dateFrom);
    const diffInMs = eventStartTime - now;
    const fifteenMinutes = 15 * 60 * 1000;

    if (eventStartTime > now && diffInMs < fifteenMinutes) {
      alert('Event cannot be deleted less than 15 minutes before it starts');
      return;
    }
    deleteEvent(id).then(() => {
      setEvents(events.filter(event => event.id !== id));
    });
  };

  return (
    <div
      style={{
        height: `${(dateTo - dateFrom) / (1000 * 60)}px`,
        marginTop: `${dateFrom.getMinutes()}px`,
      }}
      onClick={() => setDeleteBtnVisble(!isDeleteBtnVisble)}
      className="event"
    >
      {isDeleteBtnVisble && (
        <button className="event__delete-btn" onClick={onDelete}>
          Delete
        </button>
      )}
      <div className="event__title">{title}</div>
      <div className="event__time">{`${eventStart} - ${eventEnd}`}</div>
      <div className="event__description">{description}</div>
    </div>
  );
};

export default Event;
