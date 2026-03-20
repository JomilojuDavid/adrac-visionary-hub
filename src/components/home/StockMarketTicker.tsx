import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

interface Stock {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

// Helper to calculate fake change values
function calculateChange(price: number) {
  const change = (Math.random() - 0.5) * price * 0.02;
  const changePercent = (change / price) * 100;
  return { change, changePercent };
}

const StockMarketTicker = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [exchangeRate, setExchangeRate] = useState<number>(1); // USD->NGN

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        // 1) Fetch stock prices from FMP
        const stockSymbols = "AAPL,MSFT,GOOG"; // You can customize
        const stockRes = await fetch(
          `https://financialmodelingprep.com/api/v3/quote-short/${stockSymbols}?apikey=demo`
        );
        const stockData = await stockRes.json();

        // Format stocks into your shape
        const formattedStocks: Stock[] = stockData.map((s: any) => {
          const { change, changePercent } = calculateChange(s.price);
          return {
            symbol: s.symbol,
            price: s.price * exchangeRate, // convert to NGN if needed
            change,
            changePercent,
          };
        });

        setStocks(formattedStocks);
      } catch (err) {
        console.error("Stock API error:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchExchangeRate = async () => {
      try {
        // 2) Fetch currency data from exchangerate.host
        const fxRes = await fetch(
          "https://api.exchangerate.host/latest?base=USD"
        );
        const fxData = await fxRes.json();
        // Use USD->NGN rate if available
        const rate = fxData.rates?.NGN ?? 1;
        setExchangeRate(rate);
      } catch (err) {
        console.error("Exchange rate API error:", err);
      }
    };

    fetchExchangeRate();       // First get FX rate
    fetchMarketData();         // Then fetch stocks

    // Refresh every 30 seconds
    const interval = setInterval(fetchMarketData, 30000);
    return () => clearInterval(interval);
  }, [exchangeRate]);

  if (loading) return <p className="text-white">Loading stock data...</p>;
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
                ₦{stock.price.toLocaleString()}
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