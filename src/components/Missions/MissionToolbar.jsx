import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { SORT_FIELDS } from '../../utils/missionFilters';
import styles from './MissionToolbar.module.css';

export function MissionToolbar({
  searchValue,
  onSearchChange,
  onClearSearch,
  sort,
  onSortChange,
  viewMode,
  onViewModeChange,
}) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.searchWrap}>
        <svg
          className={styles.searchIcon}
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          type="search"
          className={styles.searchInput}
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Пошук місії за назвою..."
          aria-label="Пошук місії за назвою"
        />
        {searchValue && (
          <button
            type="button"
            className={styles.clearBtn}
            onClick={onClearSearch}
            aria-label="Очистити пошук"
            title="Очистити пошук"
          >
            ×
          </button>
        )}
      </div>

      <div className={styles.controls}>
        <div className={styles.sortGroup}>
          <select
            className={styles.sortSelect}
            value={sort.sortBy}
            onChange={(event) => onSortChange(event.target.value, sort.sortDir)}
            aria-label="Поле сортування"
          >
            {SORT_FIELDS.map((field) => (
              <option key={field.value} value={field.value}>
                Сортування: {field.label}
              </option>
            ))}
          </select>
          <button
            type="button"
            className={styles.dirBtn}
            onClick={() =>
              onSortChange(sort.sortBy, sort.sortDir === 'asc' ? 'desc' : 'asc')
            }
            aria-label={
              sort.sortDir === 'asc'
                ? 'Сортування за зростанням, змінити на спадання'
                : 'Сортування за спаданням, змінити на зростання'
            }
          >
            {sort.sortDir === 'asc' ? '↑ Зростання' : '↓ Спадання'}
          </button>
        </div>

        <div className={styles.viewSwitch} role="group" aria-label="Режим перегляду">
          <button
            type="button"
            className={clsx(
              styles.viewBtn,
              viewMode === 'grid' && styles.viewBtnActive
            )}
            aria-pressed={viewMode === 'grid'}
            onClick={() => onViewModeChange('grid')}
          >
            Сітка
          </button>
          <button
            type="button"
            className={clsx(
              styles.viewBtn,
              viewMode === 'table' && styles.viewBtnActive
            )}
            aria-pressed={viewMode === 'table'}
            onClick={() => onViewModeChange('table')}
          >
            Таблиця
          </button>
        </div>

        <Link to="/items/new" className={styles.createBtn}>
          + Додати місію
        </Link>
      </div>
    </div>
  );
}
