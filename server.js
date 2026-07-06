// Snack Shack — server
const express = require("express");
const path = require("path");
const { MENU } = require("./menu");
const { calculateTotal } = require("./pricing");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/menu", (req, res) => {
  res.json(MENU);
});

app.post("/api/checkout", (req, res) => {
  const order = req.body || { items: [] };
  const total = calculateTotal(order); // fills order.subtotal + order.lines
  res.json({ subtotal: order.subtotal, lines: order.lines || [], total });
});

app.listen(PORT, () => {
  console.log(`Snack Shack running at http://localhost:${PORT}`);
});
