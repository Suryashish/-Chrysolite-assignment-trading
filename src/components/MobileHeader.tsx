import { TrendingUp, Sun, Moon } from 'lucide-react';
import type { Theme } from '../hooks/useTheme';

interface Props {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (v: boolean) => void;
  theme: Theme;
  toggleTheme: () => void;
}

export default function MobileHeader({ isMobileMenuOpen, setIsMobileMenuOpen, theme, toggleTheme }: Props) {
  return (
    <div className="lg:hidden sticky top-0 z-20 bg-(--bg-secondary) border-b border-(--border-color) px-4 py-3 flex items-center justify-between">
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="p-2 rounded-lg text-(--text-tertiary) hover:bg-neutral-800 dark:hover:bg-neutral-800 light:hover:bg-neutral-100 hover:text-(--text-primary) transition-all"
        aria-label="Toggle menu"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <div className="flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-emerald-500" />
        <h1 className="text-lg font-bold text-(--text-primary)">StockTracker</h1>
      </div>
      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg text-(--text-tertiary) hover:bg-neutral-800 dark:hover:bg-neutral-800 light:hover:bg-neutral-100 hover:text-(--text-primary) transition-all"
        title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        {theme === 'dark' ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </button>
    </div>
  );
}
