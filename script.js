const investmentAmountInput = document.getElementById("investment-amount");
const returnRateInput = document.getElementById("investment-return");
const investmentPeriodInput = document.getElementById("investment-period");

const investmentAmountValue = document.getElementById("investment-amount-value");
const returnRateValue = document.getElementById("investment-return-value");
const investmentPeriodValue = document.getElementById("investment-period-value");

const monthlyPayment = document.getElementById("monthly-payment");

function calculateMonthlyPayment() {
  const investmentAmount = parseFloat(investmentAmountInput.value); //Получает значение суммы инвестиций из поля ввода и преобразует его в число с плавающей запятой (parseFloat). Функция parseFloat() преобразует строку в число с плавающей запятой (десятичное число). В отличие от parseInt(), который берет только целую часть, parseFloat() сохраняет дробную часть. НО parseFloat("3 года")   // 3 (игнорирует текст после числа). parseFloat("abc5.5")   // NaN (не число, потому что число не в начале строки).
  const returnRate = parseFloat(returnRateInput.value) / 100 / 12; //Берет введенный процент доходности (например, 5 для 5%)
  const investmentPeriod = parseInt(investmentPeriodInput.value) * 12; //Преобразует введенный период в целое число (parseInt). Умножает на 12, чтобы перевести годы в месяцы. Функция parseInt() преобразует строку "5" в целое число 5. Или parseInt("3 года") * 12; // 3 * 12 = 36 месяцев. (parseInt("abc5.5")); // NaN. (parseInt("  42 "));  // 42 (игнорирует пробелы)

  if (returnRate === 0) {
    // Для случая с 0% ставкой
    const payment = investmentAmount / investmentPeriod;
    monthlyPayment.textContent = `Monthly Payment: $${payment.toFixed(2)}`;
    return;
  }

  const numerator = investmentAmount * returnRate * Math.pow(1 + returnRate, investmentPeriod); //Формула аннуитетного платежа. Это числитель
  const denominator = Math.pow(1 + returnRate, investmentPeriod) - 1; //Это знаменатель
  const payment = numerator / denominator;

  monthlyPayment.textContent = `Monthly Payment: $${payment.toFixed(2)}`;
}

function updateValue() {
  investmentAmountValue.textContent = `$${parseFloat(investmentAmountInput.value).toLocaleString()}`; //Отображает введенную сумму инвестиции, преобразованную в строку с разделением тысячных разрядов
  returnRateValue.textContent = `${parseFloat(returnRateInput.value).toFixed(1)}%`; //Отображает введенную процентную ставку с одним десятичным знаком
  investmentPeriodValue.textContent = `${investmentPeriodInput.value}years`; //Отображает введенный срок инвестирования в годах

  calculateMonthlyPayment();
}

investmentAmountInput.addEventListener("input", updateValue);
returnRateInput.addEventListener("input", updateValue);
investmentPeriodInput.addEventListener("input", updateValue);

updateValue(); //Каждый раз при изменении этих значений, функция updateValue() пересчитывает и обновляет все отображаемые значения (сумму, ставку, период) и результат — ежемесячную выплату. Здесь вызываем эту функцию в самом конце кода имеет одно важное значение: он инициализирует отображение значений сразу, когда страница загружается.
