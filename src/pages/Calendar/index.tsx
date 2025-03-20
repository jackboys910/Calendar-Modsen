import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import CalendarLayout from '@components/CalendarLayout';
import Profile from '@components/Profile';
import { fetchEvents } from '@store/slices/eventSlice';

import styles from './index.module.scss';

const Calendar: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  return (
    <main className={styles.container}>
      <Profile />
      <CalendarLayout />
    </main>
  );
};

export default Calendar;
