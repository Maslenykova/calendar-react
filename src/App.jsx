import React, { useState, useEffect} from 'react';
import Header from './components/header/Header';
import Calendar from './components/calendar/Calendar';
import { fetchEvents } from './gateway/eventGeteway.jsx';
import { generateWeekRange, getWeekStartDate } from './utils/dateUtils';

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  const loadEvents = () => {
    fetchEvents().then(eventsFromServer => {
      const validEvents = eventsFromServer
        .map(event => ({
          ...event,
          dateFrom: new Date(event.dateFrom),
          dateTo: new Date(event.dateTo),
        }))
        .filter(event => !isNaN(event.dateFrom) && !isNaN(event.dateTo));

      setEvents(validEvents);
    });
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <>
      <Header
          weekDates={generateWeekRange(getWeekStartDate(weekStartDate))}
          setWeekStartDate={setWeekStartDate}
          events={events}
          loadEvents={loadEvents}
      />
      <Calendar
        weekDates={generateWeekRange(getWeekStartDate(weekStartDate))}
        events={events}
        setEvents={setEvents}
      />
    </>
  );
};

export default App;




