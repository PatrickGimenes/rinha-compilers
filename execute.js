const fs = require("fs");
const interpreter = require("./interpreter");

const rawData = fs.readFileSync("./var/rinha/fib.json", "utf-8");
const AST = JSON.parse(rawData);
let env = {};
console.time("time");
interpreter(AST.expression, env);
console.timeEnd("time");
