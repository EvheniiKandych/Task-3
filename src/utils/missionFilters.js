export const SORT_FIELDS = [
  { value: 'launchDate', label: 'Дата запуску' },
  { value: 'name', label: 'Назва місії' },
  { value: 'budgetMillions', label: 'Бюджет' },
  { value: 'durationDays', label: 'Тривалість' },
];

export function filterMissions(items, search, filters) {
  const normalizedSearch = search.trim().toLowerCase();
  const minBudget = filters.budgetMin !== '' ? Number(filters.budgetMin) : null;
  const maxBudget = filters.budgetMax !== '' ? Number(filters.budgetMax) : null;

  return items.filter((item) => {
    if (normalizedSearch && !item.name.toLowerCase().includes(normalizedSearch)) {
      return false;
    }

    if (filters.agencyId && item.agencyId !== filters.agencyId) {
      return false;
    }

    if (filters.instrumentIds && filters.instrumentIds.length > 0) {
      const hasAllInstruments = filters.instrumentIds.every((id) =>
        item.instrumentIds.includes(id)
      );
      if (!hasAllInstruments) return false;
    }

    if (minBudget !== null && !Number.isNaN(minBudget) && item.budgetMillions < minBudget) {
      return false;
    }

    if (maxBudget !== null && !Number.isNaN(maxBudget) && item.budgetMillions > maxBudget) {
      return false;
    }

    return true;
  });
}

export function sortMissions(items, sort) {
  const { sortBy, sortDir } = sort;
  const direction = sortDir === 'asc' ? 1 : -1;

  return [...items].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name, 'uk') * direction;
    }
    if (sortBy === 'launchDate') {
      return a.launchDate.localeCompare(b.launchDate) * direction;
    }
    if (sortBy === 'budgetMillions' || sortBy === 'durationDays') {
      return (Number(a[sortBy]) - Number(b[sortBy])) * direction;
    }
    return 0;
  });
}

export function paginateMissions(items, page, pageSize) {
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const startIdx = (currentPage - 1) * pageSize;
  const paginatedItems = items.slice(startIdx, startIdx + pageSize);

  return {
    paginatedItems,
    totalItems,
    totalPages,
    currentPage,
    displayStart: totalItems === 0 ? 0 : startIdx + 1,
    displayEnd: Math.min(startIdx + pageSize, totalItems),
  };
}
