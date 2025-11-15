import { useEffect } from 'react';
import { TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (v: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (v: boolean) => void;
}

export default function Sidebar({
  sidebarCollapsed,
  setSidebarCollapsed,
  isMobileMenuOpen,
}: Props) {
  useEffect(() => {
    if (isMobileMenuOpen) {
      setSidebarCollapsed(false);
    }
  }, [isMobileMenuOpen, setSidebarCollapsed]);

  return (
    <aside className={`fixed left-0 top-0 h-screen bg-(--bg-secondary) border-r border-(--border-color) flex flex-col transition-all duration-300 ease-in-out z-40 shadow-[2px_0_4px_rgba(0,0,0,0.1)] ${
      isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
    } lg:translate-x-0 ${sidebarCollapsed ? 'w-20' : 'w-64'}`}>
      {/* Logo section */}
      <div className="p-3 lg:p-5 border-b border-(--border-color)">
        {sidebarCollapsed ? (
          <div className="flex flex-col items-center gap-3 lg:gap-4">
            <TrendingUp className="h-5 w-5 lg:h-6 lg:w-6 text-emerald-500" />
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1.5 rounded-lg text-(--text-tertiary) dark:hover:bg-neutral-600 hover:bg-neutral-100 hover:text-(--text-primary) transition-all"
              title="Expand sidebar"
              aria-label="Expand sidebar"
            >
              <ChevronRight className="h-4 w-4 lg:h-5 lg:w-5" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 lg:h-6 lg:w-6 text-emerald-500 shrink-0" />
                <h1 className="text-lg lg:text-xl font-bold text-(--text-primary) whitespace-nowrap">StockTracker</h1>
              </div>
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hidden lg:block p-1.5 rounded-lg text-(--text-tertiary) dark:hover:bg-neutral-600 hover:bg-neutral-100 hover:text-(--text-primary) transition-all shrink-0"
                title="Collapse sidebar"
                aria-label="Collapse sidebar"
              >
                <ChevronLeft className="h-4 w-4 lg:h-5 lg:w-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Navigation section */}
      <nav className="flex-1 p-2 lg:p-3">
        <ul className="space-y-2">
          <li>
            <div className={`w-full flex items-center gap-3 px-3 py-2.5 lg:px-4 lg:py-3 rounded-lg bg-emerald-500/10 text-emerald-500 transition-all ${
              sidebarCollapsed ? 'justify-center' : ''
            }`}>
              <TrendingUp className="h-4 w-4 lg:h-5 lg:w-5 shrink-0" />
              {!sidebarCollapsed && (
                <span className="text-sm lg:text-base font-medium whitespace-nowrap">
                  Market Overview
                </span>
              )}
            </div>
          </li>
        </ul>
      </nav>

      {/* Footer info */}
      {!sidebarCollapsed && (
        <div className="px-3 lg:px-4 pb-3 lg:pb-4 border-t border-(--border-color) pt-3 lg:pt-4">
          <p className="text-sm text-(--text-tertiary) whitespace-nowrap">
            Last updated: {new Date().toLocaleTimeString()}
          </p>
        </div>
      )}
    </aside>
  );
}
