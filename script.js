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
  if (secondNumber) {
    calculate();
    operator = operatorToAdd;
  } else {
    operator = operatorToAdd;
  }
}

function invertCurrentNumberSign() {
  if (firstNumber && operator) secondNumber *= -1;
  else firstNumber *= -1;
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

function checkButtonType(buttonText) {
  return function (e) {
    if (!isNaN(Number(buttonText))) {
      addDigitToCurrentNumber(buttonText);
    } else if (OPERATOR_LIST.includes(buttonText)) {
      addOperator(buttonText);
    } else if (buttonText === "=" && secondNumber !== "") {
      calculate();
    } else if (buttonText === "+/-") {
      invertCurrentNumberSign();
    } else if (buttonText === "C") {
      clear();
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
      button.textContent = buttonLineList[buttonKey];

      button.addEventListener("click", checkButtonType(buttonLineList[buttonKey]))

      buttonLine.appendChild(button);
    }

    buttonsContainer.appendChild(buttonLine);
  }
}

document.addEventListener("DOMContentLoaded", generateCalculatorUI);
