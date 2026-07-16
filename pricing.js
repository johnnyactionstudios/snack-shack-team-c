// Snack Shack — pricing
// The ONE place order math lives. Each feature adds a rule below the anchor:
// adjust `total`, then push a { id, label, amount } line so the receipt can show it.

function calculateTotal(order) {
  order.lines = [];

  let total = 0;

  for (const item of order.items) {
    total += item.price;
  }

  order.subtotal = total;

  // === PRICING RULES — add your rule directly below this line ===

  // Combo discount: $2 off when the order has 3 or more items
  if (order.items.length >= 3) {
    total -= 2;

    order.lines.push({
      id: "discount-line",
      label: "Discount",
      amount: -2,
    });
  }

  return Math.round(total * 100) / 100;
}

module.exports = { calculateTotal };