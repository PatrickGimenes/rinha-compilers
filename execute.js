const fs = require("fs");
const interpreter = require("./interpreter");

const rawData = fs.readFileSync("./var/rinha/source.rinha.json", "utf-8");
const AST = JSON.parse(rawData);

console.time("time");
interpreter(AST.expression);
console.timeEnd("time");
