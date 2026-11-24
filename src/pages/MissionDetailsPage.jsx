import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ConfirmModal } from '../components/Common/ConfirmModal';
import { MissionImage } from '../components/Missions/MissionImage';
import { StatusBadge } from '../components/Missions/StatusBadge';
import { itemDeleted } from '../context/actions';
import { useData } from '../hooks/useData';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { formatBudget, formatDateUk, formatDuration } from '../utils/formatters';
import styles from './MissionDetailsPage.module.css';

export function MissionDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useData();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mission = useMemo(
    () => state.items.find((item) => item.id === id),
    [state.items, id]
  );

  useDocumentTitle(mission ? mission.name : 'Місію не знайдено');

  if (!mission) {
    return (
      <div className={styles.notFound}>
        <h1>Місію не знайдено</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
          Запис із ідентифікатором «{id}» відсутній або був видалений із реєстру.
        </p>
        <Link to="/" className={styles.editBtn} style={{ display: 'inline-block' }}>
          Повернутися до каталогу
        </Link>
      </div>
    );
  }

  const agency = state.agencies.find((a) => a.id === mission.agencyId);
  const instruments = state.instruments.filter((inst) =>
    mission.instrumentIds.includes(inst.id)
  );

  return (
    <div>
      <Link to="/" className={styles.breadcrumb}>
        ← Назад до каталогу місій
      </Link>

      <div className={styles.layout}>
        <aside className={styles.mediaCard}>
          <MissionImage
            src={mission.imageUrl}
            alt={mission.name}
            className={styles.imageBox}
          />
          <div className={styles.mediaFooter}>
            <div className={styles.actions}>
              <Link to={`/items/${mission.id}/edit`} className={styles.editBtn}>
                Редагувати
              </Link>
              <button
                type="button"
                className={styles.deleteBtn}
                onClick={() => setConfirmOpen(true)}
              >
                Видалити
              </button>
            </div>
          </div>
        </aside>

        <article className={styles.contentCard}>
          <div className={styles.topMeta}>
            <span className={styles.code}>{mission.missionCode}</span>
            <StatusBadge status={mission.status} />
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Телеметрія: {mission.isActive ? 'Активна' : 'Неактивна'}
            </span>
          </div>

          <h1 className={styles.title}>{mission.name}</h1>
          <p className={styles.description}>{mission.description}</p>

          <div className={styles.specsGrid}>
            <div className={styles.specBox}>
              <span className={styles.specLabel}>Космічне агентство</span>
              <span className={styles.specValue}>
                {agency ? `${agency.name} (${agency.country}, заснов. ${agency.foundedYear})` : mission.agencyId}
              </span>
            </div>
            <div className={styles.specBox}>
              <span className={styles.specLabel}>Цільовий об’єкт</span>
              <span className={styles.specValue}>{mission.targetBody}</span>
            </div>
            <div className={styles.specBox}>
              <span className={styles.specLabel}>Дата запуску</span>
              <span className={styles.specValue}>{formatDateUk(mission.launchDate)}</span>
            </div>
            <div className={styles.specBox}>
              <span className={styles.specLabel}>Бюджет / Тривалість</span>
              <span className={styles.specValue}>
                {formatBudget(mission.budgetMillions)} • {formatDuration(mission.durationDays)}
              </span>
            </div>
          </div>

          <h2 className={styles.subSectionTitle}>Наукові прилади на борту</h2>
          <div className={styles.instrumentsList}>
            {instruments.map((inst) => (
              <span key={inst.id} className={styles.instChip}>
                {inst.name}
                <span className={styles.instCat}>({inst.category})</span>
              </span>
            ))}
          </div>

          <a
            href={mission.telemetryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.extLink}
          >
            Відкрити офіційну сторінку місії ↗
          </a>
        </article>
      </div>

      <ConfirmModal
        isOpen={confirmOpen}
        title="Видалення місії"
        message={`Ви дійсно хочете видалити місію «${mission.name}»? Цю дію неможливо скасувати.`}
        confirmLabel="Видалити"
        cancelLabel="Скасувати"
        variant="danger"
        onConfirm={() => {
          dispatch(itemDeleted(mission.id));
          setConfirmOpen(false);
          navigate('/');
        }}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}
