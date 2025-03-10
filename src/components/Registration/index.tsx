import { useDispatch } from 'react-redux';

import { useRegistrationForm } from '@hooks/useRegistrationForm';
import { AUTH_TEXT } from '@constants/authPageText';

import InputField from '../InputField';
import styles from './index.module.scss';

const Registration: React.FC = () => {
  const { formData, errors, handleChange, handleSubmit, togglePasswordVisibility, showPassword, showConfirmPassword, isFormValid } =
    useRegistrationForm(useDispatch());

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
        onToggleVisibility={() => togglePasswordVisibility('password')}
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
        onToggleVisibility={() => togglePasswordVisibility('confirmPassword')}
        showToggle={true}
        isVisible={showConfirmPassword}
      />
      <button
        className={`${styles['registration-button']} ${isFormValid ? styles['registration-button-active'] : styles['registration-button-disabled']}`}
        type='submit'
      >
        {AUTH_TEXT.REGISTRATION_BUTTON}
      </button>
    </form>
  );
};

export default Registration;
