import { useCallback, useState } from 'react';

import { IEvent } from '../interfaces/IEvent';
import {
  validateDescription,
  validateEventDate,
  validateEventPlace,
  validateEventTime,
  validateEventTitle,
} from '../utils/validation/eventModalValidation';

interface IEventModalState {
  isModalOpen: boolean;
  initialEventData: IEvent | null;
}

const useEventModal = () => {
  const [state, setState] = useState<IEventModalState>({
    isModalOpen: false,
    initialEventData: null,
  });

  const [formData, setFormData] = useState<IEvent>({
    title: '',
    place: '',
    date: '',
    time: '',
    description: '',
  });

  const [errors, setErrors] = useState({
    title: '',
    place: '',
    date: '',
    time: '',
    description: '',
  });

  const validate = useCallback((data: IEvent) => {
    const newErrors = {
      title: validateEventTitle(data.title) || '',
      place: validateEventPlace(data.place) || '',
      date: validateEventDate(data.date) || '',
      time: validateEventTime(data.time) || '',
      description: validateDescription(data.description) || '',
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== '');
  }, []);

  const handleEventModalOpen = useCallback(
    (data: Partial<IEvent> = {}) => {
      setState({
        isModalOpen: true,
        initialEventData: { id: data.id || undefined, ...data } as IEvent,
      });
      setFormData({ ...formData, description: data.description || '', ...data });
    },
    [formData]
  );

  const handleEventModalClose = useCallback(() => {
    setState({ isModalOpen: false, initialEventData: null });
    setErrors({ title: '', place: '', date: '', time: '', description: '' });
    setFormData({ title: '', place: '', date: '', time: '', description: '' });
  }, []);

  const handleInputChange = useCallback((name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleEventSave = useCallback(
    (data: IEvent, saveCallback: (event: IEvent) => void) => {
      if (validate(data)) {
        saveCallback(data);
        handleEventModalClose();
      }
    },
    [validate, handleEventModalClose]
  );

  return {
    isModalOpen: state.isModalOpen,
    initialEventData: state.initialEventData,
    formData,
    errors,
    handleInputChange,
    handleEventModalOpen,
    handleEventModalClose,
    handleEventSave,
    validate,
  };
};

export default useEventModal;
