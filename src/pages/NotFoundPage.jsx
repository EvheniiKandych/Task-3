import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import styles from './NotFoundPage.module.css';

export function NotFoundPage() {
  useDocumentTitle('404 — Сторінку не знайдено');

  return (
    <section className={styles.box}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>Орбіту не знайдено</h1>
      <p className={styles.text}>
        Сторінка за цією адресою не існує або була переміщена.
      </p>
      <Link to="/" className={styles.homeLink}>
        Повернутися на головну
      </Link>
    </section>
  );
}
