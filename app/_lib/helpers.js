export function formatCurrency(price) {
  const priceInNgn = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(price * 100);

  return priceInNgn;
}
