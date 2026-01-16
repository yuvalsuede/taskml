/**
 * useTheme - Theme management with system preference detection
 */

import { useEffect } from 'react';
import { usePreviewStore } from '../stores/preview-store';
import { usePrefersDarkMode } from './useMediaQuery';

export function useTheme() {
  const theme = usePreviewStore((s) => s.theme);
  const setTheme = usePreviewStore((s) => s.setTheme);
  const resolvedTheme = usePreviewStore((s) => s.resolvedTheme);
  const setResolvedTheme = usePreviewStore((s) => s.setResolvedTheme);

  const prefersDark = usePrefersDarkMode();

  // Resolve 'auto' theme based on system preference
  useEffect(() => {
    if (theme === 'auto') {
      setResolvedTheme(prefersDark ? 'dark' : 'light');
    } else {
      setResolvedTheme(theme);
    }
  }, [theme, prefersDark, setResolvedTheme]);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    if (resolvedTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [resolvedTheme]);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('auto');
    } else {
      setTheme('light');
    }
  };

  return {
    theme,
    setTheme,
    resolvedTheme,
    toggleTheme,
    isDark: resolvedTheme === 'dark',
  };
}
