import React, { useState, useEffect } from 'react';
import Header from './components/header/Header';
import Calendar from './components/calendar/Calendar';
import { generateWeekRange, getWeekStartDate } from './utils/dateUtils';
import { createEvent, fetchEvents, deleteEvent } from './gateway/eventGeteway';

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = () => {
    fetchEvents()
      .then(events => {
        const fixedEvents = events.map(event => ({
          ...event,
          title: event.title || "No title",
          dateFrom: new Date(event.dateFrom),
          dateTo: new Date(event.dateTo),
        }));
        setEvents(fixedEvents.filter(event => !isNaN(event.dateFrom) && !isNaN(event.dateTo)));
      })
      .catch(error => console.error("Ошибка загрузки событий:", error));
  };


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
      .then(() => {
        console.log('Событие создано, загружаем обновленный список');
        return fetchEvents();
      })
      .then(events => {
        console.log("Обновленный список событий:", events);
        setEvents(events);
      })
      .catch((error) => console.error('Ошибка при создании события:', error));
  };


const onDeleteEvent = (id) => {
  deleteEvent(id).then(()=>setEvents(events.filter(event => event.id !== id)))
};

  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

  return (
    <>
      <Header
        onPrevWeek={handlePrevWeek}
        onNextWeek={handleNextWeek}
        onToday={handleToday}
        weekDates={weekDates}
        onAddEvent={handleAddEvent}
      />
      <Calendar
        weekDates={weekDates}
        events={events}
        onDeleteEvent={onDeleteEvent}
      />
    </>
  );
};

export default App;




