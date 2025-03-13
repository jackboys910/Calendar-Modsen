import React from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import styles from './index.module.scss';

interface IInputFieldProps {
  label: string;
  name: string;
  type: string;
  value: string;
  error?: string | null;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleVisibility?: () => void;
  showToggle?: boolean;
  isVisible?: boolean;
}

const InputField: React.FC<IInputFieldProps> = ({
  label,
  name,
  type,
  value,
  error,
  onChange,
  onToggleVisibility,
  showToggle,
  isVisible,
}) => {
  return (
    <div className={styles['registration-group']}>
      <label className={styles['registration-group-label']}>{label}</label>
      <input
        className={`${styles['registration-group-input']} ${error ? styles['registration-group-input-error'] : ''}`}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
      />
      {showToggle && (
        <button type='button' className={styles['registration-group-toggle']} onClick={onToggleVisibility}>
          {isVisible ? (
            <AiOutlineEyeInvisible className={styles['registration-group-icon']} />
          ) : (
            <AiOutlineEye className={styles['registration-group-icon']} />
          )}
        </button>
      )}
      {error && <p className={styles['error-text']}>{error}</p>}
    </div>
  );
};

export default InputField;
