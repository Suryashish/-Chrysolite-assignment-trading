import { useState, useEffect, useCallback } from 'react';
import { RefreshCw, Sun, Moon } from 'lucide-react';
import StockCard from './components/StockCard';
import SearchBar from './components/SearchBar';
import MarketStats from './components/MarketStats';
import Sidebar from './components/Sidebar';
import MobileHeader from './components/MobileHeader';
import { fetchStockData, transformStockData, fetchIndexPrices } from './services/stockApi';
import type { StockData } from './types/stock';
import { useTheme } from './hooks/useTheme';
import './App.css';

const DEFAULT_STOCKS = [
  { name: 'NIFTY 50', symbol: 'NIFTY 50' },
  { name: 'Reliance Industries', symbol: 'RELIANCE' },
  { name: 'Tata Consultancy Services', symbol: 'TCS' },
  { name: 'HDFC Bank', symbol: 'HDFCBANK' },
];

function App() {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(window.innerWidth < 1024);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();



  const createFallback = (name: string, symbol: string, price = 0): StockData => ({
    name, symbol, currentPrice: price, priceChange: 0, priceChangePercent: 0,
    yearHigh: price, yearLow: price, lastUpdated: new Date().toISOString(),
  });



  const fetchStock = async ({ name, symbol }: typeof DEFAULT_STOCKS[0]): Promise<StockData> => {
    if (symbol === 'NIFTY 50') {
      const indexPrices = await fetchIndexPrices().catch(() => null);
      const price = indexPrices?.nifty50 ?? 0;
      return createFallback(name, symbol, price);
    }
    const data = await fetchStockData(name).catch(() => null);
    return data ? transformStockData(data) : createFallback(name, symbol);
  };

  const loadStocks = useCallback(async () => {
    setError(null);
    setRefreshing(true);
    try {
      const results = await Promise.all(DEFAULT_STOCKS.map(fetchStock));
      setStocks(results);
    } catch {
      setError('Failed to load stocks');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);



  const handleSearch = useCallback(async (term: string) => {
    const trimmed = term.trim();
    if (!trimmed || stocks.some(s => s.name.toLowerCase() === trimmed.toLowerCase() || 
        s.symbol.toLowerCase() === trimmed.toLowerCase())) {
      setError(trimmed ? 'Stock already displayed' : '');
      return;
    }

    setSearching(true);
    setError(null);

    try {
      const newStock = await fetchStock({ name: trimmed, symbol: trimmed.toUpperCase() });
      setStocks(prev => [newStock, ...prev]);
      setSearchTerm('');
    } catch {
      setError('Stock not found');
    } finally {
      setSearching(false);
    }
  }, [stocks]);


  useEffect(() => { loadStocks(); }, [loadStocks]);
  useEffect(() => { if (error) setTimeout(() => setError(null), 5000); }, [error]);

  const filtered = stocks.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const SKELETON_COUNT = 4;
  const renderSkeletonCards = () => {
    const items = Array.from({ length: SKELETON_COUNT });
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 mt-6">
        {items.map((_, idx) => (
          <div
            key={idx}
            className="bg-(--card-bg)er border-(--border-color)ded-2xl p-6 lg:p-7 shadow-sm animate-pulse"
            style={{
              boxShadow: '0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.02)',
              borderRadius: '16px',
            }}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-12 h-12 rounded-lg bg-(--skeleton-bg) shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="h-4 bg-(--skeleton-bg)ded w-32 mb-2" />
                  <div className="h-3 bg-(--skeleton-bg) rounded w-24" />
                </div>
              </div>

              <div className="flex flex-col items-end shrink-0">
                <div className="h-6 bg-(--skeleton-bg) rounded w-24 mb-2" />
                <div className="h-4 bg-(--skeleton-bg) rounded w-20" />
              </div>
            </div>

            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <div className="h-3 bg-(--skeleton-bg) rounded w-20" />
                <div className="h-3 bg-(--skeleton-bg) rounded w-24" />
              </div>

              <div className="w-full h-2 bg-(--skeleton-bar) rounded-full overflow-hidden border border-(--border-color)">
                <div className="h-full bg-neutral-700 dark:bg-neutral-700 light:bg-neutral-400" style={{ width: '40%' }} />
              </div>

              <div className="flex items-center justify-between mt-2 text-xs text-(--text-tertiary)">
                <div className="h-3 bg-(--skeleton-bg) rounded w-8" />
                <div className="h-3 bg-(--skeleton-bg) rounded w-8" />
                <div className="h-3 bg-(--skeleton-bg) rounded w-8" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-(--bg-primary)">
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden" 
             onClick={() => setIsMobileMenuOpen(false)} />
      )}

      <Sidebar {...{ sidebarCollapsed, setSidebarCollapsed, isMobileMenuOpen, setIsMobileMenuOpen, theme, toggleTheme }} />

      <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
        <MobileHeader {...{ isMobileMenuOpen, setIsMobileMenuOpen, theme, toggleTheme }} />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          <header className="mb-6 lg:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-(--text-primary) mb-1">Market Overview</h1>
              <p className="text-sm lg:text-base text-(--text-secondary)">Real-time market data and insights</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="hidden lg:flex items-center gap-2 bg-(--card-bg) dark:hover:bg-neutral-700 hover:bg-neutral-200 border border-(--border-color) text-(--text-primary) px-4 lg:px-5 py-2 lg:py-2.5 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-(--bg-primary)"
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    <Moon className="h-4 w-4" />
                  </>
                )}
              </button>
              <button
                onClick={loadStocks}
                disabled={refreshing || loading}
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white px-4 lg:px-5 py-2 lg:py-2.5 rounded-lg font-medium transition-all disabled:opacity-50 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-(--bg-primary)"
              >
                <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
              </button>
            </div>
          </header>

          <SearchBar {...{ searchTerm, onSearchChange: setSearchTerm, onSearchSubmit: handleSearch, isSearching: searching }} />

          {loading || refreshing ? (
            // show per-card skeletons instead of a single spinner
            renderSkeletonCards()
          ) : (
            <>
              {/* add gap between search and market stats */}
              {stocks.length > 0 && (
                <div className="mt-6 sm:mt-8">
                  <MarketStats stocks={stocks} />
                </div>
              )}
              {filtered.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 mt-6">
                  {filtered.map(stock => <StockCard key={`${stock.symbol}-${stock.name}`} stock={stock} />)}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-800 dark:bg-neutral-800/50 light:bg-neutral-200/50 mb-4">
                    <svg className="w-8 h-8 text-(--text-tertiary)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <p className="text-(--text-secondary) text-lg">No stocks found matching "<span className="text-(--text-primary) font-medium">{searchTerm}</span>"</p>
                  <p className="text-(--text-tertiary) text-sm mt-2">Try a different stock symbol or name</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;