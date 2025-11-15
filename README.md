# Trading App (React + TypeScript + Vite)
## Approach
It uses React with Typescript and tailwind for the styling. The app fetches stock data from Indian API (https://indianapi.in/indian-stock-market) using Axios and displays it in a responsive grid layout. The app also includes features like search, loading states, error handling, and theme toggling (dark/light mode). It structurallly organizeses the response from the API and with proper logic structures the data and displays it. It uses hook for the theme management and services for the API calls. The app is optimized for mobile devices and provides a clean and user-friendly interface. The code is modular and easy to maintain.

## Install
1. Clone the repo and open the project:
   ```bash
   git clone <repo-url>
   cd tradingapp
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

## Environment
Create a `.env` file in the project root and add your Indian API key:

```env
VITE_INDIAN_API_KEY=your_api_key_here
```

Obtain an API key from: https://indianapi.in/indian-stock-market

## Run (development)
Start the Vite dev server:
```bash
npm run dev
# or
pnpm dev
```
Open the URL shown in the terminal (usually http://localhost:5173).

## Optional: NIFTY 50 value (local server)
If you want the app to fetch NIFTY 50 via the included local server:
```bash
cd server
npm install
npm run dev
```
This local server is optional. The app will run without it but may not display NIFTY50-related features if the server is not running.

