import { useEffect, useState } from 'react';
import { FaRegClock } from 'react-icons/fa6';
import { format, startOfToday } from 'date-fns';

import useEventModal from '@hooks/useEventModal';
import { getWeekDays, hours } from '@utils/weekDays';

import EventModal from '../EventModal';
import TimeSlots from '../TimeSlots';
import styles from './index.module.scss';

interface ICalendarBodyProps {
  viewMode: 'week' | 'day';
}

const CalendarBody: React.FC<ICalendarBodyProps> = ({ viewMode }) => {
  const [today, setToday] = useState(startOfToday());
  const [weekDays, setWeekDays] = useState(getWeekDays());
  const eventModal = useEventModal();

  useEffect(() => {
    const interval = setInterval(() => {
      const newToday = startOfToday();
      if (newToday.getTime() !== today.getTime()) {
        setToday(newToday);
        setWeekDays(getWeekDays());
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [today]);

  return (
    <div>
      <div className={styles['calendar-body']}>
        <div className={styles['hours-column']}>
          <div className={styles['hour-cell']}>
            <FaRegClock size={20} />
          </div>
          {hours.map((hour: string) => (
            <div key={hour} className={styles['hour-cell']}>
              {hour}
            </div>
          ))}
        </div>
        {viewMode === 'week' ? (
          <div className={styles['week-view']}>
            {weekDays.map((day: Date) => (
              <div key={day.toString()} className={styles['day-column']}>
                <div className={styles['day-header']}>
                  {format(day, 'EEEE')} {format(day, 'dd')}
                </div>
                <TimeSlots day={day} hours={hours} eventModal={eventModal} viewMode={viewMode} />
              </div>
            ))}
          </div>
        ) : (
          <div className={styles['day-view']}>
            <div className={styles['day-column']}>
              <div className={styles['day-header']}>
                {format(today, 'EEEE')} {format(today, 'dd')}
              </div>
              <TimeSlots day={today} hours={hours} eventModal={eventModal} viewMode={viewMode} />
            </div>
          </div>
        )}
      </div>
      <EventModal eventModal={eventModal} />
    </div>
  );
};

export default CalendarBody;
