import { useData } from '../../hooks/useData';
import styles from './Footer.module.css';

export function Footer() {
  const { state } = useData();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span>
          AstroLog — SPA на React (Context + Reducer) • Місій у реєстрі:{' '}
          <strong>{state.items.length}</strong>
        </span>
        <span className={styles.muted}>
          Основи web програмування • ЛНУ ім. Івана Франка
        </span>
      </div>
    </footer>
  );
}
