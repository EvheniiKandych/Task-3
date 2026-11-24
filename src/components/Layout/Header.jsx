import { Link, NavLink } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand}>
          <span className={styles.logoIcon} aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="4" />
              <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(-25 12 12)" />
            </svg>
          </span>
          <span>
            AstroLog
            <span className={styles.brandSub}>Реєстр космічних місій</span>
          </span>
        </Link>

        <nav className={styles.nav} aria-label="Головна навігація">
          <NavLink
            to="/"
            end
            className={({ isActive }) => clsx(styles.link, isActive && styles.active)}
          >
            Каталог місій
          </NavLink>
          <NavLink
            to="/items/new"
            className={({ isActive }) => clsx(styles.link, isActive && styles.active)}
          >
            + Нова місія
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => clsx(styles.link, isActive && styles.active)}
          >
            Про застосунок
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
