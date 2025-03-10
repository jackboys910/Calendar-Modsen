import { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import { auth, db } from '@utils/firebase';
import { validateConfirmPassword, validateEmail, validateName, validatePassword } from '@utils/validation/authorizationValidation';

import { addUser } from '../store/slices/userSlice';
import { AppDispatch } from '../store/store';

interface IFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface IErrors {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  password: string | null;
  confirmPassword: string | null;
}

export const useRegistrationForm = (dispatch: AppDispatch) => {
  const [formData, setFormData] = useState<IFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<IErrors>({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    confirmPassword: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    let error: string | null = null;
    if (name === 'firstName' || name === 'lastName') error = validateName(value);
    if (name === 'email') error = validateEmail(value);
    if (name === 'password') error = validatePassword(value);
    if (name === 'confirmPassword') error = validateConfirmPassword(formData.password, value);

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const togglePasswordVisibility = (field: 'password' | 'confirmPassword'): void => {
    if (field === 'password') setShowPassword(!showPassword);
    if (field === 'confirmPassword') setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const { firstName, lastName, email, password } = formData;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        id: user.uid,
        email,
        firstName,
        lastName,
      });

      dispatch(
        addUser({
          id: user.uid,
          email,
          firstName,
          lastName,
        })
      );

      alert('Registration successful!');
    } catch {
      alert('Registration failed');
    }
  };

  useEffect(() => {
    const noErrors = Object.values(errors).every((error) => error === null);
    const allFieldsFilled = Object.values(formData).every((value) => value !== '');
    setIsFormValid(noErrors && allFieldsFilled);
  }, [errors, formData]);

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    togglePasswordVisibility,
    showPassword,
    showConfirmPassword,
    isFormValid,
  };
};
