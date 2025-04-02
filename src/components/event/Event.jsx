import React, { useState } from 'react';
import './event.scss';

const Event = ({ title, time, description, height, id, dateFrom, onDeleteEvent}) => { 

  const [showDelete, setShowDelete] = useState(false);
 
  const onDelete = () =>{
    const now = new Date();
      if ((new Date(dateFrom) - now) / (1000 * 60) < 15) {
        alert("Event cannot be deleted less than 15 minutes before it starts");
        return;
      }
      onDeleteEvent(id);
  }

  return (
    <div style={{ height }} onClick={() => setShowDelete(!showDelete)} className="event">
      {showDelete && (
        <button
          className="event__delete-btn"
          onClick={onDelete}
        >
          Delete
        </button>
      )}
      <div className="event__title">{title}</div>
      <div className="event__time">{time}</div>
      <div className="event__description">{description}</div>
    </div>
  );
};

export default Event;