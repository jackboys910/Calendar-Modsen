import { useState } from 'react';

import { AUTH_TEXT } from '@constants/authPageText';

import Login from '../Login';
import Registration from '../Registration';
import styles from './index.module.scss';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(false);

  const toggleAuthMode = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <div>
      <div className={styles.auth}>
        <h2 className={styles['auth-description']}>{isLogin ? AUTH_TEXT.LOGIN_TITLE : AUTH_TEXT.REGISTATION_TITLE}</h2>
        <p className={styles['auth-link-description']}>
          {isLogin ? AUTH_TEXT.LOGIN_TEXT : AUTH_TEXT.REGISTATION_TEXT}
          <span className={styles['auth-link']} onClick={toggleAuthMode}>
            {isLogin ? AUTH_TEXT.LOGIN_TOGGLE : AUTH_TEXT.LOGIN_TITLE}
          </span>
        </p>
      </div>
      {isLogin ? <Login /> : <Registration />}
    </div>
  );
};

export default Auth;
