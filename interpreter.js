function interpreter(node, env) {
  const clojure = (fn, env) => {
    const call = (args) => {
      const newEnv = { ...env };
      for (let i = 0; i < fn.parameters.length; i++) {
        newEnv[fn.parameters[i].text] = args[i];
      }
      return interpreter(fn.value, newEnv);
    };
    return { call };
  };
  switch (node.kind) {
    case "Str":
      return node.value;

    case "Int":
      return node.value;

    case "Bool":
      return node.value;

    case "Tuple":
      const tuple = [
        interpreter(node.first, env),
        interpreter(node.second, env),
      ];
      return tuple;

    case "First":
      return interpreter(node.value, env)[0];

    case "Second":
      return interpreter(node.value, env)[1];
    case "Print":
      const term = interpreter(node.value, env);
      console.log(term);
      break;

    case "If":
      if (interpreter(node.condition, env) === true) {
        return interpreter(node.then, env);
      } else {
        return interpreter(node.otherwise, env);
      }

    case "Function":
      return node;

    case "Call":
      const callee = interpreter(node.callee, env);
      if (callee?.kind === "Function")
        return clojure(callee, env).call(
          node.arguments.map((arg) => interpreter(arg, env))
        );

    case "Binary":
      const lhs = interpreter(node.lhs, env);
      const rhs = interpreter(node.rhs, env);

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

    case "Let":
      env[node.name.text] = interpreter(node.value, env);
      return interpreter(node.next, env);
    case "Var":
      return env[node.text];
    default:
      console.log(`Term ${node.kind} não encontrado!`);
  }
}

module.exports = interpreter;
