import axios from 'axios';
import type { ApiStockResponse, StockData } from '../types/stock';

const API_BASE_URL = 'https://stock.indianapi.in';
const API_KEY = import.meta.env.VITE_INDIAN_API_KEY;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'X-Api-Key': API_KEY,
  },
});


// Formats the stock name for API query (replaces spaces with +)

const formatStockQuery = (stockName: string): string => {
  return stockName.trim().replace(/\s+/g, '+');
};


// Transforms the API response to StockData format

export const transformStockData = (apiResponse: ApiStockResponse): StockData => {
  const currentPrice = parseFloat(apiResponse.currentPrice.NSE || apiResponse.currentPrice.BSE);
  const percentChange = parseFloat(apiResponse.percentChange);
  const yearHigh = parseFloat(apiResponse.yearHigh);
  const yearLow = parseFloat(apiResponse.yearLow);

  const priceChange = (currentPrice * percentChange) / 100;

  const marketCap = apiResponse.companyProfile.peerCompanyList?.[0]?.marketCap;
  const imageUrl = apiResponse.companyProfile.peerCompanyList?.[0]?.imageUrl;

  return {
    name: apiResponse.companyName,
    symbol: apiResponse.companyProfile.exchangeCodeNse || apiResponse.companyProfile.exchangeCodeBse,
    currentPrice,
    priceChange,
    priceChangePercent: percentChange,
    yearHigh,
    yearLow,
    marketCap,
    imageUrl,
    industry: apiResponse.industry,
    lastUpdated: new Date().toISOString(),
  };
};

export const fetchStockData = async (stockName: string): Promise<ApiStockResponse> => {
  try {
    const formattedQuery = formatStockQuery(stockName);
    const { data } = await apiClient.get('/stock', {
      params: { name: formattedQuery },
    });
    return data;
  } catch (error) {
    console.error(`Error fetching data for ${stockName}:`, error);
    throw error;
  }
};

export const fetchPriceShockers = async (): Promise<any> => {
  try {
    const { data } = await apiClient.get('/price_shockers');
    return data;
  } catch (error) {
    console.error('Error fetching price shockers:', error);
    throw error;
  }
};

export const fetch52WeekHighLow = async (): Promise<any> => {
  try {
    const { data } = await apiClient.get('/fetch_52_week_high_low_data');
    return data;
  } catch (error) {
    console.error('Error fetching 52 week high/low data:', error);
    throw error;
  }
};


export const fetchIndexPrices = async (): Promise<{ nifty50: number; bankNifty: number }> => {
  try {
    const { data } = await axios.get('http://localhost:5000/api/index-prices');

    return data;
  } catch (error) {
    console.error('Error fetching index prices from local endpoint:', error);
    throw error;
  }
};

