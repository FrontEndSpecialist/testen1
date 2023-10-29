function calculateMaxLoanAmount(income, partnerIncome, hasStudentLoan) {
  let maxLoanAmount = (income + partnerIncome) * 4;

  if (hasStudentLoan) {
    maxLoanAmount *= 0.75;
  }

  return maxLoanAmount;
}

function calculateMonthlyPayments(maxLoanAmount, mortgageDuration) {
  const interestRates = {
    1: 0.02,
    5: 0.03,
    10: 0.035,
    20: 0.045,
    30: 0.05,
  };

  const interestRate = interestRates[mortgageDuration];
  const monthlyInterestRate = interestRate / 12;
  const numberOfPayments = mortgageDuration * 12;

  const monthlyPayments =
    (maxLoanAmount * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

  return {
    monthlyPayments,
    numberOfPayments,
    interestRate,
  };
}

function calculateTotalCost(monthlyPayments, numberOfPayments) {
  return monthlyPayments * numberOfPayments;
}

function calculateInterestSchedule(
  maxLoanAmount,
  numberOfPayments,
  monthlyInterestRate
) {
  const monthlyAmortization = maxLoanAmount / numberOfPayments;
  let remainingLoanAmount = maxLoanAmount;

  const interestSchedule = [];
  for (let i = 1; i <= numberOfPayments; i++) {
    const interestPayment = remainingLoanAmount * monthlyInterestRate;
    const principalPayment = monthlyAmortization - interestPayment;
    remainingLoanAmount -= principalPayment;

    interestSchedule.push({
      month: i,
      interestPayment,
      principalPayment,
    });
  }

  return interestSchedule;
}

function calculateMortgage(
  income,
  partnerIncome,
  mortgageDuration,
  hasStudentLoan,
  zipcode
) {
  income = parseFloat(income) || 0;
  partnerIncome = parseFloat(partnerIncome) || 0;
  mortgageDuration = parseInt(mortgageDuration);
  hasStudentLoan = Boolean(hasStudentLoan);

  const forbiddenZipcodes = ["9679", "9681", "9682"];

  const maxLoanAmount = calculateMaxLoanAmount(
    income,
    partnerIncome,
    hasStudentLoan
  );

  const result = calculateMonthlyPayments(maxLoanAmount, mortgageDuration);

  let { monthlyPayments, numberOfPayments, interestRate } = result;

  const interestSchedule = calculateInterestSchedule(
    maxLoanAmount,
    numberOfPayments,
    interestRate
  );

  return {
    maxLoanAmount,
    monthlyPayments,
    mortgageDuration: `${mortgageDuration} jaar`,
    totalCost: calculateTotalCost(monthlyPayments, numberOfPayments),
    interestSchedule,
  };
}

module.exports = {
  calculateMortgage,
  calculateMaxLoanAmount,
  calculateMonthlyPayments,
  calculateTotalCost,
  calculateInterestSchedule,
};
