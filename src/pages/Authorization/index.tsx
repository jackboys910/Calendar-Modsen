import Cover from '@components/Cover';

import AuthLayout from '../../components/AuthLayout';
import styles from './index.module.scss';

const Authorization: React.FC = () => {
  return (
    <main className={styles.container}>
      <Cover />
      <AuthLayout />
    </main>
  );
};

export default Authorization;
