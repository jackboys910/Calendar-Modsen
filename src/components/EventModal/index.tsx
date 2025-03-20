import { useDispatch } from 'react-redux';

import { EVENT_MODAL_TEXT } from '@constants/calendarText';
import { addEvent, updateEvent } from '@store/slices/eventSlice';

import { IEvent } from '../../interfaces/IEvent';
import styles from './index.module.scss';

interface IEventModalProps {
  eventModal: ReturnType<typeof import('../../hooks/useEventModal').default>;
}

const EventModal: React.FC<IEventModalProps> = ({ eventModal }) => {
  const dispatch = useDispatch();

  const { isModalOpen, formData, errors, handleInputChange, handleEventModalClose, handleEventSave } = eventModal;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleInputChange(name, value);
  };

  const handleSave = () => {
    handleEventSave(formData, (event: IEvent) => {
      if (event.id) {
        dispatch(updateEvent(event));
      } else {
        dispatch(addEvent({ ...event, id: Date.now() }));
      }
    });
  };

  const preventModalClose = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (!isModalOpen) return null;

  return (
    <div className={styles['modal']} onClick={handleEventModalClose}>
      <div className={styles['modal-content']} onClick={preventModalClose}>
        <h2>{formData.id ? 'Edit Event' : 'Create Event'}</h2>
        <form>
          <input type='text' name='title' placeholder='Title' value={formData.title} onChange={handleChange} />
          {errors.title && <span className={styles['input-error']}>{errors.title}</span>}
          <input type='text' name='place' placeholder='Place' value={formData.place} onChange={handleChange} />
          {errors.place && <span className={styles['input-error']}>{errors.place}</span>}
          <input type='text' name='date' placeholder='Date (DD.MM.YYYY)' value={formData.date} onChange={handleChange} />
          {errors.date && <span className={styles['input-error']}>{errors.date}</span>}
          <input type='text' name='time' placeholder='Time (HH:MM-HH:MM)' value={formData.time} onChange={handleChange} />
          {errors.time && <span className={styles['input-error']}>{errors.time}</span>}
          <input type='text' name='description' placeholder='Add Notes' value={formData.description} onChange={handleChange} />
          {errors.description && <span className={styles['input-error']}>{errors.description}</span>}
          <button type='button' onClick={handleSave}>
            {EVENT_MODAL_TEXT.SAVE_TEXT}
          </button>
          <button type='button' onClick={handleEventModalClose}>
            {EVENT_MODAL_TEXT.CLOSE_TEXT}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
