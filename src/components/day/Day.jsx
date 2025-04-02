import React, { useState, useEffect } from "react";
import Hour from "../hour/Hour";
import "./day.scss";
import Event from "../event/Event";

const Day = ({ dataDay, dayEvents, events, onDeleteEvent}) => {
  const [currentTimePosition, setCurrentTimePosition] = useState(null);

  useEffect(() => {
    const updatePosition = () => {
      const now = new Date();
      if (now.toDateString() === new Date(dataDay).toDateString()) {
        setCurrentTimePosition((now.getHours() + now.getMinutes() / 60) * (100 / 24));
      } else {
        setCurrentTimePosition(null);
      }
    };

    updatePosition();
    const interval = setInterval(updatePosition, 60000);
    return () => clearInterval(interval);
  }, [dataDay]);


  return (
    <div className="calendar__day" data-day={dataDay}>
      {currentTimePosition !== null && (
        <div className="current-time-line" style={{ top: `${currentTimePosition}%` }}></div>
      )}

      {Array.from({ length: 24 }, (_, hour) => {
        const hourEvents = dayEvents.filter(
          (event) => new Date(event.dateFrom).getHours() === hour
        );

        return (
          <Hour key={hour} dataHour={hour} hourEvents={hourEvents}>
       {hourEvents.map((event) => {
  return (
    <Event
      key={Math.random()}
      id={event.id}
      title={event.title}
      time={`${new Date(event.dateFrom).toLocaleTimeString()} - ${new Date(event.dateTo).toLocaleTimeString()}`}
      dateFrom={event.dateFrom}
      description={event.description}
      events={events}
      onDeleteEvent={onDeleteEvent}
    />
  );
})}
          </Hour>
        );
      })}
    </div>
  );
};


export default Day;