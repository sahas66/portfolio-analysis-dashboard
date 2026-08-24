// Total value = cash + sum(holding.quantity * latest price for that asset).
// Falls back to the holding's avg price if no live price was fetched yet.
export function totalValue(portfolio, prices) {
  const holdingsValue = portfolio.holdings.reduce((sum, h) => {
    const live = prices?.[h.asset]?.price;
    const price = typeof live === 'number' ? live : h.avgPrice;
    return sum + h.quantity * price;
  }, 0);
  return portfolio.cashBalance + holdingsValue;
}
