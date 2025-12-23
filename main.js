const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const dHistory = document.querySelector(".display-history");
const dInput = document.querySelector(".display-input");
const tmpResult = document.querySelector(".temp-result");
const equal = document.querySelector(".equal");
const clrAll = document.querySelector(".clear-all");
const clr = document.querySelector(".delete");
let disNum1 = "";
let disNum2 = "";
let result = null;
let lastOperation = "";
let haveDot = false;

function mathOperation() {
  if (lastOperation === "X") {
    result = parseFloat(result) * parseFloat(disNum2);
  } else if (lastOperation === "/") {
    result = parseFloat(result) / parseFloat(disNum2);
  } else if (lastOperation === "+") {
    result = parseFloat(result) + parseFloat(disNum2);
  } else if (lastOperation === "-") {
    result = parseFloat(result) - parseFloat(disNum2);
  } else if (lastOperation === "%") {
    result = parseFloat(result) % parseFloat(disNum2);
  }
}

numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    if (e.target.innerText === "." && !haveDot) {
      haveDot = true;
    } else if (e.target.innerText === "." && haveDot) {
      return;
    }
    disNum2 += e.target.innerText;
    dInput.innerText = disNum2;
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", (e) => {
    if (!disNum2) return;
    haveDot = false;
    const operationName = e.target.innerText;
    if (disNum1 && disNum2 && lastOperation) {
      mathOperation();
    } else {
      result = parseFloat(disNum2);
    }
    clearVar(operationName);
    lastOperation = operationName;
  });
});

function clearVar(name = "") {
  disNum1 += disNum2 + " " + name + " ";
  dHistory.innerText = disNum1;
  dInput.innerText = "";
  disNum2 = "";
  tmpResult.innerText = result;
}

equal.addEventListener("click", () => {
  if (!disNum2 || !disNum1) return;
  haveDot = false;
  mathOperation();
  clearVar();
  dInput.innerText = result;
  tmpResult.innerText = "";
  disNum2 = result;
  disNum1 = "";
});

clr.addEventListener("click", () => {
  dInput.innerText = "";
  disNum2 = "";
});

clrAll.addEventListener("click", () => {
  disNum1 = "";
  disNum2 = "";
  dHistory.innerText = "";
  dInput.innerText = "";
  result = "";
  tmpResult.innerText = "";
});

// Menjalankan kakulator dengan tombol kyboard
window.addEventListener("keydown", (e) => {
  if (
    e.key === "0" ||
    e.key === "1" ||
    e.key === "2" ||
    e.key === "3" ||
    e.key === "4" ||
    e.key === "5" ||
    e.key === "6" ||
    e.key === "7" ||
    e.key === "8" ||
    e.key === "9" ||
    e.key === "."
  ) {
    clickButton(e.key);
  } else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "%") {
    clickOperation(e.key);
  } else if (e.key === "*") {
    clickOperation("X");
  } else if (e.key == "Enter" || e.key === "=") {
    clickEqual();
  }
});

function clickButton(key) {
  numbers.forEach((button) => {
    if (button.innerText === key) {
      button.click();
    }
  });
}

function clickOperation(key) {
  operators.forEach((operator) => {
    if (operator.innerText === key) {
      operator.click();
    }
  });
}

function clickEqual() {
  equal.click();
}
