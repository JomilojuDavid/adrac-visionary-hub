import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

const initialStocks: Stock[] = [
  { symbol: "DANGCEM", name: "Dangote Cement", price: 290.50, change: 3.20, changePercent: 1.11 },
  { symbol: "GTCO", name: "GT Holding Co", price: 45.80, change: -0.60, changePercent: -1.29 },
  { symbol: "MTNN", name: "MTN Nigeria", price: 195.00, change: 2.50, changePercent: 1.30 },
  { symbol: "AIRTELAFRI", name: "Airtel Africa", price: 1650.00, change: 15.00, changePercent: 0.92 },
  { symbol: "BUACEMENT", name: "BUA Cement", price: 87.00, change: -1.20, changePercent: -1.36 },
  { symbol: "ZENITHBANK", name: "Zenith Bank", price: 38.50, change: 0.80, changePercent: 2.12 },
  { symbol: "ACCESSCORP", name: "Access Holdings", price: 19.75, change: 0.35, changePercent: 1.80 },
  { symbol: "SEPLAT", name: "Seplat Energy", price: 3200.00, change: -45.00, changePercent: -1.39 },
  { symbol: "BUAFOODS", name: "BUA Foods", price: 142.30, change: 4.10, changePercent: 2.97 },
  { symbol: "NESTLE", name: "Nestle Nigeria", price: 880.00, change: -12.50, changePercent: -1.40 },
];

const StockMarketTicker = () => {
  const [stocks, setStocks] = useState<Stock[]>(initialStocks);

  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prev =>
        prev.map(stock => {
          const fluctuation = (Math.random() - 0.48) * stock.price * 0.008;
          const newPrice = Math.max(stock.price + fluctuation, 1);
          const newChange = parseFloat((stock.change + fluctuation).toFixed(2));
          const newPercent = parseFloat(((newChange / (newPrice - newChange)) * 100).toFixed(2));
          return { ...stock, price: parseFloat(newPrice.toFixed(2)), change: newChange, changePercent: newPercent };
        })
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-5 h-5 text-gold" />
        <h3 className="font-heading font-bold text-foreground text-lg">NGX Live Market</h3>
        <span className="ml-auto text-xs text-muted-foreground flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Live
        </span>
      </div>
      <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1 scrollbar-thin">
        {stocks.map((stock) => (
          <motion.div
            key={stock.symbol}
            layout
            className="flex items-center justify-between bg-card border border-border rounded-lg px-4 py-2.5 text-sm"
          >
            <div className="min-w-0">
              <span className="font-heading font-semibold text-card-foreground block">{stock.symbol}</span>
              <span className="text-muted-foreground text-xs truncate block">{stock.name}</span>
            </div>
            <div className="text-right flex items-center gap-3">
              <span className="font-heading font-semibold text-card-foreground">₦{stock.price.toLocaleString()}</span>
              <span className={`flex items-center gap-0.5 text-xs font-semibold ${stock.change >= 0 ? "text-green-600" : "text-red-500"}`}>
                {stock.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {stock.changePercent >= 0 ? "+" : ""}{stock.changePercent}%
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StockMarketTicker;
