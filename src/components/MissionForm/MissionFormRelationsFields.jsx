import { useMemo } from 'react';
import Select from 'react-select';
import clsx from 'clsx';
import { MISSION_STATUSES } from '../../data/seedData';
import { getReactSelectStyles, prefixFilterOption } from '../../utils/reactSelectStyles';
import { ErrorMessage } from '../Common/ErrorMessage';
import { FormField } from './FormField';
import styles from './MissionForm.module.css';

export function MissionFormRelationsFields({
  values,
  agencies,
  instruments,
  visibleErrors,
  onFieldChange,
  onFieldBlur,
  registerRef,
}) {
  const instrumentOptions = useMemo(
    () => instruments.map((inst) => ({ value: inst.id, label: inst.name })),
    [instruments]
  );

  const selectedInstruments = useMemo(
    () =>
      instrumentOptions.filter((opt) =>
        values.instrumentIds.includes(opt.value)
      ),
    [instrumentOptions, values.instrumentIds]
  );

  const selectStyles = useMemo(
    () => getReactSelectStyles(Boolean(visibleErrors.instrumentIds)),
    [visibleErrors.instrumentIds]
  );

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Зв’язки та статус місії</h2>
      <div className={styles.grid}>
        <FormField
          id="mission-agency"
          label="Космічне агентство (багато-до-одного)"
          required
          error={visibleErrors.agencyId}
        >
          <select
            ref={registerRef('agencyId')}
            id="mission-agency"
            className={clsx(
              styles.select,
              visibleErrors.agencyId && styles.inputError
            )}
            value={values.agencyId}
            onChange={(e) => onFieldChange('agencyId', e.target.value)}
            onBlur={() => onFieldBlur('agencyId')}
            aria-invalid={Boolean(visibleErrors.agencyId)}
          >
            <option value="">— Оберіть агентство —</option>
            {agencies.map((agency) => (
              <option key={agency.id} value={agency.id}>
                {agency.name} ({agency.country})
              </option>
            ))}
          </select>
        </FormField>

        <FormField
          id="mission-instruments"
          label="Наукові прилади (пошук за початком назви)"
          required
          error={visibleErrors.instrumentIds}
        >
          <Select
            ref={registerRef('instrumentIds')}
            inputId="mission-instruments"
            isMulti
            options={instrumentOptions}
            value={selectedInstruments}
            onChange={(selected) =>
              onFieldChange(
                'instrumentIds',
                selected ? selected.map((opt) => opt.value) : []
              )
            }
            onBlur={() => onFieldBlur('instrumentIds')}
            filterOption={prefixFilterOption}
            styles={selectStyles}
            placeholder="Почніть вводити назву приладу..."
            noOptionsMessage={() => 'Немає приладів з таким початком назви'}
            closeMenuOnSelect={false}
          />
        </FormField>

        <div className={clsx(styles.field, styles.fullWidth)}>
          <span className={styles.label}>
            Статус місії (enum)
            <span className={styles.required} aria-hidden="true">
              *
            </span>
          </span>
          <div className={styles.radioGroup} role="radiogroup" aria-label="Статус місії">
            {MISSION_STATUSES.map((option, idx) => (
              <label key={option.value} className={styles.radioLabel}>
                <input
                  ref={idx === 0 ? registerRef('status') : undefined}
                  type="radio"
                  name="mission-status"
                  value={option.value}
                  checked={values.status === option.value}
                  onChange={(e) => onFieldChange('status', e.target.value)}
                  onBlur={() => onFieldBlur('status')}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
          <ErrorMessage message={visibleErrors.status} />
        </div>

        <div className={clsx(styles.field, styles.fullWidth)}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={values.isActive}
              onChange={(e) => onFieldChange('isActive', e.target.checked)}
            />
            <span>Активний прийом телеметрії (місія перебуває на зв’язку)</span>
          </label>
        </div>
      </div>
    </section>
  );
}
