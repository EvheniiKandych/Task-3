import {
  FILTER_CHANGED,
  FILTERS_RESET,
  ITEM_CREATED,
  ITEM_DELETED,
  ITEM_UPDATED,
  ITEMS_LOADED,
  PAGE_CHANGED,
  PAGE_SIZE_CHANGED,
  SEARCH_CHANGED,
  SORT_CHANGED,
} from './actionTypes';

export const DEFAULT_FILTERS = {
  agencyId: '',
  instrumentIds: [],
  budgetMin: '',
  budgetMax: '',
};

export const DEFAULT_SORT = {
  sortBy: 'launchDate',
  sortDir: 'desc',
};

export const DEFAULT_PAGE_SIZE = 6;

export function dataReducer(state, action) {
  switch (action.type) {
    case ITEMS_LOADED:
      return {
        ...state,
        items: [...action.payload],
      };

    case ITEM_CREATED:
      return {
        ...state,
        items: [action.payload, ...state.items],
        page: 1,
      };

    case ITEM_UPDATED:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? { ...action.payload } : item
        ),
      };

    case ITEM_DELETED:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case SEARCH_CHANGED:
      return {
        ...state,
        search: action.payload,
        page: 1,
      };

    case FILTER_CHANGED:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload,
        },
        page: 1,
      };

    case FILTERS_RESET:
      return {
        ...state,
        search: '',
        filters: { ...DEFAULT_FILTERS, instrumentIds: [] },
        sort: { ...DEFAULT_SORT },
        page: 1,
      };

    case SORT_CHANGED:
      return {
        ...state,
        sort: {
          sortBy: action.payload.sortBy,
          sortDir: action.payload.sortDir,
        },
        page: 1,
      };

    case PAGE_CHANGED:
      return {
        ...state,
        page: action.payload,
      };

    case PAGE_SIZE_CHANGED:
      return {
        ...state,
        pageSize: action.payload,
        page: 1,
      };

    default:
      return state;
  }
}
