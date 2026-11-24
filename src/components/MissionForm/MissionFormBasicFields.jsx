import clsx from 'clsx';
import { FormField } from './FormField';
import styles from './MissionForm.module.css';

export function MissionFormBasicFields({
  values,
  visibleErrors,
  onFieldChange,
  onFieldBlur,
  registerRef,
}) {
  const inputClass = (name) =>
    clsx(styles.input, visibleErrors[name] && styles.inputError);

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Основні параметри місії</h2>
      <div className={styles.grid}>
        <FormField id="mission-name" label="Назва місії" required error={visibleErrors.name}>
          <input
            ref={registerRef('name')}
            id="mission-name"
            type="text"
            className={inputClass('name')}
            value={values.name}
            onChange={(e) => onFieldChange('name', e.target.value)}
            onBlur={() => onFieldBlur('name')}
            placeholder="Наприклад: Artemis II"
            aria-invalid={Boolean(visibleErrors.name)}
          />
        </FormField>

        <FormField id="mission-code" label="Код місії" required error={visibleErrors.missionCode}>
          <input
            ref={registerRef('missionCode')}
            id="mission-code"
            type="text"
            className={inputClass('missionCode')}
            value={values.missionCode}
            onChange={(e) => onFieldChange('missionCode', e.target.value)}
            onBlur={() => onFieldBlur('missionCode')}
            placeholder="Наприклад: ART-02"
            aria-invalid={Boolean(visibleErrors.missionCode)}
          />
        </FormField>

        <FormField id="mission-target" label="Цільовий об’єкт" required error={visibleErrors.targetBody}>
          <input
            ref={registerRef('targetBody')}
            id="mission-target"
            type="text"
            className={inputClass('targetBody')}
            value={values.targetBody}
            onChange={(e) => onFieldChange('targetBody', e.target.value)}
            onBlur={() => onFieldBlur('targetBody')}
            placeholder="Наприклад: Місяць, Марс, Точка L2"
            aria-invalid={Boolean(visibleErrors.targetBody)}
          />
        </FormField>

        <FormField id="mission-date" label="Дата запуску" required error={visibleErrors.launchDate}>
          <input
            ref={registerRef('launchDate')}
            id="mission-date"
            type="date"
            className={inputClass('launchDate')}
            value={values.launchDate}
            onChange={(e) => onFieldChange('launchDate', e.target.value)}
            onBlur={() => onFieldBlur('launchDate')}
            aria-invalid={Boolean(visibleErrors.launchDate)}
          />
        </FormField>

        <FormField id="mission-budget" label="Бюджет (млн $)" required error={visibleErrors.budgetMillions}>
          <input
            ref={registerRef('budgetMillions')}
            id="mission-budget"
            type="number"
            min="1"
            step="1"
            className={inputClass('budgetMillions')}
            value={values.budgetMillions}
            onChange={(e) => onFieldChange('budgetMillions', e.target.value)}
            onBlur={() => onFieldBlur('budgetMillions')}
            placeholder="1 – 50000"
            aria-invalid={Boolean(visibleErrors.budgetMillions)}
          />
        </FormField>

        <FormField id="mission-duration" label="Тривалість (днів)" required error={visibleErrors.durationDays}>
          <input
            ref={registerRef('durationDays')}
            id="mission-duration"
            type="number"
            min="1"
            step="1"
            className={inputClass('durationDays')}
            value={values.durationDays}
            onChange={(e) => onFieldChange('durationDays', e.target.value)}
            onBlur={() => onFieldBlur('durationDays')}
            placeholder="1 – 30000"
            aria-invalid={Boolean(visibleErrors.durationDays)}
          />
        </FormField>

        <FormField
          id="mission-url"
          label="Офіційна сторінка / телеметрія (URL)"
          required
          fullWidth
          error={visibleErrors.telemetryUrl}
        >
          <input
            ref={registerRef('telemetryUrl')}
            id="mission-url"
            type="url"
            className={inputClass('telemetryUrl')}
            value={values.telemetryUrl}
            onChange={(e) => onFieldChange('telemetryUrl', e.target.value)}
            onBlur={() => onFieldBlur('telemetryUrl')}
            placeholder="https://science.nasa.gov/..."
            aria-invalid={Boolean(visibleErrors.telemetryUrl)}
          />
        </FormField>

        <FormField
          id="mission-desc"
          label="Опис місії та наукових цілей"
          required
          fullWidth
          error={visibleErrors.description}
        >
          <textarea
            ref={registerRef('description')}
            id="mission-desc"
            className={clsx(
              styles.textarea,
              visibleErrors.description && styles.inputError
            )}
            value={values.description}
            onChange={(e) => onFieldChange('description', e.target.value)}
            onBlur={() => onFieldBlur('description')}
            placeholder="Опишіть цілі місії, наукову програму та ключові результати (від 20 символів)..."
            aria-invalid={Boolean(visibleErrors.description)}
          />
        </FormField>
      </div>
    </section>
  );
}
