import React, { useState} from 'react';
import './modal.scss';

const Modal = ({ onClose, onSubmit }) => {
  const now = new Date();
  const getToday = () => now.toISOString().split('T')[0];
  const getCurrentTime = () => now.toTimeString().slice(0, 5);

  const getDefaultEndTime = (startTime) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const end = new Date();
    end.setHours(hours + 1, minutes);
    return end.toTimeString().slice(0, 5);
  };

  const [formData, setFormData] = useState({
    title: '',
    date: getToday(),
    startTime: getCurrentTime(),
    endTime: getDefaultEndTime(getCurrentTime()),
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, date, startTime, endTime, description } = formData;

    if (!title || !date || !startTime || !endTime) {
      alert('Title, Date, Start Time, and End Time are required!');
      return;
    }

    onSubmit({ title, date, startTime, endTime, description });

    setFormData({
      title: '',
      date: getToday(),
      startTime: getCurrentTime(),
      endTime: getDefaultEndTime(getCurrentTime()),
      description: '',
    });

    onClose();
  };

  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <button className="create-event__close-btn" onClick={onClose}>
            +
          </button>
          <form className="event-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="event-form__field"
              value={formData.title}
              onChange={handleChange}
            />
            <div className="event-form__time">
              <input
                type="date"
                name="date"
                className="event-form__field"
                value={formData.date}
                onChange={handleChange}
              />
              <input
                type="time"
                name="startTime"
                className="event-form__field"
                value={formData.startTime}
                onChange={handleChange}
              />
              <span>-</span>
              <input
                type="time"
                name="endTime"
                className="event-form__field"
                value={formData.endTime}
                onChange={handleChange}
              />
            </div>
            <textarea
              name="description"
              placeholder="Description"
              className="event-form__field"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
            <button type="submit" className="event-form__submit-btn">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;

