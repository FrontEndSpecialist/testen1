// const calculateMortgage = require("./mortgageCalculator");

document.addEventListener("DOMContentLoaded", function () {
  const calculateButton = document.getElementById("calculateButton");

  calculateButton.addEventListener("click", function () {
    const income = document.getElementById("income").value;
    const partnerIncome = document.getElementById("partnerIncome").value;
    const mortgageDuration = document.getElementById("mortgageDuration").value;
    const hasStudentLoan = document.getElementById("hasStudentLoan").checked;
    const zipcode = document.getElementById("zipcode").value;

    const {
      maxLoanAmount,
      monthlyPayments,
      mortgageDuration: mortgageDurationText,
      totalCost,
      interestSchedule,
      error,
    } = calculateMortgage(
      income,
      partnerIncome,
      mortgageDuration,
      hasStudentLoan,
      zipcode
    );

    if (error) {
      alert(error);
      return;
    }

    document.getElementById("maxLoanAmount").textContent = `€${maxLoanAmount}`;
    document.getElementById(
      "monthlyPayments"
    ).textContent = `€${monthlyPayments}`;
    document.getElementById("mortgageDurationText").textContent =
      mortgageDurationText;
    document.getElementById("totalCost").textContent = `€${totalCost}`;

    const interestScheduleList = document.getElementById("interestSchedule");
    interestScheduleList.innerHTML = "";
    interestSchedule.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = `Maand ${
        item.month
      }: Rente - €${item.interestPayment.toFixed(
        2
      )}, Aflossing - €${item.principalPayment.toFixed(2)}`;
      interestScheduleList.appendChild(listItem);
    });
  });
});
