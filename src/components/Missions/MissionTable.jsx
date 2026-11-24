import { Link } from 'react-router-dom';
import { formatBudget, formatDateUk, formatDuration } from '../../utils/formatters';
import { MissionImage } from './MissionImage';
import styles from './MissionTable.module.css';
import { StatusBadge } from './StatusBadge';

export function MissionTable({ missions, agencyMap, onRequestDelete }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Місія</th>
            <th>Агентство</th>
            <th>Ціль</th>
            <th>Запуск</th>
            <th>Бюджет</th>
            <th>Тривалість</th>
            <th>Статус</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {missions.map((mission) => (
            <tr key={mission.id}>
              <td>
                <div className={styles.missionCell}>
                  <MissionImage
                    src={mission.imageUrl}
                    alt={mission.name}
                    className={styles.thumb}
                  />
                  <div>
                    <Link to={`/items/${mission.id}`} className={styles.missionName}>
                      {mission.name}
                    </Link>
                    <span className={styles.missionCode}>{mission.missionCode}</span>
                  </div>
                </div>
              </td>
              <td>{agencyMap[mission.agencyId]?.name || mission.agencyId}</td>
              <td>{mission.targetBody}</td>
              <td>{formatDateUk(mission.launchDate)}</td>
              <td>{formatBudget(mission.budgetMillions)}</td>
              <td>{formatDuration(mission.durationDays)}</td>
              <td>
                <StatusBadge status={mission.status} />
              </td>
              <td>
                <div className={styles.actions}>
                  <Link to={`/items/${mission.id}`} className={styles.btn}>
                    Деталі
                  </Link>
                  <Link to={`/items/${mission.id}/edit`} className={styles.btn}>
                    Ред.
                  </Link>
                  <button
                    type="button"
                    className={styles.dangerBtn}
                    onClick={() => onRequestDelete(mission)}
                  >
                    Видал.
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
