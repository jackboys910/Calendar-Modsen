import { useDispatch } from 'react-redux';

import { useAuthForm } from '@hooks/useAuthForm';
import { AUTH_TEXT } from '@constants/authPageText';

import InputField from '../InputField';
import Loader from '../Loader';
import styles from './index.module.scss';

const Registration: React.FC = () => {
  const {
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
  } = useAuthForm(useDispatch(), true);

  const handlePasswordVisibilityToggle = () => togglePasswordVisibility('password');
  const handleConfirmPasswordVisibilityToggle = () => togglePasswordVisibility('confirmPassword');

  return (
    <form className={styles['registration-form']} onSubmit={handleSubmit}>
      <InputField
        label='First Name'
        name='firstName'
        type='text'
        value={formData.firstName}
        error={errors.firstName}
        onChange={handleChange}
      />
      <InputField label='Last Name' name='lastName' type='text' value={formData.lastName} error={errors.lastName} onChange={handleChange} />
      <InputField label='Email' name='email' type='email' value={formData.email} error={errors.email} onChange={handleChange} />
      <InputField
        label='Password'
        name='password'
        type={showPassword ? 'text' : 'password'}
        value={formData.password}
        error={errors.password}
        onChange={handleChange}
        onToggleVisibility={handlePasswordVisibilityToggle}
        showToggle={true}
        isVisible={showPassword}
      />
      <InputField
        label='Confirm Password'
        name='confirmPassword'
        type={showConfirmPassword ? 'text' : 'password'}
        value={formData.confirmPassword}
        error={errors.confirmPassword}
        onChange={handleChange}
        onToggleVisibility={handleConfirmPasswordVisibilityToggle}
        showToggle={true}
        isVisible={showConfirmPassword}
      />
      <button
        className={`${styles['registration-button']} ${isFormValid ? styles['registration-button-active'] : styles['registration-button-disabled']}`}
        type='submit'
        disabled={!isFormValid || loading}
      >
        {loading ? <Loader /> : AUTH_TEXT.REGISTRATION_BUTTON}
      </button>
      <p className={styles['success-message']} dangerouslySetInnerHTML={{ __html: successMessage }}></p>
    </form>
  );
};

export default Registration;
