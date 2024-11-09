// Seleciona elementos do DOM
const display = document.querySelector(".display");
const operationDisplay = document.querySelector(".operation-display");
const buttons = document.querySelectorAll(".button");

let firstOperand = "";
let operator = "";
let currentDisplayValue = "0";

// Função para atualizar o display
function updateDisplay() {
  display.textContent = currentDisplayValue;
}

// função para atualizar o display da operação
function updateOperationDisplay() {
  operationDisplay.textContent = `${firstOperand} ${operator} ${currentDisplayValue}`;
}

// Função para lidar com o clique dos botões
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonValue = button.textContent;

    // Se o botão for um número, atualiza o display
    if (!isNaN(buttonValue)) {
      if (currentDisplayValue === "0") {
        currentDisplayValue = buttonValue;
      } else {
        currentDisplayValue += buttonValue;
      }
    } else if (buttonValue === ".") {
      if (!currentDisplayValue.includes(".")) {
        currentDisplayValue += ".";
      }
    } else if (buttonValue === "C") {
      // Limpa o display e reseta as variáveis
      currentDisplayValue = "0";
      firstOperand = "";
      operator = "";
    } else if (["+", "-", "*", "/"].includes(buttonValue)) {
      // Salva o primeiro operando e o operador
      firstOperand = currentDisplayValue;
      operator = buttonValue;
      currentDisplayValue = "0";
    } else if (buttonValue === "=") {
      // Realiza a operação com base no operador selecionado
      if (operator && firstOperand) {
        const a = parseFloat(firstOperand);
        const b = parseFloat(currentDisplayValue);

        switch (operator) {
          case "+":
            currentDisplayValue = (a + b).toString();
            break;
          case "-":
            currentDisplayValue = (a - b).toString();
            break;
          case "*":
            currentDisplayValue = (a * b).toString();
            break;
          case "/":
            currentDisplayValue = b !== 0 ? (a / b).toString() : "Erro";
            break;
        }
        operator = "";
        firstOperand = "";
      }
    }
    updateDisplay();
    updateOperationDisplay();
  });
});

// Atualiza o display inicial
updateDisplay();
// updateOperationDisplay();
