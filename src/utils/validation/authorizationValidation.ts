export const validateName = (name: string): string | null => {
  const nameRegex = /^[A-Za-z]{2,50}$/;
  if (!name) return 'Name is required';
  if (!nameRegex.test(name)) return 'Name must be 2-50 characters long and consist only of Latin letters';
  return null;
};

export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'Email is required';
  if (!emailRegex.test(email)) return 'Invalid email format';
  return null;
};

export const validatePassword = (password: string): string | null => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\p{P}\p{S}])(?!.*\s).{8,}$/u;
  if (!password) return 'Password is required';
  if (!passwordRegex.test(password)) return 'At least 8 characters long, uppercase letter, lowercase letter, digit, special character';
  return null;
};

export const validateConfirmPassword = (password: string, confirmPassword: string): string | null => {
  if (!confirmPassword) return 'Confirm Password is required';
  if (password !== confirmPassword) return 'Passwords do not match';
  return null;
};
