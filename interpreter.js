function interpreter(node) {
  switch (node.kind) {
    case "Str":
      return node.value;

    case "Int":
      return node.value;

    case "Bool":
      return node.value;

    case "Tuple":
      const tuple = [0, 0];
      return node.value;

    case "Print":
      const term = interpreter(node.value);
      console.log(term);
      break;

    case "Binary":
      const lhs = interpreter(node.lhs);
      const rhs = interpreter(node.rhs);

      switch (node.op) {
        case "Add":
          return lhs + rhs;
        case "Sub":
          return lhs - rhs;
        case "Mul":
          return lhs * rhs;
        case "Div":
          return rhs === 0 ? lhs / rhs : console.error("Divisão por 0!");
        case "Rem":
          return lhs % rhs;
        case "Eq":
          return lhs === rhs;
        case "Neq":
          return lhs !== rhs;
        case "Lt":
          return lhs < rhs;
        case "Gt":
          return lhs > rhs;
        case "Lte":
          return lhs <= rhs;
        case "Gte":
          return lhs >= rhs;
        case "And":
          return lhs && rhs;
        case "Or":
          return lhs || rhs;
        default:
          return console.log("Erro em op");
      }

    default:
      console.log("Erro!");
  }
}

module.exports = interpreter;
