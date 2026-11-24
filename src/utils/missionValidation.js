export const MAX_IMAGE_FILE_SIZE = 2 * 1024 * 1024; // 2 MB

export const FORM_FIELD_ORDER = [
  'name',
  'missionCode',
  'targetBody',
  'agencyId',
  'instrumentIds',
  'launchDate',
  'budgetMillions',
  'durationDays',
  'telemetryUrl',
  'status',
  'imageUrl',
  'description',
];

export function isValidHttpUrl(value) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export function isValidImageSource(value) {
  if (!value) return true;
  if (value.startsWith('data:image/') || value.startsWith('/')) {
    return true;
  }
  return isValidHttpUrl(value);
}

export function validateMissionForm(values, existingItems, currentId = null) {
  const errors = {};

  const trimmedName = values.name.trim();
  if (!trimmedName) {
    errors.name = 'Назва місії є обов’язковою.';
  } else if (trimmedName.length < 3) {
    errors.name = 'Назва повинна містити щонайменше 3 символи.';
  } else if (trimmedName.length > 80) {
    errors.name = 'Назва не може перевищувати 80 символів.';
  } else {
    const duplicate = existingItems.some(
      (item) =>
        item.id !== currentId &&
        item.name.trim().toLowerCase() === trimmedName.toLowerCase()
    );
    if (duplicate) {
      errors.name = 'Місія з такою назвою вже існує в реєстрі.';
    }
  }

  const trimmedCode = values.missionCode.trim();
  if (!trimmedCode) {
    errors.missionCode = 'Код місії є обов’язковим.';
  } else if (trimmedCode.length < 3 || trimmedCode.length > 20) {
    errors.missionCode = 'Код має містити від 3 до 20 символів.';
  } else if (!/^[A-Za-z0-9-]+$/.test(trimmedCode)) {
    errors.missionCode = 'Дозволені лише латинські літери, цифри та дефіс.';
  }

  const trimmedTarget = values.targetBody.trim();
  if (!trimmedTarget) {
    errors.targetBody = 'Вкажіть цільовий об’єкт дослідження.';
  } else if (trimmedTarget.length < 2 || trimmedTarget.length > 60) {
    errors.targetBody = 'Довжина поля має бути від 2 до 60 символів.';
  }

  if (!values.agencyId) {
    errors.agencyId = 'Оберіть космічне агентство.';
  }

  if (!values.instrumentIds || values.instrumentIds.length === 0) {
    errors.instrumentIds = 'Оберіть хоча б один науковий прилад.';
  }

  if (!values.launchDate) {
    errors.launchDate = 'Дата запуску є обов’язковою.';
  } else if (values.launchDate < '1957-10-04' || values.launchDate > '2040-12-31') {
    errors.launchDate = 'Дата має бути в межах від 1957-10-04 до 2040-12-31.';
  }

  const budget = Number(values.budgetMillions);
  if (values.budgetMillions === '' || Number.isNaN(budget)) {
    errors.budgetMillions = 'Вкажіть бюджет місії.';
  } else if (budget < 1 || budget > 50000) {
    errors.budgetMillions = 'Бюджет повинен бути в діапазоні від 1 до 50 000 млн $.';
  }

  const duration = Number(values.durationDays);
  if (values.durationDays === '' || Number.isNaN(duration)) {
    errors.durationDays = 'Вкажіть тривалість місії у днях.';
  } else if (!Number.isInteger(duration) || duration < 1 || duration > 30000) {
    errors.durationDays = 'Введіть ціле число від 1 до 30 000 днів.';
  }

  const trimmedUrl = values.telemetryUrl.trim();
  if (!trimmedUrl) {
    errors.telemetryUrl = 'Посилання на офіційну сторінку є обов’язковим.';
  } else if (!isValidHttpUrl(trimmedUrl)) {
    errors.telemetryUrl = 'Введіть коректний URL (починається з http:// або https://).';
  }

  if (!values.status) {
    errors.status = 'Оберіть статус місії.';
  }

  if (values.imageUrl && !isValidImageSource(values.imageUrl.trim())) {
    errors.imageUrl = 'Вкажіть коректний URL зображення або завантажте файл.';
  }

  const trimmedDesc = values.description.trim();
  if (!trimmedDesc) {
    errors.description = 'Опис місії є обов’язковим.';
  } else if (trimmedDesc.length < 20) {
    errors.description = 'Опис повинен містити щонайменше 20 символів.';
  } else if (trimmedDesc.length > 1000) {
    errors.description = 'Опис не може перевищувати 1000 символів.';
  }

  return errors;
}

export function validateImageFile(file) {
  if (!file) return null;
  if (!file.type.startsWith('image/')) {
    return 'Дозволено завантажувати лише файли зображень (PNG, JPG, WebP, SVG).';
  }
  if (file.size > MAX_IMAGE_FILE_SIZE) {
    return 'Розмір зображення не повинен перевищувати 2 МБ.';
  }
  return null;
}

export function areMissionValuesEqual(a, b) {
  return (
    a.name === b.name &&
    a.missionCode === b.missionCode &&
    a.targetBody === b.targetBody &&
    a.description === b.description &&
    String(a.budgetMillions) === String(b.budgetMillions) &&
    String(a.durationDays) === String(b.durationDays) &&
    a.launchDate === b.launchDate &&
    Boolean(a.isActive) === Boolean(b.isActive) &&
    a.imageUrl === b.imageUrl &&
    a.agencyId === b.agencyId &&
    a.status === b.status &&
    a.telemetryUrl === b.telemetryUrl &&
    a.instrumentIds.length === b.instrumentIds.length &&
    a.instrumentIds.every((id, idx) => id === b.instrumentIds[idx])
  );
}

export function buildInitialMissionValues(mission) {
  if (!mission) {
    return {
      name: '',
      missionCode: '',
      targetBody: '',
      description: '',
      budgetMillions: '',
      durationDays: '',
      launchDate: '',
      isActive: true,
      imageUrl: '',
      agencyId: '',
      instrumentIds: [],
      status: 'planned',
      telemetryUrl: '',
    };
  }
  return {
    name: mission.name || '',
    missionCode: mission.missionCode || '',
    targetBody: mission.targetBody || '',
    description: mission.description || '',
    budgetMillions: String(mission.budgetMillions ?? ''),
    durationDays: String(mission.durationDays ?? ''),
    launchDate: mission.launchDate || '',
    isActive: Boolean(mission.isActive),
    imageUrl: mission.imageUrl || '',
    agencyId: mission.agencyId || '',
    instrumentIds: [...(mission.instrumentIds || [])],
    status: mission.status || 'planned',
    telemetryUrl: mission.telemetryUrl || '',
  };
}
