import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';

import { db } from '@utils/firebase';

import { IEvent } from '../../interfaces/IEvent';
import { AppDispatch } from '../store';

const initialState: IEvent[] = JSON.parse(localStorage.getItem('events') || '[]');

const saveToFirebase = async (event: IEvent) => {
  if (!event.id) {
    throw new Error('Event ID is missing');
  }
  const eventRef = doc(db, 'events', event.id.toString());
  await setDoc(eventRef, event);
};

const fetchFromFirebase = async () => {
  const querySnapshot = await getDocs(collection(db, 'events'));
  return querySnapshot.docs.map((doc) => doc.data() as IEvent);
};

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<IEvent>) => {
      state.push(action.payload);
      localStorage.setItem('events', JSON.stringify(state));
      saveToFirebase(action.payload);
    },
    setEvents: (state, action: PayloadAction<IEvent[]>) => {
      return action.payload;
    },
    updateEvent: (state, action: PayloadAction<IEvent>) => {
      const index = state.findIndex((event) => event.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
        localStorage.setItem('events', JSON.stringify(state));
        saveToFirebase(action.payload);
      }
    },
  },
});

export const fetchEvents = () => async (dispatch: AppDispatch) => {
  const events = await fetchFromFirebase();
  localStorage.setItem('events', JSON.stringify(events));
  dispatch(setEvents(events));
};

export const { addEvent, setEvents, updateEvent } = eventSlice.actions;
export default eventSlice.reducer;
