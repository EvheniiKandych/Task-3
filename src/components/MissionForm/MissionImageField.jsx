import { useRef, useState } from 'react';
import clsx from 'clsx';
import { validateImageFile } from '../../utils/missionValidation';
import { ErrorMessage } from '../Common/ErrorMessage';
import { MissionImage } from '../Missions/MissionImage';
import { FormField } from './FormField';
import styles from './MissionForm.module.css';

export function MissionImageField({
  imageUrl,
  missionName,
  visibleError,
  onChange,
  onBlur,
  registerRef,
}) {
  const [fileError, setFileError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validationError = validateImageFile(file);
    if (validationError) {
      setFileError(validationError);
      event.target.value = '';
      return;
    }

    setFileError(null);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onChange(reader.result);
      }
    };
    reader.onerror = () => {
      setFileError('Не вдалося прочитати вибраний файл зображення.');
    };
    reader.readAsDataURL(file);
  };

  const handleClearImage = () => {
    setFileError(null);
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const displayUrlValue = imageUrl.startsWith('data:image/')
    ? ''
    : imageUrl;

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Зображення / емблема місії</h2>
      <div className={styles.imageGrid}>
        <div className={styles.imageInputs}>
          <div className={styles.field}>
            <label htmlFor="mission-image-file" className={styles.label}>
              Завантажити файл з диска (до 2 МБ)
            </label>
            <div className={styles.fileRow}>
              <input
                ref={fileInputRef}
                id="mission-image-file"
                type="file"
                accept="image/*"
                className={styles.fileInput}
                onChange={handleFileChange}
              />
              {imageUrl && (
                <button
                  type="button"
                  className={styles.clearPhotoBtn}
                  onClick={handleClearImage}
                >
                  Очистити фото
                </button>
              )}
            </div>
            <ErrorMessage message={fileError} />
            {imageUrl.startsWith('data:image/') && (
              <p className={styles.hint}>
                Завантажено локальне зображення (Data URL).
              </p>
            )}
          </div>

          <FormField
            id="mission-image-url"
            label="Або вставте посилання на зображення"
            error={visibleError}
          >
            <input
              ref={registerRef('imageUrl')}
              id="mission-image-url"
              type="text"
              className={clsx(styles.input, visibleError && styles.inputError)}
              value={displayUrlValue}
              onChange={(e) => {
                setFileError(null);
                onChange(e.target.value);
              }}
              onBlur={onBlur}
              placeholder="https://... або /missions/m-01.svg"
              aria-invalid={Boolean(visibleError)}
            />
          </FormField>
        </div>

        <div>
          <span className={styles.label} style={{ display: 'block' }}>
            Попередній перегляд
          </span>
          <div className={styles.previewBox}>
            <MissionImage
              src={imageUrl}
              alt={missionName || 'Попередній перегляд місії'}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
