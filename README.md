# Trading App (React + TypeScript + Vite)


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

