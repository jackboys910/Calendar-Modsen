import calendarIcon from '@assets/icons/calendarIcon.svg';
import defaultUserWithBorderImage from '@assets/images/defaultUserWithBorder.png';
import { BRAND_NAME } from '@constants/authPageText';
import { PROFILE_TEXT } from '@constants/profileText';

import Footer from '../Footer';
import LogoutButton from '../LogoutButton';
import styles from './index.module.scss';

const Profile: React.FC = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

  return (
    <section className={styles.container}>
      <header className={styles['brand-title']}>{BRAND_NAME}</header>
      <div className={styles.greeting}>
        <img className={styles['greeting-image']} src={defaultUserWithBorderImage} alt='Default User' />
        <h2 className={styles['greeting-name']}>{`${PROFILE_TEXT.USER_GREETING} ${currentUser.firstName || 'User'}`}</h2>
        <p className={styles['greeting-email']}>{currentUser.email}</p>
      </div>
      <button className={styles['calendar-button']}>
        <img className={styles['calendar-button-icon']} src={calendarIcon} alt='Icon' />
        <div className={styles['calendar-button-dot']}></div>
        <span className={styles['calendar-button-text']}>{PROFILE_TEXT.CALENDAR_BUTTON}</span>
      </button>
      <LogoutButton />
      <div className={styles['footer-container']}>
        <Footer />
      </div>
    </section>
  );
};

export default Profile;
