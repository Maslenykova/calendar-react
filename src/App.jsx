import React, { Component } from 'react';
import Header from './components/header/Header';
import Calendar from './components/calendar/Calendar';
import { generateWeekRange, getWeekStartDate} from './utils/dateUtils';
import { createEvent, fetchEvents } from './gateway/eventGeteway';


class App extends Component {
  state = {
    weekStartDate: new Date(),
    events: [], 
  };

  handlePrevWeek = () => {
    this.setState((prevState) => ({
      weekStartDate: new Date(prevState.weekStartDate.getTime() - 7 * 24 * 60 * 60 * 1000),
    }));
  };
  
  handleNextWeek = () => {
    this.setState((prevState) => ({
      weekStartDate: new Date(prevState.weekStartDate.getTime() + 7 * 24 * 60 * 60 * 1000),
    }));
  };

  handleToday = () => {
    this.setState({ weekStartDate: new Date() });
  };

handleAddEvent = (newEvent) => {
  const { date, startTime, endTime, title } = newEvent;
  const dateFrom = new Date(`${date}T${startTime}`);
  const dateTo = new Date(`${date}T${endTime}`);

  const eventToSend = { title, dateFrom, dateTo };

  createEvent(eventToSend)
    .then(() => {
      console.log('Событие создано, загружаем обновленный список');
      this.loadEvents(); 
    })
    .catch((error) => console.error('Ошибка при создании события:', error));
};


  componentDidMount() {
    this.loadEvents();
  }
  
  loadEvents = () => {
    fetchEvents()
      .then((events) => {
        this.setState({ events });
      })
      .catch((error) => console.error('Ошибка загрузки событий:', error));
  };
  
  render() {
    const { weekStartDate, events } = this.state;
    const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));
  
    return (
      <>
        <Header
          onPrevWeek={this.handlePrevWeek}
          onNextWeek={this.handleNextWeek}
          onToday={this.handleToday}
          weekDates={weekDates}
          onAddEvent={this.handleAddEvent} 
        />
        <Calendar weekDates={weekDates} events={events} />
      </>
    );
  }
}

export default App;




