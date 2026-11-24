import { Link } from 'react-router-dom';
import { formatBudget, formatDateUk } from '../../utils/formatters';
import styles from './MissionCard.module.css';
import { MissionImage } from './MissionImage';
import { StatusBadge } from './StatusBadge';

export function MissionCard({ mission, agencyName, instrumentMap, onRequestDelete }) {
  return (
    <article className={styles.card}>
      <Link to={`/items/${mission.id}`} className={styles.mediaLink}>
        <MissionImage src={mission.imageUrl} alt={mission.name} />
      </Link>

      <div className={styles.body}>
        <div className={styles.topRow}>
          <span className={styles.code}>{mission.missionCode}</span>
          <StatusBadge status={mission.status} />
        </div>

        <h3 className={styles.title}>
          <Link to={`/items/${mission.id}`} className={styles.titleLink}>
            {mission.name}
          </Link>
        </h3>

        <div className={styles.meta}>
          <div className={styles.metaItem}>
            Агентство: <strong>{agencyName}</strong>
          </div>
          <div className={styles.metaItem}>
            Запуск: <strong>{formatDateUk(mission.launchDate)}</strong>
          </div>
          <div className={styles.metaItem}>
            Бюджет: <strong>{formatBudget(mission.budgetMillions)}</strong>
          </div>
          <div className={styles.metaItem}>
            Ціль: <strong>{mission.targetBody}</strong>
          </div>
        </div>

        <p className={styles.desc}>{mission.description}</p>

        <div className={styles.tags}>
          {mission.instrumentIds.map((instId) => (
            <span key={instId} className={styles.tag}>
              {instrumentMap[instId]?.name || instId}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.footer}>
        <Link to={`/items/${mission.id}`} className={styles.detailsLink}>
          Детальніше →
        </Link>
        <div className={styles.actions}>
          <Link to={`/items/${mission.id}/edit`} className={styles.editLink}>
            Редагувати
          </Link>
          <button
            type="button"
            className={styles.deleteBtn}
            onClick={() => onRequestDelete(mission)}
          >
            Видалити
          </button>
        </div>
      </div>
    </article>
  );
}
