export interface Officer {
  rank: number;
  since: string;
  firstName: string;
  mI: string | null;
  lastName: string;
  age: string | null;
  title: {
    startYear: string;
    startMonth: string;
    startDay: string;
    iD1: string;
    abbr1: string;
    iD2: string;
    abbr2: string;
    Value: string;
  };
}

export interface PeerCompany {
  tickerId: string;
  companyName: string;
  priceToBookValueRatio: number;
  priceToEarningsValueRatio: number;
  marketCap: number;
  price: number;
  percentChange: number;
  netChange: number;
  returnOnAverageEquity5YearAverage: number;
  returnOnAverageEquityTrailing12Month: number;
  ltDebtPerEquityMostRecentFiscalYear: number;
  netProfitMargin5YearAverage: number;
  netProfitMarginPercentTrailing12Month: number;
  dividendYieldIndicatedAnnualDividend: number;
  totalSharesOutstanding: number;
  languageSupport: string;
  imageUrl: string;
  overallRating: string;
  yhigh: number;
  ylow: number;
}

export interface CompanyProfile {
  companyDescription: string;
  mgIndustry: string;
  isInId: string;
  officers: {
    officer: Officer[];
  };
  exchangeCodeBse: string;
  exchangeCodeNse: string;
  peerCompanyList: PeerCompany[];
}

export interface CurrentPrice {
  BSE: string;
  NSE: string;
}

export interface StockTechnicalData {
  days: number;
  bsePrice: string;
  nsePrice: string;
}

export interface FinancialItem {
  displayName: string;
  key: string;
  value: string;
  qoQComp: string | null;
  yqoQComp: string | null;
}

export interface StockFinancialMap {
  CAS?: FinancialItem[];
  BAL?: FinancialItem[];
  INC?: FinancialItem[];
}

export interface Financial {
  stockFinancialMap: StockFinancialMap;
  FiscalYear: string;
  EndDate: string;
  Type: string;
  StatementDate: string;
  fiscalPeriodNumber: number;
}

export interface ApiStockResponse {
  companyName: string;
  industry: string;
  companyProfile: CompanyProfile;
  currentPrice: CurrentPrice;
  stockTechnicalData: StockTechnicalData[];
  percentChange: string;
  yearHigh: string;
  yearLow: string;
  financials: Financial[];
}

export interface StockData {
  name: string;
  symbol: string;
  currentPrice: number;
  priceChange: number;
  priceChangePercent: number;
  yearHigh: number;
  yearLow: number;
  marketCap?: number;
  imageUrl?: string;
  industry?: string;
  lastUpdated?: string;
}
