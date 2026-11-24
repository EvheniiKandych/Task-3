import styles from './EmptyState.module.css';

export function EmptyState({ onResetFilters, hasFilters }) {
  return (
    <div className={styles.empty} role="status">
      <svg
        className={styles.icon}
        width="44"
        height="44"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
      <h2 className={styles.title}>Нічого не знайдено</h2>
      <p className={styles.text}>
        {hasFilters
          ? 'За заданими параметрами пошуку та фільтрами не знайдено жодної космічної місії.'
          : 'У реєстрі поки що немає жодної місії.'}
      </p>
      {hasFilters && (
        <button type="button" className={styles.resetBtn} onClick={onResetFilters}>
          Скинути фільтри
        </button>
      )}
    </div>
  );
}
