class Calculator {
  constructor(previousInputTextElement, currentInputTextElement) {
    this.previousInputTextElement = previousInputTextElement;
    this.currentInputTextElement = currentInputTextElement;
    this.clear();
  }
  clear() {
    this.currentInput = "";
    this.previousInput = "";
    this.operation = undefined;
  }

  delete() {
    this.currentInput = this.currentInput.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentInput.includes(".")) return;
    this.currentInput = this.currentInput.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentInput === "") return;
    if (this.previousInput !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousInput = this.currentInput;
    this.currentInput = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousInput);
    const current = parseFloat(this.currentInput);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "x":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentInput = computation;
    this.operation = undefined;
    this.previousInput = "";
  }

  getDisplayNumber(number) {
    const floatNumber = parseFloat(number);
    if (isNaN(floatNumber)) return "";
    return floatNumber.toLocaleString("en");
  }

  updateDisplay() {
    this.currentInputTextElement.innerText = this.getDisplayNumber(
      this.currentInput
    );
    if (this.operation != null) {
      this.previousInputTextElement.innerText = `${this.getDisplayNumber(
        this.previousInput
      )} ${this.operation}`;
    } else {
      this.previousInputTextElement.innerText = "";
    }
  }
}

const numberButtons = document.querySelectorAll(".data-number-js");
const operatorButtons = document.querySelectorAll(".data-operator-js");
const deleteButton = document.querySelector(".data-delete-js");
const clearButton = document.querySelector(".data-clear-js");
const equalButton = document.querySelector(".data-equal-js");
const previousInputTextElement = document.querySelector(".previous-input-js");
const currentInputTextElement = document.querySelector(".current-input-js");

const calculator = new Calculator(
  previousInputTextElement,
  currentInputTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

clearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
