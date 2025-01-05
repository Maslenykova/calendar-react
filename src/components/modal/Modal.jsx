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
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.state.title || !this.state.date) {
      alert('Title and Date are required!');
      return;
    }
    this.props.onSubmit(this.state);
    this.setState({
      title: '',
      date: '',
      startTime: '',
      endTime: '',
      description: '',
    });
    this.props.onClose();
  };

  render() {
    return (
      <div className="modal overlay">
        <div className="modal__content">
          <div className="create-event">
            <button className="create-event__close-btn"  onClick={this.props.onClose} >+</button>
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
                <input type="date" name="date" className="event-form__field"  value={this.state.date}
                  onChange={this.handleChange} />
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