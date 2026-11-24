import { useMemo, useState } from 'react';
import { ConfirmModal } from '../components/Common/ConfirmModal';
import { useData } from '../hooks/useData';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { formatBudget } from '../utils/formatters';
import styles from './AboutPage.module.css';

export function AboutPage() {
  useDocumentTitle('Про застосунок та статистику');
  const { state, resetDemoData } = useData();
  const [confirmReset, setConfirmReset] = useState(false);

  const stats = useMemo(() => {
    const total = state.items.length;
    const activeCount = state.items.filter((m) => m.status === 'active').length;
    const totalBudget = state.items.reduce(
      (sum, m) => sum + Number(m.budgetMillions || 0),
      0
    );
    const avgBudget = total > 0 ? Math.round(totalBudget / total) : 0;

    const byAgency = state.agencies.map((agency) => ({
      ...agency,
      count: state.items.filter((m) => m.agencyId === agency.id).length,
    }));

    const byInstrument = state.instruments.map((inst) => ({
      ...inst,
      count: state.items.filter((m) => m.instrumentIds.includes(inst.id)).length,
    }));

    return {
      total,
      activeCount,
      totalBudget,
      avgBudget,
      byAgency,
      byInstrument,
    };
  }, [state.items, state.agencies, state.instruments]);

  const maxCount = Math.max(1, stats.total);

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1 className={styles.title}>Про застосунок AstroLog</h1>
        <p className={styles.lead}>
          <strong>AstroLog</strong> — односторінковий React-застосунок для обліку та аналізу
          космічних місій. Предметна область поєднує головну сутність «Космічна місія» із
          довідниками «Космічне агентство» (багато-до-одного) та «Наукові прилади»
          (багато-до-багатьох). Стан керується через власний <code>DataContext</code> +{' '}
          <code>useReducer</code> із синхронізацією у <code>localStorage</code> та URL.
        </p>
      </section>

      <section className={styles.kpiGrid} aria-label="Ключові показники">
        <div className={styles.kpiCard}>
          <span className={styles.kpiLabel}>Усього місій у реєстрі</span>
          <strong className={styles.kpiValue}>{stats.total}</strong>
        </div>
        <div className={styles.kpiCard}>
          <span className={styles.kpiLabel}>Активні зараз</span>
          <strong className={styles.kpiValue}>{stats.activeCount}</strong>
        </div>
        <div className={styles.kpiCard}>
          <span className={styles.kpiLabel}>Сумарний бюджет</span>
          <strong className={styles.kpiValue}>{formatBudget(stats.totalBudget)}</strong>
        </div>
        <div className={styles.kpiCard}>
          <span className={styles.kpiLabel}>Середній бюджет місії</span>
          <strong className={styles.kpiValue}>{formatBudget(stats.avgBudget)}</strong>
        </div>
      </section>

      <div className={styles.twoCols}>
        <section className={styles.panel}>
          <h2 className={styles.panelTitle}>Розподіл за агентствами</h2>
          <ul className={styles.statList}>
            {stats.byAgency.map((agency) => (
              <li key={agency.id} className={styles.statItem}>
                <div className={styles.statTop}>
                  <span>{agency.name}</span>
                  <strong>{agency.count}</strong>
                </div>
                <div className={styles.barTrack}>
                  <div
                    className={styles.barFill}
                    style={{ width: `${(agency.count / maxCount) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.panel}>
          <h2 className={styles.panelTitle}>Популярність наукових приладів</h2>
          <ul className={styles.statList}>
            {stats.byInstrument.map((inst) => (
              <li key={inst.id} className={styles.statItem}>
                <div className={styles.statTop}>
                  <span>{inst.name}</span>
                  <strong>{inst.count}</strong>
                </div>
                <div className={styles.barTrack}>
                  <div
                    className={styles.barFill}
                    style={{ width: `${(inst.count / maxCount) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className={styles.resetBox}>
        <div>
          <h2 className={styles.panelTitle} style={{ marginBottom: '0.25rem' }}>
            Скидання локальних даних
          </h2>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Відновити початковий набір із 26 космічних місій у <code>localStorage</code>.
          </p>
        </div>
        <button
          type="button"
          className={styles.resetBtn}
          onClick={() => setConfirmReset(true)}
        >
          Скинути до початкових даних
        </button>
      </section>

      <ConfirmModal
        isOpen={confirmReset}
        title="Відновлення початкового каталогу"
        message="Усі створені, відредаговані або видалені вами записи будуть замінені початковим набором місій. Продовжити?"
        confirmLabel="Скинути дані"
        cancelLabel="Скасувати"
        variant="danger"
        onConfirm={() => {
          resetDemoData();
          setConfirmReset(false);
        }}
        onCancel={() => setConfirmReset(false)}
      />
    </div>
  );
}
