import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { AGENCIES, INITIAL_MISSIONS, INSTRUMENTS } from '../data/seedData';
import { itemsLoaded } from './actions';
import { DataContext } from './DataContext';
import {
  dataReducer,
  DEFAULT_FILTERS,
  DEFAULT_PAGE_SIZE,
  DEFAULT_SORT,
} from './dataReducer';

const STORAGE_KEY = 'astrolog_missions_v1';

function loadStoredMissions() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_MISSIONS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_MISSIONS;
  } catch {
    return INITIAL_MISSIONS;
  }
}

function createInitialState() {
  return {
    items: loadStoredMissions(),
    agencies: AGENCIES,
    instruments: INSTRUMENTS,
    search: '',
    filters: { ...DEFAULT_FILTERS, instrumentIds: [] },
    sort: { ...DEFAULT_SORT },
    page: 1,
    pageSize: DEFAULT_PAGE_SIZE,
  };
}

export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(dataReducer, undefined, createInitialState);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // Ignore quota exceeded errors gracefully
    }
  }, [state.items]);

  useEffect(() => {
    const handleStorageSync = (event) => {
      if (event.key !== STORAGE_KEY || !event.newValue) return;
      try {
        const parsed = JSON.parse(event.newValue);
        if (Array.isArray(parsed)) {
          dispatch(itemsLoaded(parsed));
        }
      } catch {
        // Ignore malformed external storage payloads
      }
    };

    window.addEventListener('storage', handleStorageSync);
    return () => window.removeEventListener('storage', handleStorageSync);
  }, []);

  const resetDemoData = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage access errors
    }
    dispatch(itemsLoaded(INITIAL_MISSIONS));
  }, []);

  const value = useMemo(
    () => ({
      state,
      dispatch,
      resetDemoData,
    }),
    [state, resetDemoData]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
