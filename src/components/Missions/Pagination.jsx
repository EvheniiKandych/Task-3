import clsx from 'clsx';
import styles from './Pagination.module.css';

const PAGE_SIZES = [6, 12, 24];

export function Pagination({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  displayStart,
  displayEnd,
  onPageChange,
  onPageSizeChange,
}) {
  if (totalItems === 0) return null;

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={styles.bar}>
      <div className={styles.info}>
        Показано{' '}
        <strong>
          {displayStart}–{displayEnd}
        </strong>{' '}
        з <strong>{totalItems}</strong>
      </div>

      <div className={styles.controls}>
        <label className={styles.pageSizeWrap}>
          <span>На сторінці:</span>
          <select
            className={styles.pageSizeSelect}
            value={pageSize}
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
            aria-label="Кількість записів на сторінці"
          >
            {PAGE_SIZES.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>

        <nav className={styles.pages} aria-label="Посторінкова навігація">
          <button
            type="button"
            className={styles.btn}
            disabled={currentPage <= 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            Попередня
          </button>

          {pageNumbers.map((pageNum) => (
            <button
              key={pageNum}
              type="button"
              className={clsx(
                styles.btn,
                pageNum === currentPage && styles.activePage
              )}
              aria-current={pageNum === currentPage ? 'page' : undefined}
              onClick={() => onPageChange(pageNum)}
            >
              {pageNum}
            </button>
          ))}

          <button
            type="button"
            className={styles.btn}
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            Наступна
          </button>
        </nav>
      </div>
    </div>
  );
}
