import { useContext } from 'react';
import { DataContext } from '../context/DataContext';

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('Хук useData() повинен викликатися виключно всередині DataProvider.');
  }
  return context;
}
