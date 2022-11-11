// SELECT ELEMENTS
const input_element = document.querySelector(".input");
const output_operation_element = document.querySelector(".operation .value");
const output_result_element = document.querySelector(".result .value");

// VARIABLES
const OPERATORS = ["+", "-", "*", "/"];
const POWER = "POWER(",
  FACTORIAL = "FACTORIAL";
let data = {
  operation: [],
  formula: [],
};

let ans = 0;

// CREATE BUTTONS
let calculator_buttons = [
  {
    name: "rad",
    symbol: "Rad",
    formula: false,
    type: "key",
  },
  {
    name: "deg",
    symbol: "Deg",
    formula: false,
    type: "key",
  },
  {
    name: "ANS",
    symbol: "ANS",
    formula: "ans",
    type: "number",
  },
  {
    name: "open-parenthesis",
    symbol: "(",
    formula: "(",
    type: "number",
  },
  {
    name: "close-parenthesis",
    symbol: ")",
    formula: ")",
    type: "number",
  },
  {
    name: "clear",
    symbol: "C",
    formula: false,
    type: "key",
  },
  {
    name: "delete",
    symbol: "⌫",
    formula: false,
    type: "key",
  },
  {
    name: "square-root",
    symbol: "√",
    formula: "Math.sqrt",
    type: "math_function",
  },
  {
    name: "square",
    symbol: "x²",
    formula: POWER,
    type: "math_function",
  },
  {
    name: "power",
    symbol: "x<span>y</span>",
    formula: POWER,
    type: "math_function",
  },
  {
    name: "7",
    symbol: 7,
    formula: 7,
    type: "number",
  },
  {
    name: "8",
    symbol: 8,
    formula: 8,
    type: "number",
  },
  {
    name: "9",
    symbol: 9,
    formula: 9,
    type: "number",
  },
  {
    name: "division",
    symbol: "÷",
    formula: "/",
    type: "operator",
  },

  {
    name: "cos",
    symbol: "cos",
    formula: "trigo(Math.cos,",
    type: "trigo_function",
  },
  {
    name: "sin",
    symbol: "sin",
    formula: "trigo(Math.sin,",
    type: "trigo_function",
  },
  {
    name: "tan",
    symbol: "tan",
    formula: "trigo(Math.tan,",
    type: "trigo_function",
  },
  {
    name: "4",
    symbol: 4,
    formula: 4,
    type: "number",
  },
  {
    name: "5",
    symbol: 5,
    formula: 5,
    type: "number",
  },
  {
    name: "6",
    symbol: 6,
    formula: 6,
    type: "number",
  },
  {
    name: "multiplication",
    symbol: "×",
    formula: "*",
    type: "operator",
  },
  {
    name: "ln",
    symbol: "ln",
    formula: "Math.log",
    type: "math_function",
  },
  {
    name: "log",
    symbol: "log",
    formula: "Math.log10",
    type: "math_function",
  },
  {
    name: "percent",
    symbol: "%",
    formula: "/100",
    type: "number",
  },
  {
    name: "1",
    symbol: 1,
    formula: 1,
    type: "number",
  },
  {
    name: "2",
    symbol: 2,
    formula: 2,
    type: "number",
  },
  {
    name: "3",
    symbol: 3,
    formula: 3,
    type: "number",
  },
  {
    name: "subtraction",
    symbol: "–",
    formula: "-",
    type: "operator",
  },
  {
    name: "pi",
    symbol: "π",
    formula: "Math.PI",
    type: "number",
  },
  {
    name: "e",
    symbol: "e",
    formula: "Math.E",
    type: "number",
  },

  {
    name: "comma",
    symbol: ".",
    formula: ".",
    type: "number",
  },
  {
    name: "0",
    symbol: 0,
    formula: 0,
    type: "number",
  },
  {
    name: "calculate",
    symbol: "=",
    formula: "=",
    type: "calculate",
  },
  {
    name: "addition",
    symbol: "+",
    formula: "+",
    type: "operator",
  },
];

// CREATE CALCULATOR BTNS
function createCalculatorButtons() {
  const bnts_per_row = 7;
  let added_btns = 0;

  calculator_buttons.forEach((button) => {
    if (added_btns % bnts_per_row == 0) {
      input_element.innerHTML += `<div class="row"></div>`;
    }

    const row = document.querySelector(".row:last-child");
    row.innerHTML += `<button id="${button.name}">${button.symbol}</button>`;

    added_btns++;
  });
}

createCalculatorButtons();

//RAD, DEG
let RADIAN = true;
const rad_btn = document.getElementById("rad");
const deg_btn = document.getElementById("deg");

rad_btn.classList.add("active-angle");

function angleToggler() {
  rad_btn.classList.toggle("active-angle");
  deg_btn.classList.toggle("active-angle");
}

// CLICK EVENT LISTENER
input_element.addEventListener("click", (event) => {
  const target_btn = event.target;
  calculator_buttons.forEach((button) => {
    if (button.name == target_btn.id) calculator(button);
  });
});

// CALCULATOR
function calculator(button) {
  if (button.type == "operator") {
    data.operation.push(button.symbol);
    data.formula.push(button.formula);
  } else if (button.type == "number") {
    data.operation.push(button.symbol);
    data.formula.push(button.formula);
  } else if (button.type == "math_function") {
    let symbol, formula;

    if (button.name == "square") {
      symbol = "^(";
      formula = button.formula;
      data.operation.push(symbol);
      data.formula.push(formula);

      data.operation.push("2)");
      data.formula.push("2)");
    } else if (button.name == "power") {
      symbol = "^(";
      formula = button.formula;
      data.operation.push(symbol);
      data.formula.push(formula);
    } else {
      symbol = button.symbol + "(";
      formula = button.formula + "(";
      data.operation.push(symbol);
      data.formula.push(formula);
    }
  } else if (button.type == "trigo_function") {
    data.operation.push(button.symbol + "(");
    data.formula.push(button.formula);
  } else if (button.type == "key") {
    if (button.name == "clear") {
      data.operation = [];
      data.formula = [];

      updateOutputRes(0);
    } else if (button.name == "rad") {
      RADIAN = true;
      angleToggler();
    } else if (button.name == "deg") {
      RADIAN = false;
      angleToggler();
    } else if (button.name == "delete") {
      data.operation.pop();
      data.formula.pop();
    }
  } else if (button.type == "calculate") {
    formula_str = data.formula.join("");

    // FIX POWER AND FACTORIAL ISSUE
    /* SEARCH FOR POWER OR FACTORIAL FUNCTIONS */
    let POWER_RES = search(data.formula, POWER);

    /* GET POWER BASE */
    const BASES = powerBaseGetter(data.formula, POWER_RES);
    BASES.forEach((base) => {
      let toreplace = base + POWER;
      let replacement = "Math.pow(" + base + ",";
      formula_str = formula_str.replace(toreplace, replacement);
    });

    /* GET FACTORIAL NUMBER */

    //CALCULATE
    let result;
    try {
      result = eval(formula_str);
    } catch (error) {
      if (error instanceof SyntaxError) {
        result = "Error!";
        updateOutputRes(result);
        return;
      }
    }

    // SAVE RES FOR LATTER USE
    ans = result;
    data.operation = [result];
    data.formula = [result];
    updateOutputRes(result);
    return;
  }

  updateOutputOperation(data.operation.join(""));
}

// POWER BASE GET FUNCTION
function powerBaseGetter(formula, POWER_RES) {
  let power_bases = [];
  POWER_RES.forEach((power_index) => {
    let base = [];
    let parenthesis = 0;
    let previous_index = power_index - 1;
    while (previous_index >= 0) {
      if (formula[previous_index] == "(") parenthesis--;
      if (formula[previous_index] == ")") parenthesis++;

      let isOperator = false;
      OPERATORS.forEach((OPERATOR) => {
        if (formula[previous_index] == OPERATOR) isOperator = true;
      });

      let isPower = formula[previous_index] == POWER;

      if ((isOperator && previous_index == 0) || isPower) break;

      base.unshift(formula[previous_index]);
      previous_index--;
    }
    power_bases.push(base.join(""));
  });
  return power_bases;
}

// SEARCH FUNCTION
function search(array, key) {
  let search_res = [];
  array.forEach((element, index) => {
    if (element == key) search_res.push(index);
  });
  return search_res;
}

// UPDATE OUTPUT
function updateOutputOperation(operation) {
  output_operation_element.innerHTML = operation;
}
function updateOutputRes(result) {
  output_result_element.innerHTML = result;
}

// TRIGONOMETRIC FUNCTION
function trigo(callback, angle) {
  if (!RADIAN) {
    angle = (angle * Math.PI) / 180;
  }
  return callback(angle);
}

function rev_trigo(callback, value) {
  let angle = callback(value);
  if (!RADIAN) {
    angle = 180 / Math.PI;
  }
  return angle;
}

// FACTORIAL FUNCTION
function factorial(number) {
  if (number % 1 != 0) return gamma(number + 1);
  if (number == 0 || number == 1) return 1;
  let result = 1;
  for (i = 0; i <= number; i++) {
    result *= i;
    if (result == Infinity) return Infinity;
  }
  return result;
}
