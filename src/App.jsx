import React, { Component } from 'react';
import Header from './components/header/Header';
import Calendar from './components/calendar/Calendar';
import { generateWeekRange, getWeekStartDate} from './utils/dateUtils';


class App extends Component {
  state = {
    weekStartDate: new Date(),
  };

  handlePrevWeek = () => {
    this.setState((prevState) => ({
      weekStartDate: new Date(prevState.weekStartDate.setDate(prevState.weekStartDate.getDate() - 7)),
      
    }));
  };

  handleNextWeek = () => {
    this.setState((prevState) => ({
      weekStartDate: new Date(prevState.weekStartDate.setDate(prevState.weekStartDate.getDate() + 7)),
    }));
  };

  handleToday = () => {
    this.setState({
      weekStartDate: new Date(),
    });
  };


  render() {
   
    const { weekStartDate } = this.state;
    const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

    return (
      <>
        <Header
          onPrevWeek={this.handlePrevWeek}
          onNextWeek={this.handleNextWeek}
          onToday={this.handleToday}
          weekDates={weekDates}
        />
        <Calendar  weekDates={weekDates} />
      </>
    );
  }
}

export default App;