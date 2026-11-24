import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  filterChanged,
  pageChanged,
  pageSizeChanged,
  searchChanged,
  sortChanged,
} from '../context/actions';
import {
  areArraysEqual,
  buildQueryParams,
  parseQueryParams,
} from '../utils/urlSync';
import { useDebounce } from './useDebounce';

export function useMissionQuerySync(state, dispatch) {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearch = searchParams.get('q') || '';
  const [searchInput, setSearchInput] = useState(urlSearch);
  const [prevUrlSearch, setPrevUrlSearch] = useState(urlSearch);
  const debouncedSearch = useDebounce(searchInput, 300);

  if (urlSearch !== prevUrlSearch) {
    setPrevUrlSearch(urlSearch);
    if (urlSearch !== debouncedSearch) {
      setSearchInput(urlSearch);
    }
  }

  const lastUrlRef = useRef(null);
  const skipNextStateToUrlRef = useRef(false);

  useEffect(() => {
    const currentUrlStr = searchParams.toString();
    if (lastUrlRef.current === currentUrlStr) return;
    lastUrlRef.current = currentUrlStr;

    const parsed = parseQueryParams(searchParams);
    let dispatched = false;

    if (parsed.search !== state.search) {
      dispatch(searchChanged(parsed.search));
      dispatched = true;
    }
    if (
      parsed.filters.agencyId !== state.filters.agencyId ||
      parsed.filters.budgetMin !== state.filters.budgetMin ||
      parsed.filters.budgetMax !== state.filters.budgetMax ||
      !areArraysEqual(parsed.filters.instrumentIds, state.filters.instrumentIds)
    ) {
      dispatch(filterChanged(parsed.filters));
      dispatched = true;
    }
    if (
      parsed.sort.sortBy !== state.sort.sortBy ||
      parsed.sort.sortDir !== state.sort.sortDir
    ) {
      dispatch(sortChanged(parsed.sort.sortBy, parsed.sort.sortDir));
      dispatched = true;
    }
    if (parsed.pageSize !== state.pageSize) {
      dispatch(pageSizeChanged(parsed.pageSize));
      dispatched = true;
    }
    if (parsed.page !== state.page) {
      dispatch(pageChanged(parsed.page));
      dispatched = true;
    }

    if (dispatched) {
      skipNextStateToUrlRef.current = true;
    }
  }, [searchParams, state, dispatch]);

  useEffect(() => {
    if (debouncedSearch !== state.search) {
      dispatch(searchChanged(debouncedSearch));
    }
  }, [debouncedSearch, state.search, dispatch]);

  useEffect(() => {
    if (skipNextStateToUrlRef.current) {
      skipNextStateToUrlRef.current = false;
      return;
    }
    const nextParams = buildQueryParams(state);
    const nextUrlStr = nextParams.toString();
    if (nextUrlStr !== searchParams.toString()) {
      lastUrlRef.current = nextUrlStr;
      setSearchParams(nextParams, { replace: true });
    }
  }, [state, searchParams, setSearchParams]);

  return { searchInput, setSearchInput };
}
