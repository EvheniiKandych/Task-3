import styles from './ErrorMessage.module.css';

export function ErrorMessage({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} className={styles.error} role="alert">
      {message}
    </p>
  );
}
