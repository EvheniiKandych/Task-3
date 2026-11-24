import { Link, useNavigate } from 'react-router-dom';
import { MissionForm } from '../components/MissionForm/MissionForm';
import { itemCreated } from '../context/actions';
import { useData } from '../hooks/useData';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import styles from './MissionFormPage.module.css';

export function MissionCreatePage() {
  useDocumentTitle('Нова місія');
  const navigate = useNavigate();
  const { dispatch } = useData();

  const handleCreate = (formValues) => {
    const newId = `m-${Date.now()}`;
    const newMission = {
      id: newId,
      ...formValues,
    };
    dispatch(itemCreated(newMission));
    navigate(`/items/${newId}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link to="/" className={styles.backLink}>
          ← Назад до каталогу
        </Link>
        <h1 className={styles.title}>Реєстрація нової космічної місії</h1>
        <p className={styles.subtitle}>
          Заповніть параметри місії, оберіть агентство, наукові прилади та завантажте емблему.
        </p>
      </div>

      <MissionForm
        submitLabel="Створити місію"
        onSubmit={handleCreate}
        onCancel={() => navigate('/')}
      />
    </div>
  );
}
