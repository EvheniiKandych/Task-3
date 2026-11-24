import clsx from 'clsx';
import { ErrorMessage } from '../Common/ErrorMessage';
import styles from './MissionForm.module.css';

export function FormField({
  id,
  label,
  required = false,
  error,
  fullWidth = false,
  children,
}) {
  return (
    <div className={clsx(styles.field, fullWidth && styles.fullWidth)}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && (
          <span className={styles.required} aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      <ErrorMessage id={error ? `${id}-error` : undefined} message={error} />
    </div>
  );
}
