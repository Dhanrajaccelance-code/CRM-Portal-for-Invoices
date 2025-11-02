import { useState, useCallback } from 'react';

interface SnackbarState {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
}

export const useSnackbar = () => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'info',
  });

  const showSnackbar = useCallback(
    (message: string, severity: 'success' | 'error' | 'warning' | 'info' = 'info') => {
      setSnackbar({
        open: true,
        message,
        severity,
      });
    },
    []
  );

  const hideSnackbar = useCallback(() => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  }, []);

  return {
    snackbar,
    showSnackbar,
    hideSnackbar,
  };
};
