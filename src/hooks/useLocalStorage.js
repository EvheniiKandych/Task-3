import { useCallback, useState } from 'react';

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        return JSON.parse(item);
      }
      return typeof initialValue === 'function' ? initialValue() : initialValue;
    } catch {
      return typeof initialValue === 'function' ? initialValue() : initialValue;
    }
  });

  const setValue = useCallback(
    (valueOrUpdater) => {
      setStoredValue((prev) => {
        const nextValue =
          typeof valueOrUpdater === 'function' ? valueOrUpdater(prev) : valueOrUpdater;
        try {
          window.localStorage.setItem(key, JSON.stringify(nextValue));
        } catch {
          // Ignore storage quota errors
        }
        return nextValue;
      });
    },
    [key]
  );

  return [storedValue, setValue];
}
