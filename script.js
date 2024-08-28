const BUTTONS_LIST =
  [{"C": "C", "sign": "+/-", "divide": "÷", "multiply": "x"},
    {"seven": "7", "height": "8", "nine": "9", "subtract": "-"},
    {"four": "4", "five": "5", "six": "6", "add": "+"},
    {"one": "1", "two": "2", "three": "3"},
    {"zero": "0", "comma": ",", "equal": "="}];

const buttonsContainer = document.querySelector(".buttons");

function generateCalculatorUI() {
  for (let buttonLineList of BUTTONS_LIST) {
    const buttonLine = document.createElement("div");
    buttonLine.classList.add("button-line");

    for (let buttonKey in buttonLineList) {
      const button = document.createElement("button");
      button.classList.add(buttonKey + "-btn");
      button.textContent = buttonLineList[buttonKey];

      buttonLine.appendChild(button);
    }

    buttonsContainer.appendChild(buttonLine);
  }
}

document.addEventListener("DOMContentLoaded", generateCalculatorUI);