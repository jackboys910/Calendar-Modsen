import { useState } from 'react';

import CalendarBody from '../CalendarBody';
import CalendarHeader from '../CalendarHeader';
import styles from './index.module.scss';

const CalendarLayout: React.FC = () => {
  const [viewMode, setViewMode] = useState<'week' | 'day'>('week');

  return (
    <div className={styles.container}>
      <CalendarHeader viewMode={viewMode} setViewMode={setViewMode} />
      <CalendarBody viewMode={viewMode} />
    </div>
  );
};

export default CalendarLayout;
