import styles from './index.module.scss';

const Cover: React.FC = () => {
  return (
    <div className={styles.container}>
      <header className={styles['greeting-container']}>
        <h2 className={styles['greeting-text']}>Welcome</h2>
        <p className={styles['greeting-description']}>your day is in your hands</p>
      </header>
      <section className={styles.content}>
        <nav className={styles.pagination}>
          <ul className={styles['pagination-dots']}>
            <li className={`${styles.dot} ${styles.large}`}></li>
            <li className={`${styles.dot} ${styles.small}`}></li>
            <li className={`${styles.dot} ${styles.small}`}></li>
          </ul>
        </nav>
        <article className={styles.article}>
          <h1 className={styles['article-title']}>Modsen Calendar</h1>
          <p className={styles['article-text']}>Use a calendar to plan your work day and week.</p>
        </article>
      </section>
    </div>
  );
};

export default Cover;
