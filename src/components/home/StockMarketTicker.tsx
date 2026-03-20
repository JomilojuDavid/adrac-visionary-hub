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
            <span className="text-white/70 text-xs truncate block">
              {stock.name}
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
              {stock.changePercent}%
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);