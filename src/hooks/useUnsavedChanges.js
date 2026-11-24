import { useEffect, useState } from 'react';
import { useBlocker } from 'react-router-dom';

export function useUnsavedChanges(isDirty, isBypassedRef) {
  const [showCancelModal, setShowCancelModal] = useState(false);

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      isDirty &&
      !isBypassedRef.current &&
      currentLocation.pathname !== nextLocation.pathname
  );

  useEffect(() => {
    if (!isDirty) return undefined;
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  return {
    blocker,
    showCancelModal,
    setShowCancelModal,
  };
}
