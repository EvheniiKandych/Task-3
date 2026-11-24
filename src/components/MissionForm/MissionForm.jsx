import { useCallback, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { useData } from '../../hooks/useData';
import { useUnsavedChanges } from '../../hooks/useUnsavedChanges';
import {
  areMissionValuesEqual,
  buildInitialMissionValues,
  FORM_FIELD_ORDER,
  validateMissionForm,
} from '../../utils/missionValidation';
import { ConfirmModal } from '../Common/ConfirmModal';
import styles from './MissionForm.module.css';
import { MissionFormBasicFields } from './MissionFormBasicFields';
import { MissionFormRelationsFields } from './MissionFormRelationsFields';
import { MissionImageField } from './MissionImageField';

export function MissionForm({ initialMission = null, submitLabel, onSubmit, onCancel }) {
  const { state } = useData();
  const initialValues = useMemo(
    () => buildInitialMissionValues(initialMission),
    [initialMission]
  );
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const isSubmittingRef = useRef(false);
  const fieldRefs = useRef({});

  const isDirty = useMemo(
    () => !areMissionValuesEqual(values, initialValues),
    [values, initialValues]
  );

  const errors = useMemo(
    () => validateMissionForm(values, state.items, initialMission?.id ?? null),
    [values, state.items, initialMission?.id]
  );

  const isFormValid = Object.keys(errors).length === 0;

  const visibleErrors = useMemo(() => {
    const map = {};
    for (const key of Object.keys(errors)) {
      if (submitAttempted || touched[key]) map[key] = errors[key];
    }
    return map;
  }, [errors, submitAttempted, touched]);

  const { blocker, showCancelModal, setShowCancelModal } = useUnsavedChanges(
    isDirty,
    isSubmittingRef
  );

  const registerRef = useCallback((fieldName) => (el) => {
    fieldRefs.current[fieldName] = el;
  }, []);

  const handleFieldChange = useCallback((fieldName, nextValue) => {
    setValues((prev) => ({ ...prev, [fieldName]: nextValue }));
  }, []);

  const handleFieldBlur = useCallback((fieldName) => {
    setTouched((prev) => (prev[fieldName] ? prev : { ...prev, [fieldName]: true }));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isFormValid) {
      setSubmitAttempted(true);
      const firstInvalid = FORM_FIELD_ORDER.find((field) => errors[field]);
      fieldRefs.current[firstInvalid]?.focus();
      return;
    }

    isSubmittingRef.current = true;
    onSubmit({
      ...values,
      name: values.name.trim(),
      missionCode: values.missionCode.trim().toUpperCase(),
      targetBody: values.targetBody.trim(),
      description: values.description.trim(),
      budgetMillions: Number(values.budgetMillions),
      durationDays: Number(values.durationDays),
      isActive: Boolean(values.isActive),
      imageUrl: values.imageUrl.trim(),
      telemetryUrl: values.telemetryUrl.trim(),
    });
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <MissionFormBasicFields
          values={values}
          visibleErrors={visibleErrors}
          onFieldChange={handleFieldChange}
          onFieldBlur={handleFieldBlur}
          registerRef={registerRef}
        />
        <MissionFormRelationsFields
          values={values}
          agencies={state.agencies}
          instruments={state.instruments}
          visibleErrors={visibleErrors}
          onFieldChange={handleFieldChange}
          onFieldBlur={handleFieldBlur}
          registerRef={registerRef}
        />
        <MissionImageField
          imageUrl={values.imageUrl}
          missionName={values.name}
          visibleError={visibleErrors.imageUrl}
          onChange={(val) => handleFieldChange('imageUrl', val)}
          onBlur={() => handleFieldBlur('imageUrl')}
          registerRef={registerRef}
        />

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={() => (isDirty ? setShowCancelModal(true) : onCancel())}
          >
            Скасувати
          </button>
          <button
            type="submit"
            aria-disabled={!isFormValid}
            className={clsx(styles.submitBtn, !isFormValid && styles.submitBlocked)}
            title={!isFormValid ? 'Заповніть усі обов’язкові поля коректно' : undefined}
          >
            {submitLabel}
          </button>
        </div>
      </form>

      <ConfirmModal
        isOpen={showCancelModal || blocker.state === 'blocked'}
        title="Незбережені зміни"
        message="У формі є незбережені зміни. Ви впевнені, що хочете вийти без збереження?"
        confirmLabel="Вийти без збереження"
        cancelLabel="Продовжити редагування"
        variant="danger"
        onConfirm={() => {
          setShowCancelModal(false);
          if (blocker.state === 'blocked') blocker.proceed();
          else {
            isSubmittingRef.current = true;
            onCancel();
          }
        }}
        onCancel={() => {
          setShowCancelModal(false);
          if (blocker.state === 'blocked') blocker.reset();
        }}
      />
    </>
  );
}
