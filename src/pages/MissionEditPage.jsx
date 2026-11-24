import { useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MissionForm } from '../components/MissionForm/MissionForm';
import { itemUpdated } from '../context/actions';
import { useData } from '../hooks/useData';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import styles from './MissionFormPage.module.css';

export function MissionEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useData();

  const mission = useMemo(
    () => state.items.find((item) => item.id === id),
    [state.items, id]
  );

  useDocumentTitle(mission ? `Редагування: ${mission.name}` : 'Місію не знайдено');

  if (!mission) {
    return (
      <div className={styles.notFound}>
        <h1>Місію не знайдено</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          Неможливо редагувати запис із ідентифікатором «{id}», оскільки його не існує.
        </p>
        <Link to="/">Повернутися до каталогу</Link>
      </div>
    );
  }

  const handleUpdate = (formValues) => {
    dispatch(
      itemUpdated({
        id: mission.id,
        ...formValues,
      })
    );
    navigate(`/items/${mission.id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link to={`/items/${mission.id}`} className={styles.backLink}>
          ← Назад до деталей місії
        </Link>
        <h1 className={styles.title}>Редагування: {mission.name}</h1>
        <p className={styles.subtitle}>
          Внесіть зміни до параметрів місії та натисніть «Зберегти зміни».
        </p>
      </div>

      <MissionForm
        key={mission.id}
        initialMission={mission}
        submitLabel="Зберегти зміни"
        onSubmit={handleUpdate}
        onCancel={() => navigate(`/items/${mission.id}`)}
      />
    </div>
  );
}
