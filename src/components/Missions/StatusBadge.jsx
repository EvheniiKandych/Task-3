import clsx from 'clsx';
import { getStatusLabel } from '../../utils/formatters';
import styles from './StatusBadge.module.css';

export function StatusBadge({ status }) {
  return (
    <span className={clsx(styles.badge, styles[status] || styles.retired)}>
      <span className={styles.dot} aria-hidden="true" />
      {getStatusLabel(status)}
    </span>
  );
}
