import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpDown, RefreshCw } from "lucide-react";

interface Rate {
  currency: string;
  flag: string;
  code: string;
  buy: number;
  sell: number;
}

const initialRates: Rate[] = [
  { currency: "US Dollar", flag: "🇺🇸", code: "USD", buy: 1580.00, sell: 1595.00 },
  { currency: "British Pound", flag: "🇬🇧", code: "GBP", buy: 2005.00, sell: 2025.00 },
  { currency: "Euro", flag: "🇪🇺", code: "EUR", buy: 1720.00, sell: 1740.00 },
  { currency: "Canadian Dollar", flag: "🇨🇦", code: "CAD", buy: 1125.00, sell: 1140.00 },
  { currency: "Swiss Franc", flag: "🇨🇭", code: "CHF", buy: 1810.00, sell: 1830.00 },
  { currency: "Chinese Yuan", flag: "🇨🇳", code: "CNY", buy: 218.00, sell: 225.00 },
  { currency: "South African Rand", flag: "🇿🇦", code: "ZAR", buy: 86.50, sell: 89.00 },
  { currency: "UAE Dirham", flag: "🇦🇪", code: "AED", buy: 430.00, sell: 438.00 },
];

const ExchangeRateTicker = () => {
  const [rates, setRates] = useState<Rate[]>(initialRates);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setRates(prev =>
        prev.map(rate => {
          const fluctBuy = (Math.random() - 0.5) * rate.buy * 0.003;
          const fluctSell = (Math.random() - 0.5) * rate.sell * 0.003;
          return {
            ...rate,
            buy: parseFloat((rate.buy + fluctBuy).toFixed(2)),
            sell: parseFloat((rate.sell + fluctSell).toFixed(2)),
          };
        })
      );
      setLastUpdated(new Date());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <ArrowUpDown className="w-5 h-5 text-gold" />
        <h3 className="font-heading font-bold text-foreground text-lg">NGN Exchange Rates</h3>
        <span className="ml-auto text-xs text-muted-foreground flex items-center gap-1">
          <RefreshCw className="w-3 h-3" />
          {lastUpdated.toLocaleTimeString()}
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-muted-foreground text-xs border-b border-border">
              <th className="text-left py-2 font-heading font-semibold">Currency</th>
              <th className="text-right py-2 font-heading font-semibold">Buy (₦)</th>
              <th className="text-right py-2 font-heading font-semibold">Sell (₦)</th>
            </tr>
          </thead>
          <tbody>
            {rates.map((rate) => (
              <motion.tr
                key={rate.code}
                layout
                className="border-b border-border/50 last:border-0"
              >
                <td className="py-2.5">
                  <span className="flex items-center gap-2">
                    <span className="text-lg">{rate.flag}</span>
                    <span>
                      <span className="font-heading font-semibold text-card-foreground block">{rate.code}</span>
                      <span className="text-muted-foreground text-xs">{rate.currency}</span>
                    </span>
                  </span>
                </td>
                <td className="text-right font-heading font-semibold text-card-foreground py-2.5">
                  {rate.buy.toLocaleString()}
                </td>
                <td className="text-right font-heading font-semibold text-card-foreground py-2.5">
                  {rate.sell.toLocaleString()}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExchangeRateTicker;
