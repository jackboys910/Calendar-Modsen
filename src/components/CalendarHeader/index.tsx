import { useCallback } from 'react';

import { CALENDAR_HEADER_TEXT } from '@constants/calendarText';

import styles from './index.module.scss';

interface ICalendarHeaderProps {
  viewMode: 'week' | 'day';
  setViewMode: (mode: 'week' | 'day') => void;
}

const CalendarHeader: React.FC<ICalendarHeaderProps> = ({ viewMode, setViewMode }) => {
  const handleWeekClick = useCallback(() => {
    setViewMode('week');
  }, [setViewMode]);

  const handleDayClick = useCallback(() => {
    setViewMode('day');
  }, [setViewMode]);

  return (
    <div className={styles['calendar-header']}>
      <div className={styles['switch']}>
        <button onClick={handleWeekClick} className={`${styles['switch-button']} ${viewMode === 'week' ? styles['switch-active'] : ''}`}>
          {CALENDAR_HEADER_TEXT.WEEK_TEXT}
        </button>
        <button onClick={handleDayClick} className={`${styles['switch-button']} ${viewMode === 'day' ? styles['switch-active'] : ''}`}>
          {CALENDAR_HEADER_TEXT.DAY_TEXT}
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;
