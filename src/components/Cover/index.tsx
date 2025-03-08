import { BRAND_NAME, COVER_TEXT } from '@constants/authPageText';

import styles from './index.module.scss';

const Cover: React.FC = () => {
  return (
    <div className={styles.container}>
      <header className={styles['greeting-container']}>
        <h2 className={styles['greeting-text']}>{COVER_TEXT.GREETING_TEXT}</h2>
        <p className={styles['greeting-description']}>{COVER_TEXT.GREETING_DESCRIPTION}</p>
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
          <h1 className={styles['article-title']}>{BRAND_NAME}</h1>
          <p className={styles['article-text']}>{COVER_TEXT.ARTICLE_TEXT}</p>
        </article>
      </section>
    </div>
  );
};

export default Cover;
