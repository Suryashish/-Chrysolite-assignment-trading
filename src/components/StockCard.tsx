import { TrendingUp, TrendingDown, Building2 } from 'lucide-react';
import type { StockData } from '../types/stock';

interface StockCardProps {
  stock: StockData;
}

const StockCard = ({ stock }: StockCardProps) => {
  const isPositive = stock.priceChangePercent >= 0;

  // 52-week progress percent from low -> high (0..100)
  const get52Progress = () => {
    if (!stock.yearHigh || !stock.yearLow) return 0;
    if (stock.yearHigh === stock.yearLow) return 100;
    const pos = ((stock.currentPrice - stock.yearLow) / (stock.yearHigh - stock.yearLow)) * 100;
    return Math.max(0, Math.min(100, pos));
  };

  const progress = get52Progress();

  return (
    <div
      className="bg-(--card-bg) border border-(--border-color) rounded-2xl p-6 lg:p-7 hover:border-neutral-700 dark:hover:border-neutral-700 light:hover:border-neutral-400 transition-all hover:shadow-lg hover:shadow-emerald-500/5 group shadow-sm"
      style={{
        boxShadow: '0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.02)',
        borderRadius: '16px',
      }}
    >



      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 min-w-0">
          {stock.imageUrl ? (
            <img
              src={stock.imageUrl}
              alt={stock.name}
              className="w-12 h-12 rounded-lg object-contain bg-white p-1.5 shrink-0 shadow-sm"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          <div
            className={`w-12 h-12 rounded-lg bg-neutral-800 dark:bg-neutral-800 light:bg-neutral-200 flex items-center justify-center shrink-0 ${stock.imageUrl ? 'hidden' : ''}`}
          >
            <Building2 className="h-6 w-6 text-neutral-400 dark:text-neutral-400 light:text-neutral-500" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-(--text-primary) font-semibold text-sm lg:text-base truncate">
                {stock.name}
              </h3>
            </div>
            <p className="text-(--text-secondary) text-xs lg:text-sm truncate">
              {stock.symbol} • <span className="text-(--text-tertiary)">{stock.industry ?? '—'}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end shrink-0">
          <span className="text-(--text-primary) text-lg lg:text-2xl font-bold leading-tight">
            ₹{stock.currentPrice.toLocaleString('en-IN', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>

          <div className="mt-1 flex items-center space-x-2">
            <div className={`flex items-center gap-2 px-2 py-1 rounded-full text-xs font-semibold ${
              isPositive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
            }`}>
              {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              <span>
                {isPositive ? '+' : ''}{stock.priceChangePercent.toFixed(2)}%
              </span>
            </div>

            <div className="text-(--text-secondary) text-xs">
              {isPositive ? '+' : ''}₹{Math.abs(stock.priceChange).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
        </div>
      </div>


      {stock.yearHigh && stock.yearLow ? (
        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <div className="text-(--text-tertiary) text-xs">52W Range</div>
            <div className="text-(--text-secondary) text-xs">{`₹${stock.yearLow.toLocaleString('en-IN', { maximumFractionDigits: 2 })} — ₹${stock.yearHigh.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`}</div>
          </div>

          <div className="w-full h-2 bg-neutral-800 dark:bg-neutral-800 light:bg-neutral-200 rounded-full overflow-hidden border border-(--border-color)">
            <div
              className="h-full bg-emerald-500"
              style={{ width: `${progress}%`, transition: 'width 400ms ease' }}
            />
          </div>

          <div className="flex items-center justify-between mt-2 text-xs text-(--text-tertiary)">
            <span>Low</span>
            <span className="text-(--text-secondary)">{progress.toFixed(0)}%</span>
            <span className="ml-auto">High</span>
          </div>
        </div>
      ) : null}

    </div>
  );
};

export default StockCard;
