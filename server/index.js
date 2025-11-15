import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());

const headers = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
  Referer: "https://www.nseindia.com/",
  Accept: "application/json",
  "Accept-Language": "en-US,en;q=0.9",
  "Sec-Fetch-Mode": "cors",
  "Sec-Fetch-Site": "same-origin",
  Connection: "keep-alive"
};

async function fetchPrices() {
  const url = "https://www.nseindia.com/api/marketStatus";
  const res = await axios.get(url, { headers });

  const marketData = res.data?.marketState || [];

  let nifty50 = null;

  marketData.forEach((item) => {
    if (item.index === "NIFTY 50") nifty50 = item.last;
  });

  // Return only the nifty50 value
  return nifty50;
}

app.get("/api/index-prices", async (req, res) => {
  try {
    const nifty50 = await fetchPrices();
    console.log(nifty50);
    // Respond with an object containing the NIFTY 50 value
    res.json({ nifty50 });
  } catch (err) {
    console.log("ERROR:", err?.response?.status);
    res.status(500).json({ error: "Failed to fetch indices." });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
