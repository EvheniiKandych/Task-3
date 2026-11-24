import {
  DEFAULT_FILTERS,
  DEFAULT_PAGE_SIZE,
  DEFAULT_SORT,
} from '../context/dataReducer';
import { SORT_FIELDS } from './missionFilters';

const VALID_PAGE_SIZES = [6, 12, 24];
const VALID_SORT_FIELDS = new Set(SORT_FIELDS.map((field) => field.value));

export function parseQueryParams(searchParams) {
  const search = searchParams.get('q') || '';
  const agencyId = searchParams.get('agency') || '';
  const instrumentsRaw = searchParams.get('instruments') || '';
  const instrumentIds = instrumentsRaw
    ? instrumentsRaw.split(',').filter(Boolean)
    : [];
  const budgetMin = searchParams.get('budgetMin') || '';
  const budgetMax = searchParams.get('budgetMax') || '';

  const rawSortBy = searchParams.get('sortBy');
  const sortBy = VALID_SORT_FIELDS.has(rawSortBy) ? rawSortBy : DEFAULT_SORT.sortBy;
  const rawSortDir = searchParams.get('sortDir');
  const sortDir =
    rawSortDir === 'asc' || rawSortDir === 'desc' ? rawSortDir : DEFAULT_SORT.sortDir;

  const rawPage = Number(searchParams.get('page'));
  const page = Number.isInteger(rawPage) && rawPage >= 1 ? rawPage : 1;

  const rawPageSize = Number(searchParams.get('pageSize'));
  const pageSize = VALID_PAGE_SIZES.includes(rawPageSize)
    ? rawPageSize
    : DEFAULT_PAGE_SIZE;

  return {
    search,
    filters: {
      agencyId,
      instrumentIds,
      budgetMin,
      budgetMax,
    },
    sort: {
      sortBy,
      sortDir,
    },
    page,
    pageSize,
  };
}

export function buildQueryParams(state) {
  const params = new URLSearchParams();

  if (state.search.trim()) {
    params.set('q', state.search.trim());
  }
  if (state.filters.agencyId) {
    params.set('agency', state.filters.agencyId);
  }
  if (state.filters.instrumentIds.length > 0) {
    params.set('instruments', state.filters.instrumentIds.join(','));
  }
  if (state.filters.budgetMin !== '') {
    params.set('budgetMin', state.filters.budgetMin);
  }
  if (state.filters.budgetMax !== '') {
    params.set('budgetMax', state.filters.budgetMax);
  }
  if (state.sort.sortBy !== DEFAULT_SORT.sortBy) {
    params.set('sortBy', state.sort.sortBy);
  }
  if (state.sort.sortDir !== DEFAULT_SORT.sortDir) {
    params.set('sortDir', state.sort.sortDir);
  }
  if (state.page > 1) {
    params.set('page', String(state.page));
  }
  if (state.pageSize !== DEFAULT_PAGE_SIZE) {
    params.set('pageSize', String(state.pageSize));
  }

  return params;
}

export function areArraysEqual(a, b) {
  if (a.length !== b.length) return false;
  return a.every((val, index) => val === b[index]);
}

export function hasActiveFilters(search, filters) {
  return (
    Boolean(search.trim()) ||
    filters.agencyId !== DEFAULT_FILTERS.agencyId ||
    filters.instrumentIds.length > 0 ||
    filters.budgetMin !== '' ||
    filters.budgetMax !== ''
  );
}
