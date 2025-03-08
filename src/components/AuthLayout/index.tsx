import { AUTH_LAYOUT_TEXT, BRAND_NAME } from '@constants/authPageText';

import styles from './index.module.scss';

const AuthLayout: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles['brand-title']}>{BRAND_NAME}</h1>
      <div className={styles.auth}>
        <h2 className={styles['auth-description']}>{AUTH_LAYOUT_TEXT.LAYOUT_REGISTATION_TITLE}</h2>
        <p className={styles['auth-link-description']}>
          {AUTH_LAYOUT_TEXT.LAYOUT_REGISTATION_TEXT}
          <span className={styles['auth-link']}>{AUTH_LAYOUT_TEXT.LAYOUT_LOGIN_TITLE}</span>
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
