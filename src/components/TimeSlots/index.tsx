import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';

import { IEvent } from '../../interfaces/IEvent';
import { RootState } from '../../store/store';
import Event from '../Event';
import styles from './index.module.scss';

interface ITimeSlotsProps {
  day: Date;
  hours: string[];
  eventModal: ReturnType<typeof import('../../hooks/useEventModal').default>;
  viewMode: 'week' | 'day';
}

const TimeSlots: React.FC<ITimeSlotsProps> = ({ day, hours, eventModal, viewMode }) => {
  const events = useSelector((state: RootState) => state.events);
  const { handleEventModalOpen } = eventModal;

  const { formattedDay, eventsForDay } = useMemo(() => {
    const formattedDay = format(day, 'dd.MM.yyyy');
    const eventsForDay = events.filter((event) => event.date === formattedDay);
    return { formattedDay, eventsForDay };
  }, [day, events]);

  const handleTimeSlotClick = (formattedDay: string, hour: string) => {
    handleEventModalOpen({ date: formattedDay, time: hour });
  };

  const handleEventClick = (e: React.MouseEvent, matchingEvent: IEvent) => {
    e.stopPropagation();
    handleEventModalOpen(matchingEvent);
  };

  return (
    <div className={`${styles['container']} ${viewMode === 'week' ? styles['week-view'] : styles['day-view']}`}>
      {hours.map((hour) => {
        const matchingEvent = eventsForDay.find((event) => {
          const [eventStartHour] = event.time.split('-');
          return eventStartHour === hour;
        });

        if (matchingEvent) {
          const [eventStartHour, eventEndHour] = matchingEvent.time.split('-');
          const eventDurationInSlots = parseInt(eventEndHour.split(':')[0], 10) - parseInt(eventStartHour.split(':')[0], 10);

          return (
            <div
              key={`${formattedDay}-${hour}`}
              className={`${styles['time-slot']} ${styles['event-slot']}`}
              style={{
                height: `${eventDurationInSlots * 70}px`,
              }}
            >
              <Event
                id={matchingEvent.id!}
                title={matchingEvent.title}
                time={matchingEvent.time}
                description={matchingEvent.description}
                onClick={(e) => handleEventClick(e, matchingEvent)}
              />
            </div>
          );
        }

        return (
          <div
            key={`${formattedDay}-${hour}`}
            className={styles['time-slot']}
            onClick={() => handleTimeSlotClick(formattedDay, hour)}
          ></div>
        );
      })}
    </div>
  );
};

export default TimeSlots;
