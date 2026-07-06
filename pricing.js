// Snack Shack — pricing
// The ONE place order math lives. Each feature adds a rule below the anchor:
// adjust `total`, then push a { id, label, amount } line so the receipt can show it.
function calculateTotal(order) {
  order.lines = [];
  let total = 0;
  for (const item of order.items) total += item.price;
  order.subtotal = total;

  // === PRICING RULES — add your rule directly below this line ===

  return Math.round(total * 100) / 100;
}
module.exports = { calculateTotal };
