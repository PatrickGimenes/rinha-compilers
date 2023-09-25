const fs = require("fs");
const interpreter = require("./interpreter");

function setup(filepath) {
  const rawData = fs.readFileSync(filepath);
  const AST = JSON.parse(rawData);
  let env = {};
  interpreter(AST.expression, env);
}

setup("./var/rinha/source.rinha.json");
