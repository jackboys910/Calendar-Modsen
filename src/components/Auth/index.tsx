import { AUTH_TEXT } from '@constants/authPageText';

import Registration from '../Registration';
import styles from './index.module.scss';

const Auth: React.FC = () => {
  return (
    <div>
      <div className={styles.auth}>
        <h2 className={styles['auth-description']}>{AUTH_TEXT.REGISTATION_TITLE}</h2>
        <p className={styles['auth-link-description']}>
          {AUTH_TEXT.REGISTATION_TEXT}
          <span className={styles['auth-link']}>{AUTH_TEXT.LOGIN_TITLE}</span>
        </p>
      </div>
      <Registration />
    </div>
  );
};

export default Auth;
