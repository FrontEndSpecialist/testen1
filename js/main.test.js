// mortgageCalculator.test.js

const {
  calculateMaxLoanAmount,
  calculateMonthlyPayments,
  calculateTotalCost,
  calculateInterestSchedule,
  calculateMortgage,
} = require("./mortgageCalculator");

describe("calculateMaxLoanAmount", () => {
  it("should calculate max loan amount correctly", () => {
    const result = calculateMaxLoanAmount(5000, 3000, false);
    expect(result).toBeCloseTo(32000.0, 2);
  });

  it("should handle student loan", () => {
    const result = calculateMaxLoanAmount(5000, 3000, true);
    expect(result).toBeCloseTo(24000.0, 2);
  });
});

describe("calculateMonthlyPayments", () => {
  it("should calculate monthly payments correctly", () => {
    const result = calculateMonthlyPayments(32000, 20);
    expect(result.monthlyPayments).toBeCloseTo(202.44780039039065, 2);
    expect(result.numberOfPayments).toEqual(240);
    expect(result.interestRate).toBeCloseTo(0.045, 2);
  });
});

describe("calculateTotalCost", () => {
  it("should calculate total cost correctly", () => {
    const result = calculateTotalCost(204.47227839429456, 240);
    expect(result).toBeCloseTo(49073.3468146307, 2);
  });
});

describe("calculateInterestSchedule", () => {
  it("should calculate interest schedule correctly", () => {
    const result = calculateInterestSchedule(32000, 240, 0.045 / 12);
    expect(result.length).toEqual(240);
    expect(result[0].month).toEqual(1);
    expect(result[0].interestPayment).toBeCloseTo(120.0, 2);
    expect(result[0].principalPayment).toBeCloseTo(13.333333333333343, 2);
  });
});

describe("Integration Tests", () => {
  it("should calculate mortgage with insurance", () => {
    const result = calculateMortgage(5000, 3000, 20, false, "12345", true);
    expect(result.maxLoanAmount).toBeCloseTo(32000.0, 2);
    expect(result.monthlyPayments).toBeCloseTo(202.45, 2);
    expect(result.mortgageDuration).toEqual("20 jaar");
    expect(result.totalCost).toBeCloseTo(48587.47209369376, 2);
  });

  it("should calculate mortgage without insurance", () => {
    const result = calculateMortgage(5000, 3000, 20, false, "12345", false);
    expect(result.maxLoanAmount).toBeCloseTo(32000.0, 2);
    expect(result.monthlyPayments).toBeCloseTo(202.45, 2);
    expect(result.mortgageDuration).toEqual("20 jaar");
    expect(result.totalCost).toBeCloseTo(48587.47209369376, 2);
  });

  it("should calculate mortgage without partner income and with insurance", () => {
    const income = 5000;
    const partnerIncome = 0;
    const mortgageDuration = 20;
    const hasStudentLoan = true;
    const zipcode = "12345";

    const result = calculateMortgage(
      income,
      partnerIncome,
      mortgageDuration,
      hasStudentLoan,
      zipcode
    );

    expect(result.maxLoanAmount).toBeCloseTo(15000, 2);
    expect(result.monthlyPayments).toBeCloseTo(94.89740643299561, 2);
  });
});
