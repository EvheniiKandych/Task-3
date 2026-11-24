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

export const itemsLoaded = (items) => ({
  type: ITEMS_LOADED,
  payload: items,
});

export const itemCreated = (item) => ({
  type: ITEM_CREATED,
  payload: item,
});

export const itemUpdated = (item) => ({
  type: ITEM_UPDATED,
  payload: item,
});

export const itemDeleted = (id) => ({
  type: ITEM_DELETED,
  payload: id,
});

export const searchChanged = (search) => ({
  type: SEARCH_CHANGED,
  payload: search,
});

export const pageChanged = (page) => ({
  type: PAGE_CHANGED,
  payload: page,
});

export const pageSizeChanged = (pageSize) => ({
  type: PAGE_SIZE_CHANGED,
  payload: pageSize,
});

export const sortChanged = (sortBy, sortDir) => ({
  type: SORT_CHANGED,
  payload: { sortBy, sortDir },
});

export const filterChanged = (filtersPatch) => ({
  type: FILTER_CHANGED,
  payload: filtersPatch,
});

export const filtersReset = () => ({
  type: FILTERS_RESET,
});
