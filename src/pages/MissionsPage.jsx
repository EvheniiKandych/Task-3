import { useCallback, useMemo, useState } from 'react';
import { ConfirmModal } from '../components/Common/ConfirmModal';
import { EmptyState } from '../components/Missions/EmptyState';
import { MissionFilters } from '../components/Missions/MissionFilters';
import { MissionGrid } from '../components/Missions/MissionGrid';
import { MissionTable } from '../components/Missions/MissionTable';
import { MissionToolbar } from '../components/Missions/MissionToolbar';
import { Pagination } from '../components/Missions/Pagination';
import {
  filterChanged,
  filtersReset,
  itemDeleted,
  pageChanged,
  pageSizeChanged,
  searchChanged,
  sortChanged,
} from '../context/actions';
import { useData } from '../hooks/useData';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useMissionQuerySync } from '../hooks/useMissionQuerySync';
import {
  filterMissions,
  paginateMissions,
  sortMissions,
} from '../utils/missionFilters';
import { hasActiveFilters } from '../utils/urlSync';
import styles from './MissionsPage.module.css';

export function MissionsPage() {
  useDocumentTitle('Каталог місій');
  const { state, dispatch } = useData();
  const [viewMode, setViewMode] = useLocalStorage('astrolog_view_mode', 'grid');
  const [missionToDelete, setMissionToDelete] = useState(null);
  const { searchInput, setSearchInput } = useMissionQuerySync(state, dispatch);

  const agencyMap = useMemo(
    () => Object.fromEntries(state.agencies.map((a) => [a.id, a])),
    [state.agencies]
  );

  const instrumentMap = useMemo(
    () => Object.fromEntries(state.instruments.map((i) => [i.id, i])),
    [state.instruments]
  );

  const filteredAndSorted = useMemo(() => {
    const filtered = filterMissions(state.items, state.search, state.filters);
    return sortMissions(filtered, state.sort);
  }, [state.items, state.search, state.filters, state.sort]);

  const pagination = useMemo(
    () => paginateMissions(filteredAndSorted, state.page, state.pageSize),
    [filteredAndSorted, state.page, state.pageSize]
  );

  const filtersActive = useMemo(
    () => hasActiveFilters(state.search, state.filters),
    [state.search, state.filters]
  );

  const handleResetFilters = useCallback(() => {
    setSearchInput('');
    dispatch(filtersReset());
  }, [setSearchInput, dispatch]);

  const handleClearSearch = useCallback(() => {
    setSearchInput('');
    dispatch(searchChanged(''));
  }, [setSearchInput, dispatch]);

  return (
    <div>
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.title}>Каталог космічних місій</h1>
          <p className={styles.subtitle}>
            Пошук, фільтрація за агентствами й приладами, сортування та керування записами.
          </p>
        </div>
        <div className={styles.countPill}>
          Знайдено: <strong>{pagination.totalItems}</strong> з {state.items.length}
        </div>
      </div>

      <MissionToolbar
        searchValue={searchInput}
        onSearchChange={setSearchInput}
        onClearSearch={handleClearSearch}
        sort={state.sort}
        onSortChange={(sortBy, sortDir) => dispatch(sortChanged(sortBy, sortDir))}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <MissionFilters
        agencies={state.agencies}
        instruments={state.instruments}
        filters={state.filters}
        hasActive={filtersActive}
        onFilterChange={(patch) => dispatch(filterChanged(patch))}
        onResetFilters={handleResetFilters}
      />

      {pagination.totalItems === 0 ? (
        <EmptyState hasFilters={filtersActive} onResetFilters={handleResetFilters} />
      ) : viewMode === 'grid' ? (
        <MissionGrid
          missions={pagination.paginatedItems}
          agencyMap={agencyMap}
          instrumentMap={instrumentMap}
          onRequestDelete={setMissionToDelete}
        />
      ) : (
        <MissionTable
          missions={pagination.paginatedItems}
          agencyMap={agencyMap}
          onRequestDelete={setMissionToDelete}
        />
      )}

      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        pageSize={state.pageSize}
        totalItems={pagination.totalItems}
        displayStart={pagination.displayStart}
        displayEnd={pagination.displayEnd}
        onPageChange={(page) => dispatch(pageChanged(page))}
        onPageSizeChange={(size) => dispatch(pageSizeChanged(size))}
      />

      <ConfirmModal
        isOpen={Boolean(missionToDelete)}
        title="Видалення місії"
        message={`Ви дійсно хочете видалити місію «${missionToDelete?.name || ''}»? Цю дію неможливо скасувати.`}
        confirmLabel="Видалити"
        cancelLabel="Скасувати"
        variant="danger"
        onConfirm={() => {
          if (missionToDelete) {
            dispatch(itemDeleted(missionToDelete.id));
            setMissionToDelete(null);
          }
        }}
        onCancel={() => setMissionToDelete(null)}
      />
    </div>
  );
}
