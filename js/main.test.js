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
    expect(result).toBeCloseTo(32000.0, 2); // Aangepaste precisie
  });

  it("should handle student loan", () => {
    const result = calculateMaxLoanAmount(5000, 3000, true);
    expect(result).toBeCloseTo(24000.0, 2); // Aangepaste precisie
  });
});

describe("calculateMonthlyPayments", () => {
  it("should calculate monthly payments correctly", () => {
    const result = calculateMonthlyPayments(32000, 20);
    expect(result.monthlyPayments).toBeCloseTo(202.44780039039065, 2); // Aangepaste precisie
    expect(result.numberOfPayments).toEqual(240); // Controleren of het juiste aantal betalingen is berekend
    expect(result.interestRate).toBeCloseTo(0.045, 2); // Aangepaste precisie
  });
});

describe("calculateTotalCost", () => {
  it("should calculate total cost correctly", () => {
    const result = calculateTotalCost(204.47227839429456, 240);
    expect(result).toBeCloseTo(49073.3468146307, 2); // Aangepaste precisie
  });
});

describe("calculateInterestSchedule", () => {
  it("should calculate interest schedule correctly", () => {
    const result = calculateInterestSchedule(32000, 240, 0.045 / 12);
    expect(result.length).toEqual(240);
    expect(result[0].month).toEqual(1);
    expect(result[0].interestPayment).toBeCloseTo(120.0, 2); // Aangepaste precisie
    expect(result[0].principalPayment).toBeCloseTo(13.333333333333343, 2); // Aangepaste precisie
  });
});

describe("Integration Tests", () => {
  // Integration Test 1: Bereken de hypotheek met verzekering
  it("should calculate mortgage with insurance", () => {
    const result = calculateMortgage(5000, 3000, 20, false, "12345", true);
    expect(result.maxLoanAmount).toBeCloseTo(32000.0, 2); // Aangepaste precisie
    expect(result.monthlyPayments).toBeCloseTo(202.45, 2); // Aangepaste precisie
    expect(result.mortgageDuration).toEqual("20 jaar");
    expect(result.totalCost).toBeCloseTo(48587.47209369376, 2); // Aangepaste precisie
  });

  // Integration Test 2: Bereken de hypotheek zonder verzekering
  it("should calculate mortgage without insurance", () => {
    const result = calculateMortgage(5000, 3000, 20, false, "12345", false);
    expect(result.maxLoanAmount).toBeCloseTo(32000.0, 2); // Aangepaste precisie
    expect(result.monthlyPayments).toBeCloseTo(202.45, 2); // Aangepaste precisie
    expect(result.mortgageDuration).toEqual("20 jaar");
    expect(result.totalCost).toBeCloseTo(48587.47209369376, 2); // Aangepaste precisie
  });

  // Integration Test 3: Behandeling van foutmelding
  it("should calculate mortgage without partner income and with insurance", () => {
    const income = 5000; // Vul het maandinkomen in
    const partnerIncome = 0; // Geen partnerinkomen
    const mortgageDuration = 20; // Selecteer een rentevaste periode
    const hasStudentLoan = true; // "Heeft u een studieschuld?" is aangevinkt
    const zipcode = "12345"; // Voer een postcode in

    const result = calculateMortgage(
      income,
      partnerIncome,
      mortgageDuration,
      hasStudentLoan,
      zipcode
    );

    expect(result.maxLoanAmount).toBeCloseTo(15000, 2); // Aangepaste precisie
    expect(result.monthlyPayments).toBeCloseTo(94.89740643299561, 2); // Aangepaste precisie
  });
});
