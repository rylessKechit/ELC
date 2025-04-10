import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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
  const [dateFocused, setDateFocused] = useState(false);
  const [timeFocused, setTimeFocused] = useState(false);

  useEffect(() => {
    // Set default date to tomorrow if not set
    if (!dateValue) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const formattedDate = formatDate(tomorrow);
      onDateChange(formattedDate);
    }
    
    // Set default time to current time + 2 hours if not set
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
    <motion.div 
      className="datetime-picker-container"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="datetime-picker">
        <motion.div 
          className={`date-input-container ${dateFocused ? 'focused' : ''}`}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          {dateLabel && (
            <motion.label 
              htmlFor={dateId}
              animate={{ 
                color: dateFocused ? 'var(--primary-color)' : 'var(--primary-light)' 
              }}
              transition={{ duration: 0.3 }}
            >
              {dateLabel}
            </motion.label>
          )}
          <motion.input
            type="date"
            id={dateId}
            value={dateValue || ''}
            min={minDate}
            onChange={(e) => onDateChange(e.target.value)}
            onFocus={() => setDateFocused(true)}
            onBlur={() => setDateFocused(false)}
            className={dateError ? 'error' : ''}
            whileFocus={{ boxShadow: '0 0 15px rgba(212, 175, 55, 0.3)' }}
            required
          />
          {dateError && (
            <motion.div 
              className="input-error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {dateError}
            </motion.div>
          )}
        </motion.div>
        
        <motion.div 
          className={`time-input-container ${timeFocused ? 'focused' : ''}`}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          {timeLabel && (
            <motion.label 
              htmlFor={timeId}
              animate={{ 
                color: timeFocused ? 'var(--primary-color)' : 'var(--primary-light)' 
              }}
              transition={{ duration: 0.3 }}
            >
              {timeLabel}
            </motion.label>
          )}
          <motion.input
            type="time"
            id={timeId}
            value={timeValue || ''}
            min={isToday ? minTime : undefined}
            onChange={(e) => onTimeChange(e.target.value)}
            onFocus={() => setTimeFocused(true)}
            onBlur={() => setTimeFocused(false)}
            className={timeError ? 'error' : ''}
            whileFocus={{ boxShadow: '0 0 15px rgba(212, 175, 55, 0.3)' }}
            required
          />
          {timeError && (
            <motion.div 
              className="input-error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {timeError}
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DateTimePicker;