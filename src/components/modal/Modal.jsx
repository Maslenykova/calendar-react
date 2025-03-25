import React, { Component } from 'react';
import './modal.scss';


class Modal extends Component {
  state = {
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    description: '',
  };
  isMountedComponent = false; 

  componentDidMount() {
    this.isMountedComponent = true; 
    const now = new Date();
    const currentDate = now.toISOString().split('T')[0]; 
    const currentTime = now.toTimeString().slice(0, 5); 

    this.setState({
      date: currentDate,
      startTime: currentTime,
      endTime: this.getDefaultEndTime(currentTime),
    });
  }
  
  componentWillUnmount() {
    this.isMountedComponent = false;
  }

  getDefaultEndTime = (startTime) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const endTime = new Date();
    endTime.setHours(hours + 1, minutes); 
    return endTime.toTimeString().slice(0, 5);
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };



  handleSubmit = (event) => {
    event.preventDefault();
    const { title, date, startTime, endTime, description } = this.state;
  
    if (!title || !date || !startTime || !endTime) {
      alert('Title, Date, Start Time, and End Time are required!');
      return;
    }
  
    const newEvent = {
      title,
      date,
      startTime,
      endTime,
      description,
    };
  
    this.props.onSubmit(newEvent); 
  
    this.setState({
      title: '',
      date: new Date().toISOString().split('T')[0],
      startTime: new Date().toTimeString().slice(0, 5),
      endTime: this.getDefaultEndTime(new Date().toTimeString().slice(0, 5)),
      description: '',
    });
  
    this.props.onClose();
  };


  render() {
  
    return (
      <div className="modal overlay">
        <div className="modal__content">
          <div className="create-event">
            <button className="create-event__close-btn" onClick={this.props.onClose}>
              +
            </button>
            <form className="event-form" onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Title"
                className="event-form__field"
                value={this.state.title}
                onChange={this.handleChange}
              />
              <div className="event-form__time">
                <input
                  type="date"
                  name="date"
                  className="event-form__field"
                  value={this.state.date}
                  onChange={this.handleChange}
                />
                <input
                  type="time"
                  name="startTime"
                  className="event-form__field"
                  value={this.state.startTime}
                  onChange={this.handleChange}
                />
                <span>-</span>
                <input
                  type="time"
                  name="endTime"
                  className="event-form__field"
                  value={this.state.endTime}
                  onChange={this.handleChange}
                />
              </div>
              <textarea
                name="description"
                placeholder="Description"
                className="event-form__field"
                value={this.state.description}
                onChange={this.handleChange}
              ></textarea>
              <button type="submit" className="event-form__submit-btn">
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}


export default Modal;