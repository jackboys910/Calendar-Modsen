import { useAuthForm } from '@hooks/useAuthForm';
import { AUTH_TEXT } from '@constants/authPageText';

import InputField from '../InputField';
import styles from './index.module.scss';

const Login: React.FC = () => {
  const { formData, errors, handleChange, handleSubmit, togglePasswordVisibility, showPassword, isFormValid } = useAuthForm();

  const handlePasswordVisibilityToggle = () => togglePasswordVisibility('password');

  return (
    <form className={styles['registration-form']} onSubmit={handleSubmit}>
      <InputField label='Email' name='email' type='email' value={formData.email} onChange={handleChange} error={errors.email} />
      <InputField
        label='Password'
        name='password'
        type={showPassword ? 'text' : 'password'}
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        onToggleVisibility={handlePasswordVisibilityToggle}
        showToggle={true}
        isVisible={showPassword}
      />
      <button
        className={`${styles['registration-button']} ${isFormValid ? styles['registration-button-active'] : styles['registration-button-disabled']}`}
        type='submit'
        disabled={!isFormValid}
      >
        {AUTH_TEXT.LOGIN_TITLE}
      </button>
    </form>
  );
};

export default Login;
