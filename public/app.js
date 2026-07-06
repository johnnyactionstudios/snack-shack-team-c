// Snack Shack — client (pre-wired, don't edit)
// This client computes NO pricing. It sends the order to the server and renders
// the breakdown the server returns. pricing.js is the single source of truth.
const state = { items: [], tip: 0 };

async function loadMenu() {
  const res = await fetch("/api/menu");
  const menu = await res.json();
  const list = document.getElementById("menu");
  list.innerHTML = "";
  menu.forEach((item) => {
    const li = document.createElement("li");
    const label = document.createElement("span");
    label.textContent = `${item.name} — $${item.price.toFixed(2)}`;
    const button = document.createElement("button");
    button.textContent = "Add";
    button.addEventListener("click", () => {
      state.items.push(item);
      render();
    });
    li.appendChild(label);
    li.appendChild(button);
    list.appendChild(li);
  });
}

// If a Tip feature added tip buttons under ORDER CONTROLS, wire them.
// (The tip VALUE is user input; the tip RULE lives in pricing.js.)
function wireTipButtons() {
  const tip = document.getElementById("tip");
  if (!tip) return;
  tip.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const amount = parseFloat(btn.textContent.replace("$", ""));
      if (!Number.isNaN(amount)) {
        state.tip = amount;
        render();
      }
    });
  });
}

function money(n) {
  return (n < 0 ? "-$" : "$") + Math.abs(n).toFixed(2);
}

async function render() {
  const lines = document.getElementById("lines");
  lines.innerHTML = "";
  state.items.forEach((item) => {
    const div = document.createElement("div");
    div.textContent = `${item.name} — $${item.price.toFixed(2)}`;
    lines.appendChild(div);
  });

  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: state.items, tip: state.tip }),
  });
  const order = await res.json(); // { subtotal, lines, total }

  const subtotalEl = document.getElementById("subtotal");
  if (subtotalEl) subtotalEl.textContent = `Subtotal: $${order.subtotal.toFixed(2)}`;

  // Fill any receipt line a teammate added, matched by id. No math here.
  (order.lines || []).forEach((line) => {
    const el = document.getElementById(line.id);
    if (el) el.textContent = `${line.label}: ${money(line.amount)}`;
  });

  document.getElementById("total").textContent = `Total: $${order.total.toFixed(2)}`;
}

loadMenu().then(() => {
  wireTipButtons();
  render();
});
