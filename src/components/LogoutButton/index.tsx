import { useNavigate } from 'react-router-dom';

import { PROFILE_TEXT } from '@constants/profileText';

import styles from './index.module.scss';

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  return (
    <button className={styles['logout-button']} onClick={handleLogout}>
      {PROFILE_TEXT.LOGOUT_BUTTON_TEXT}
    </button>
  );
};

export default LogoutButton;
