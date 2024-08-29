const BUTTONS_LIST =
  [{"C": "C", "sign": "+/-", "divide": "÷", "multiply": "x"},
    {"seven": "7", "height": "8", "nine": "9", "subtract": "-"},
    {"four": "4", "five": "5", "six": "6", "add": "+"},
    {"one": "1", "two": "2", "three": "3"},
    {"zero": "0", "dot": ".", "equal": "="}];

const OPERATOR_LIST = ["÷", "x", "-", "+"];

const buttonsContainer = document.querySelector(".buttons");
const screen = document.querySelector(".screen");

let firstNumber = "";
let secondNumber = "";
let operator = "";

function addTextFromKeyboard(e) {
  const addText = checkInputType(e.key);
  addText(null);
}

function updateScreen() {
  screen.childNodes[0].textContent = firstNumber; // first child is the span of the first number
  screen.childNodes[1].textContent = operator;
  screen.childNodes[2].textContent = secondNumber;
}

function addDigitToCurrentNumber(digit) {
  if (firstNumber && operator) secondNumber += digit;
  else firstNumber += digit;
}

function addOperator(operatorToAdd) {
  if (firstNumber) {
    if (secondNumber) {
      calculate();
      operator = operatorToAdd;
    } else {
      operator = operatorToAdd;
    }
  }
}

function addDotToCurrentNumber() {
  if (firstNumber && operator && secondNumber && !secondNumber.includes(".")) secondNumber += ".";
  else if (firstNumber && !firstNumber.includes(".")) firstNumber += ".";
}

function invertCurrentNumberSign() {
  if (firstNumber && operator && secondNumber) secondNumber *= -1;
  else if (firstNumber && !operator) firstNumber *= -1;
}

function popCurrentNumber() {
  if (firstNumber && operator && secondNumber) secondNumber = secondNumber.slice(0, -1);
  else if (operator && !secondNumber) operator = "";
  else firstNumber = firstNumber.slice(0, -1);
}

function clear() {
  if (secondNumber) {
    secondNumber = "";
  } else {
    firstNumber = "";
    operator = "";
  }
}

function calculate() {
  let result = 0;
  switch (operator) {
    case "÷":
      if (+secondNumber === 0) return alert("YOU CAN'T DIVIDE BY 0 !!");

      result = Math.floor((+firstNumber / +secondNumber) * 1000) / 1000;
      break;
    case "x":
      result = Math.floor((+firstNumber * +secondNumber) * 1000) / 1000;
      break;
    case "-":
      result = Math.floor((+firstNumber - +secondNumber) * 1000) / 1000;
      break;
    case "+":
      result = Math.floor((+firstNumber + +secondNumber) * 1000) / 1000;
      break;
  }

  firstNumber = result.toString();
  operator = "";
  secondNumber = "";
}

function checkInputType(inputText) {
  return function (e) {
    if (!isNaN(Number(inputText))) {
      addDigitToCurrentNumber(inputText);
    } else if (OPERATOR_LIST.includes(inputText)) {
      addOperator(inputText);
    } else if ((inputText === "=" || inputText === "Enter") && secondNumber !== "") {
      calculate();
    } else if (inputText === "+/-") {
      invertCurrentNumberSign();
    } else if (inputText.toLowerCase() === "c") {
      clear();
    } else if (inputText === ".") {
      addDotToCurrentNumber();
    } else if (inputText === "Backspace") {
      popCurrentNumber();
    }

    updateScreen();
  };
}

function generateCalculatorUI() {
  for (let buttonLineList of BUTTONS_LIST) {
    const buttonLine = document.createElement("div");
    buttonLine.classList.add("button-line");

    for (let buttonKey in buttonLineList) {
      const button = document.createElement("button");
      button.classList.add(buttonKey + "-btn");
      if (OPERATOR_LIST.includes(buttonLineList[buttonKey])) button.classList.add("operator")
      button.textContent = buttonLineList[buttonKey];

      button.addEventListener("click", checkInputType(buttonLineList[buttonKey]))

      buttonLine.appendChild(button);
    }

    buttonsContainer.appendChild(buttonLine);
  }
}

document.addEventListener("DOMContentLoaded", generateCalculatorUI);
document.addEventListener("keydown", addTextFromKeyboard);
