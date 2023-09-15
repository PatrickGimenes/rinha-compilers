function interpreter(node) {
  switch (node.kind) {
    case "Str":
      return node.value;

    case "Int":
      return node.value;

    case "Bool":
      return node.value;

    case "Tuple":
      return node.value;

    case "Print":
      const term = interpreter(node.value);
      console.log(term);
      break;

    default:
      console.log("Erro!");
  }
}

module.exports = interpreter;
