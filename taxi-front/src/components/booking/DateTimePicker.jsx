import { useEffect } from 'react';
import '../../styles/components/DateTimePicker.css';

const DateTimePicker = ({ 
  dateId, 
  timeId, 
  dateValue, 
  timeValue, 
  onDateChange, 
  onTimeChange,
  dateLabel,
  timeLabel,
  dateError,
  timeError 
}) => {
  useEffect(() => {
    // Set default date to tomorrow if not set
    if (!dateValue) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const formattedDate = formatDate(tomorrow);
      onDateChange(formattedDate);
    }
    
    // Set default time to current time + 1 hour if not set
    if (!timeValue) {
      const defaultTime = new Date();
      defaultTime.setHours(defaultTime.getHours() + 2);
      const formattedTime = formatTime(defaultTime);
      onTimeChange(formattedTime);
    }
  }, [dateValue, timeValue, onDateChange, onTimeChange]);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // Get minimum date (today)
  const today = new Date();
  const minDate = formatDate(today);
  
  // Get minimum time (current time if date is today)
  const isToday = dateValue === minDate;
  const now = new Date();
  const minTime = isToday ? formatTime(now) : '00:00';

  return (
    <div className="datetime-picker-container">
      <div className="datetime-picker">
        <div className="date-input-container">
          {dateLabel && <label htmlFor={dateId}>{dateLabel}</label>}
          <input
            type="date"
            id={dateId}
            value={dateValue || ''}
            min={minDate}
            onChange={(e) => onDateChange(e.target.value)}
            className={dateError ? 'error' : ''}
            required
          />
          {dateError && <div className="input-error">{dateError}</div>}
        </div>
        
        <div className="time-input-container">
          {timeLabel && <label htmlFor={timeId}>{timeLabel}</label>}
          <input
            type="time"
            id={timeId}
            value={timeValue || ''}
            min={isToday ? minTime : undefined}
            onChange={(e) => onTimeChange(e.target.value)}
            className={timeError ? 'error' : ''}
            required
          />
          {timeError && <div className="input-error">{timeError}</div>}
        </div>
      </div>
    </div>
  );
};

export default DateTimePicker;