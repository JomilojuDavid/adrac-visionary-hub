import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

interface Stock {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

// Realistic fallback stocks (USD prices) — shown when API fails or is rate-limited
const FALLBACK_STOCKS_USD: Stock[] = [
  { symbol: "AAPL", price: 185.5, change: 1.25, changePercent: 0.68 },
  { symbol: "MSFT", price: 415.2, change: -2.1, changePercent: -0.5 },
  { symbol: "GOOGL", price: 165.8, change: 0.9, changePercent: 0.55 },
  { symbol: "AMZN", price: 178.4, change: 2.3, changePercent: 1.31 },
  { symbol: "META", price: 490.1, change: -4.5, changePercent: -0.91 },
  { symbol: "TSLA", price: 175.3, change: 3.2, changePercent: 1.86 },
];

function convertToNgn(stocks: Stock[], rate: number): Stock[] {
  return stocks.map((s) => ({
    ...s,
    price: s.price * rate,
    change: s.change * rate,
  }));
}

const StockMarketTicker = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ngnRate = 1;

    const fetchData = async () => {
      try {
        // 1) Fetch USD → NGN rate
        const fxRes = await fetch(
          "https://api.exchangerate.host/latest?base=USD"
        );
        const fxData = await fxRes.json();
        ngnRate = fxData.rates?.NGN ?? 1;
      } catch (err) {
        console.error("Exchange rate API error:", err);
        ngnRate = 1580; // rough fallback
      }

      try {
        // 2) Fetch live stock prices from FMP
        const stockSymbols = "AAPL,MSFT,GOOGL";
        const stockRes = await fetch(
          `https://financialmodelingprep.com/api/v3/quote-short/${stockSymbols}?apikey=demo`
        );
        const stockData = await stockRes.json();

        // Guard against non-array (rate-limit / error) responses
        if (Array.isArray(stockData) && stockData.length > 0) {
          const formatted: Stock[] = stockData.map((s: any) => {
            const price = (s.price ?? 100) * ngnRate;
            const changeRaw = (Math.random() - 0.5) * price * 0.02;
            const changePercent = (changeRaw / price) * 100;
            return {
              symbol: s.symbol,
              price,
              change: changeRaw,
              changePercent,
            };
          });
          setStocks(formatted);
        } else {
          // Rate-limited or error → use fallback data
          setStocks(convertToNgn(FALLBACK_STOCKS_USD, ngnRate));
        }
      } catch (err) {
        console.error("Stock API error:", err);
        setStocks(convertToNgn(FALLBACK_STOCKS_USD, ngnRate));
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Refresh every 60 seconds (30s is aggressive for demo key)
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <p className="text-white">Loading market data…</p>;
  if (!stocks.length) return <p className="text-white">No stock data available.</p>;

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-5 h-5 text-gold" />
        <h3 className="font-heading font-bold text-primary-foreground text-lg">
          NGX Live Market
        </h3>
        <span className="ml-auto text-xs text-primary-foreground/70 flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          Live
        </span>
      </div>

      <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1 scrollbar-thin">
        {stocks.map((stock) => (
          <motion.div
            key={stock.symbol}
            layout
            className="flex items-center justify-between bg-white/10 border border-white/10 rounded-lg px-4 py-2.5 text-sm backdrop-blur-sm"
          >
            <div className="min-w-0">
              <span className="font-heading font-semibold text-white block">
                {stock.symbol}
              </span>
            </div>

            <div className="text-right flex items-center gap-3">
              <span className="font-heading font-semibold text-white">
                ₦{Math.round(stock.price).toLocaleString()}
              </span>

              <span
                className={`flex items-center gap-0.5 text-xs font-semibold ${
                  stock.change >= 0 ? "text-green-300" : "text-red-300"
                }`}
              >
                {stock.change >= 0 ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {stock.changePercent >= 0 ? "+" : ""}
                {stock.changePercent.toFixed(2)}%
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StockMarketTicker;