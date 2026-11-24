import { useMemo } from 'react';
import Select from 'react-select';
import { getReactSelectStyles, prefixFilterOption } from '../../utils/reactSelectStyles';
import styles from './MissionFilters.module.css';

export function MissionFilters({
  agencies,
  instruments,
  filters,
  hasActive,
  onFilterChange,
  onResetFilters,
}) {
  const instrumentOptions = useMemo(
    () => instruments.map((inst) => ({ value: inst.id, label: inst.name })),
    [instruments]
  );

  const selectedInstruments = useMemo(
    () =>
      instrumentOptions.filter((opt) =>
        filters.instrumentIds.includes(opt.value)
      ),
    [instrumentOptions, filters.instrumentIds]
  );

  const selectStyles = useMemo(() => getReactSelectStyles(false), []);

  return (
    <section className={styles.panel} aria-label="Фільтри місій">
      <div className={styles.field}>
        <label htmlFor="filter-agency" className={styles.label}>
          Агентство (багато-до-одного)
        </label>
        <select
          id="filter-agency"
          className={styles.select}
          value={filters.agencyId}
          onChange={(event) => onFilterChange({ agencyId: event.target.value })}
        >
          <option value="">Усі агентства</option>
          {agencies.map((agency) => (
            <option key={agency.id} value={agency.id}>
              {agency.name} ({agency.country})
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor="filter-instruments" className={styles.label}>
          Наукові прилади (мультивибір)
        </label>
        <Select
          inputId="filter-instruments"
          isMulti
          options={instrumentOptions}
          value={selectedInstruments}
          onChange={(selected) =>
            onFilterChange({
              instrumentIds: selected ? selected.map((opt) => opt.value) : [],
            })
          }
          filterOption={prefixFilterOption}
          styles={selectStyles}
          placeholder="Оберіть прилади..."
          noOptionsMessage={() => 'Приладів не знайдено'}
          closeMenuOnSelect={false}
        />
      </div>

      <div className={styles.field}>
        <span className={styles.label}>Бюджет (млн $)</span>
        <div className={styles.rangeInputs}>
          <input
            type="number"
            min="0"
            className={styles.input}
            placeholder="Від"
            aria-label="Мінімальний бюджет у мільйонах доларів"
            value={filters.budgetMin}
            onChange={(event) =>
              onFilterChange({ budgetMin: event.target.value })
            }
          />
          <input
            type="number"
            min="0"
            className={styles.input}
            placeholder="До"
            aria-label="Максимальний бюджет у мільйонах доларів"
            value={filters.budgetMax}
            onChange={(event) =>
              onFilterChange({ budgetMax: event.target.value })
            }
          />
        </div>
      </div>

      <div className={styles.resetWrap}>
        <button
          type="button"
          className={styles.resetBtn}
          disabled={!hasActive}
          onClick={onResetFilters}
        >
          Скинути все
        </button>
      </div>
    </section>
  );
}
