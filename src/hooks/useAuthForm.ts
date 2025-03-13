import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import { auth, db } from '@utils/firebase';
import { validateConfirmPassword, validateEmail, validateName, validatePassword } from '@utils/validation/authorizationValidation';

import { addUser } from '../store/slices/userSlice';
import { AppDispatch } from '../store/store';

interface IFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

interface IErrors {
  firstName?: string | null;
  lastName?: string | null;
  email: string | null;
  password: string | null;
  confirmPassword?: string | null;
}

export const useAuthForm = (dispatch?: AppDispatch, isRegistration: boolean = false) => {
  const navigate = useNavigate();
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

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    let error: string | null = null;
    if (name === 'firstName' && isRegistration) error = validateName(value);
    if (name === 'lastName' && isRegistration) error = validateName(value);
    if (name === 'email') error = validateEmail(value);
    if (name === 'password') error = validatePassword(value);
    if (name === 'confirmPassword' && isRegistration) error = validateConfirmPassword(formData.password, value);

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const togglePasswordVisibility = (field: 'password' | 'confirmPassword'): void => {
    if (field === 'password') setShowPassword(!showPassword);
    if (field === 'confirmPassword') setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    const { firstName, lastName, email, password, confirmPassword } = formData;

    const newErrors: IErrors = {
      firstName: isRegistration ? validateName(firstName) : null,
      lastName: isRegistration ? validateName(lastName) : null,
      email: validateEmail(email),
      password: validatePassword(password),
      confirmPassword: isRegistration ? validateConfirmPassword(password, confirmPassword || '') : null,
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error !== null);
    if (hasErrors) {
      setLoading(false);
      return;
    }

    try {
      if (isRegistration) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const userData = {
          id: user.uid,
          email,
          firstName,
          lastName,
        };

        await setDoc(doc(db, 'users', user.uid), userData);

        if (dispatch) {
          dispatch(addUser(userData));
        }

        localStorage.setItem('currentUser', JSON.stringify(userData));
        setSuccessMessage('Registration Successful!<br />Redirecting to calendar page...');
        setTimeout(() => {
          navigate('/calendar');
        }, 1500);
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.exists() ? userDoc.data() : {};

        localStorage.setItem(
          'currentUser',
          JSON.stringify({
            id: user.uid,
            email,
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
          })
        );

        setSuccessMessage('Login Successful!<br />Redirecting to calendar page...');
        setTimeout(() => {
          navigate('/calendar');
        }, 1500);
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: error.code === 'auth/email-already-in-use' ? 'This email is already registered' : null,
          password: error.code === 'auth/wrong-password' ? 'Invalid email or password' : null,
        }));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const requiredFields: (keyof IFormData)[] = isRegistration
      ? ['firstName', 'lastName', 'email', 'password', 'confirmPassword']
      : ['email', 'password'];

    const noErrors = Object.values(errors).every((error) => error === null);
    const allFieldsFilled = requiredFields.every((field) => formData[field] !== '');

    setIsFormValid(noErrors && allFieldsFilled);
  }, [errors, formData, isRegistration]);

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    togglePasswordVisibility,
    showPassword,
    showConfirmPassword,
    isFormValid,
    loading,
    successMessage,
  };
};
