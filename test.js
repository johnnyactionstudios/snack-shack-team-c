const { calculateTotal } = require("./pricing");
// 3 items ($3 + $2 + $2 = $7), $1 tip
const order = { items: [{ price: 3 }, { price: 2 }, { price: 2 }], tip: 1 };
console.log("Total:", calculateTotal(order));   // expect 6.65 once discount, tax, tip are merged
