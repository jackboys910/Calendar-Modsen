import styles from './index.module.scss';

interface IEventProps {
  id: number;
  title: string;
  time: string;
  description?: string;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Event: React.FC<IEventProps> = ({ title, time, description, onClick }) => {
  return (
    <div className={styles.event} onClick={onClick}>
      <span className={styles['event-time']}>{time}</span>
      <span className={styles['event-title']}>{title}</span>
      {description && <p>{description}</p>}
    </div>
  );
};

export default Event;
