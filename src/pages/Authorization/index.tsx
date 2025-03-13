import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthLayout from '@components/AuthLayout';
import Cover from '@components/Cover';

import styles from './index.module.scss';

const Authorization: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      navigate('/calendar');
    }
  }, [navigate]);

  return (
    <main className={styles.container}>
      <Cover />
      <AuthLayout />
    </main>
  );
};

export default Authorization;
