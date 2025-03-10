import { BRAND_NAME } from '@constants/authPageText';

import Auth from '../Auth';
import styles from './index.module.scss';

const AuthLayout: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles['brand-title']}>{BRAND_NAME}</h1>
      <Auth />
    </div>
  );
};

export default AuthLayout;
