import { useState } from 'react';
import clsx from 'clsx';
import styles from './MissionImage.module.css';

export function MissionImage({ src, alt, className }) {
  const [failedSrc, setFailedSrc] = useState(null);
  const hasError = Boolean(src) && failedSrc === src;
  const showPlaceholder = !src || !src.trim() || hasError;

  return (
    <div className={clsx(styles.wrapper, className)}>
      {showPlaceholder ? (
        <div className={styles.placeholder} aria-label={alt || 'Зображення відсутнє'}>
          <svg
            width="38"
            height="38"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" opacity="0.4" />
            <path d="M4.5 16.5C7.5 12 16.5 12 19.5 7.5" />
            <circle cx="12" cy="12" r="2.5" fill="currentColor" />
          </svg>
          <span className={styles.placeholderLabel}>
            {hasError ? 'Не вдалося завантажити зображення' : 'Зображення відсутнє'}
          </span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={styles.img}
          onError={() => setFailedSrc(src)}
        />
      )}
    </div>
  );
}
