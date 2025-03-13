import { FaFacebookF } from 'react-icons/fa';

import githubIcon from '@assets/icons/githubIcon.svg';
import instagramIcon from '@assets/icons/instagramIcon.svg';
import modsenLogo from '@assets/icons/modsenLogo.svg';
import twitterIcon from '@assets/icons/twitterIcon.svg';
import { PROFILE_TEXT } from '@constants/profileText';

import styles from './index.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.title}>
        <img src={modsenLogo} alt='Modsen Logo' />
        <p className={styles['title-text']}>{PROFILE_TEXT.FOOTER_DESCRIPTION}</p>
      </div>
      <div className={styles.socials}>
        <a className={styles['socials-link']} href='https://twitter.com' target='_blank' rel='noopener noreferrer'>
          <img src={twitterIcon} alt='Twitter' />
        </a>
        <a className={styles['socials-link']} href='https://facebook.com' target='_blank' rel='noopener noreferrer'>
          <FaFacebookF size={12}></FaFacebookF>
        </a>
        <a className={styles['socials-link']} href='https://instagram.com' target='_blank' rel='noopener noreferrer'>
          <img src={instagramIcon} alt='Instagram' />
        </a>
        <a className={styles['socials-link']} href='https://github.com' target='_blank' rel='noopener noreferrer'>
          <img src={githubIcon} alt='Github' />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
