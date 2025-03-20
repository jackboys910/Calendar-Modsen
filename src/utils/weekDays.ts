import { addDays, startOfWeek } from 'date-fns';

export const getWeekDays = () => {
  const start = startOfWeek(new Date(), { weekStartsOn: 1 });
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
};

export const hours = Array.from({ length: 12 }, (_, i) => `${9 + i}:00`);
