const buttons = document.querySelectorAll('button');
const display = document.querySelector('.display');
let currentOperand = '';
let previousOperand = '';
let operation = '';

for (const button of buttons) {
  button.addEventListener('click', (e) => {
    const target = e.target;
    const value = target.innerText;

    if (isNaN(value) || value === '.') {
      handleOperators(value);
    } else {
      handleNumbers(value);
    }

    display.innerText = currentOperand;
  });
}

function handleOperators(value) {
  switch (value) {
    case 'C':
      currentOperand = '';
      previousOperand = '';
      operation = '';
      break;

    case '+/-':
      currentOperand = currentOperand.charAt(0) === '-'
        ? currentOperand.slice(1)
        : `-${currentOperand}`;
      break;

    case '%':
      currentOperand = (parseFloat(currentOperand) / 100).toString();
      break;

    case '÷':
    case '×':
    case '-':
    case '+':
      previousOperand = currentOperand;
      operation = value;
      currentOperand = '';
      break;

    case '=':
      evaluateExpression();
      break;
  }
}

function handleNumbers(value) {
  if (currentOperand.length > 12) {
    return;
  }

  if (currentOperand === '0' && value !== '.') {
    currentOperand = value;
  } else {
    currentOperand += value;
  }
}

function evaluateExpression() {
  switch (operation) {
    case '÷':
      currentOperand = (parseFloat(previousOperand) / parseFloat(currentOperand)).toString();
      break;

    case '×':
      currentOperand = (parseFloat(previousOperand) * parseFloat(currentOperand)).toString();
      break;

    case '-':
      currentOperand = (parseFloat(previousOperand) - parseFloat(currentOperand)).toString();
      break;

    case '+':
      currentOperand = (parseFloat(previousOperand) + parseFloat(currentOperand)).toString();
      break;
  }
}



buttons.forEach(button => {
  button.addEventListener("click", e => {
    const text = e.target.innerText;
    const currentValue = display.innerText;
    if (text === "C") {
      display.innerText = "0";
      display.style.fontSize = "4em";
    } else if (text === "=") {
      display.innerText = eval(currentValue);
      if (display.innerText.length > 6) {
        display.style.fontSize = "1.5em";
      }
    } else {
      if (currentValue === "0") {
        display.innerText = text;
      } else {
        display.innerText = currentValue;
      }
      if (display.innerText.length > 6) {
        display.style.fontSize = "1.5em";
      } else {
        display.style.fontSize = "4em";
      }
    }
  });
});
