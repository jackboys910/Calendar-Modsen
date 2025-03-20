export const validateEventTitle = (title: string): string | null => {
  if (!title) return 'Title is required';
  if (title.length > 20) return 'Title must be less than 20 characters';
  return null;
};

export const validateEventPlace = (place: string): string | null => {
  if (!place) return 'Place is required';
  if (place.length > 20) return 'Place must be less than 20 characters';
  return null;
};

export const validateEventDate = (date: string): string | null => {
  const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
  if (!date) return 'Date is required';
  if (!dateRegex.test(date)) return 'Invalid date format';
  return null;
};

export const validateEventTime = (time: string): string | null => {
  const timeRegex = /^\d{2}:\d{2}-\d{2}:\d{2}$/;
  if (!time) return 'Time is required';
  if (!timeRegex.test(time)) return 'Invalid time format';
  return null;
};

export const validateDescription = (description: string | undefined): string | null => {
  if (description === undefined || description.trim() === '') return null;
  if (description.length > 20) return 'Description must be less than 20 characters';
  return null;
};
