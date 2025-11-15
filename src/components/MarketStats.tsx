import React, { useMemo } from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import type { StockData } from '../types/stock';

interface MarketStatsProps {
  stocks: StockData[];
}

const StatCard = ({
  title,
  value,
  Icon,
  tone,
}: {
  title: string;
  value: React.ReactNode;
  Icon: React.ComponentType<any>;
  tone: 'green' | 'red' | 'emerald';
}) => {
  const accents: Record<string, { glow: string; ring: string; iconColor: string; borderHover: string }> = {
    green: {
      glow: 'from-green-500/5 to-green-500/0',
      ring: 'ring-green-500/20',
      iconColor: 'text-green-500',
      borderHover: 'hover:border-green-500/30',
    },
    red: {
      glow: 'from-red-500/5 to-red-500/0',
      ring: 'ring-red-500/20',
      iconColor: 'text-red-500',
      borderHover: 'hover:border-red-500/30',
    },
    emerald: {
      glow: 'from-emerald-500/5 to-emerald-500/0',
      ring: 'ring-emerald-500/20',
      iconColor: 'text-emerald-500',
      borderHover: 'hover:border-emerald-500/30',
    },
  };

  const a = accents[tone];

  return (
    <div className="relative group">
      <div className={`absolute inset-0 bg-linear-to-br ${a.glow} rounded-lg opacity-0 group-hover:opacity-90 transition-opacity duration-250`} />
      <div className={`relative bg-(--bg-primary)/80 backdrop-blur-sm rounded-lg p-1 sm:p-2 border border-(--border-color) transition-all duration-200 ${a.borderHover} hover:shadow-sm`}>
        {/* compact: stack on xs, row on sm+ */}
        <div className="flex flex-col items-center sm:flex-row sm:items-center gap-2">
          <div className={`p-1 sm:p-2 rounded-lg ${a.ring} flex items-center justify-center`}>
            <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${a.iconColor}`} />
          </div>
          <div className="min-w-0 text-center sm:text-left">
            <p className="text-(--text-secondary) text-[9px] sm:text-xs font-semibold uppercase tracking-wider leading-none">{title}</p>
            <div className="text-(--text-primary) font-semibold text-sm sm:text-lg lg:text-xl tabular-nums truncate leading-tight">{value}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MarketStats = ({ stocks }: MarketStatsProps) => {
  const { gainers, losers, avg } = useMemo(() => {
    const acc = { gainers: 0, losers: 0, sum: 0 };
    for (let i = 0; i < stocks.length; i++) {
      const v = stocks[i].priceChangePercent ?? 0;
      if (v > 0) acc.gainers++;
      else if (v < 0) acc.losers++;
      acc.sum += v;
    }
    const avgVal = stocks.length ? +(acc.sum / stocks.length) : 0;
    return { gainers: acc.gainers, losers: acc.losers, avg: avgVal };
  }, [stocks]);

  const avgFormatted = avg.toFixed(2);
  const avgDisplay = `${avg >= 0 ? '+' : ''}${avgFormatted}%`;
  const avgTone: 'green' | 'red' | 'emerald' = avg >= 0 ? 'emerald' : 'red';

  return (
    <div className="bg-linear-to-br from-(--bg-secondary) to-(--bg-primary) border border-(--border-color) rounded-lg p-1 sm:p-2 md:p-2 mb-2 shadow-sm">


      <div className="grid grid-cols-3 gap-x-1 gap-y-1 sm:gap-x-3 sm:gap-y-2 md:gap-6">
        <StatCard title="Gainers" value={gainers} Icon={TrendingUp} tone="green" />
        <StatCard title="Losers" value={losers} Icon={TrendingDown} tone="red" />
        <StatCard title="Avg Change" value={avgDisplay} Icon={Activity} tone={avgTone} />
      </div>

      
    </div>
  );
};

export default MarketStats;
