const currentDate = new Date();
const currentYear = parseInt(currentDate.getFullYear());
const selectYear = document.querySelector(".select-year");
const selectMonth = document.querySelector(".select-month");
const selectDay = document.querySelector(".select-day");
const selectGender = document.querySelector(".select-gender");
const formAlerts = document.querySelector(".form-alerts");

let yearsFrom1900 = [];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let counter = currentYear;
let i = 0;
// Get and append (to selectYear html element) years form 1900 to current year
while (counter >= 1900) {
  let option = document.createElement("option");

  option.value = i + 1;
  option.textContent = counter;
  selectYear.appendChild(option);

  counter--;
  i++;
}
// Append the months array value to selectMonth html element
for (i = 0; i < months.length; i++) {
  let option = document.createElement("option");
  option.value = i + 1;
  option.textContent = months[i];
  selectMonth.appendChild(option);
}

selectYear.addEventListener("change", (event) => {
  const selectedYearText = selectYear.options[selectYear.selectedIndex].text;

  populateSelectDayList(selectedYearText);
});

selectMonth.addEventListener("change", (event) => {
  const selectedYearText = selectYear.options[selectYear.selectedIndex].text;

  populateSelectDayList(selectedYearText);
});

function fetchAkanName() {
  let formData = {
    choosenYearValue: selectYear.value,
    choosenMonthValue: selectMonth.value,
    choosenDayValue: selectDay.value,
    choosenGenderValue: selectGender.value,
  };
  // Hide the alert div
  formAlerts.innerHTML = "";
  formAlerts.classList.remove("alert-danger", "alert-success");
  formAlerts.classList.add("hide-alert");

  let error = true;
  let fieldsToCheck = [];
  for (i = 0; i < Object.keys(formData).length; i++) {
    let field = Object.keys(formData)[i],
      fieldValue = Object.values(formData)[i];
    // Remove '.validate' class
    document.querySelector("#" + field).classList.remove("validate");
    // validate
    if (fieldValue === "") {
      fieldsToCheck.push(field);
      error = false;
    }
  }
  // Evaluate the validation outcome
  if (error !== true) {
    for (i = 0; i < fieldsToCheck.length; i++) {
      document.querySelector("#" + fieldsToCheck[i]).classList.add("validate");
    }

    formAlerts.appendChild(document.createTextNode("Fill the missing fields!"));
    formAlerts.classList.remove("hide-alert");
    formAlerts.classList.add("alert-danger");
  } else {
    let YY = parseInt(selectYear.options[selectYear.selectedIndex].text),
      MM = parseInt(formData.choosenMonthValue),
      DD = parseInt(selectDay.options[selectDay.selectedIndex].text),
      genderValue = formData.choosenGenderValue,
      dateOfBirth = new Date(MM + "/" + DD + "/" + YY),
      dayOfTheWeekIndex = dateOfBirth.getDay();
    (akanNames = []), (salutation = "");

    const daysOfTheWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    if (genderValue === "f") {
      akanNames = ["Akosua", "Adwoa", "Abenaa", "Akua", "Yaa", "Afua", "Ama"];
      salutation = "Ms";
    } else {
      akanNames = [
        "Kwasi",
        "Kwadwo",
        "Kwabena",
        "Kwaku",
        "Yaw",
        "Kofi",
        "Kwame",
      ];
      salutation = "Sir";
    }
    let weekDay = daysOfTheWeek[dayOfTheWeekIndex],
      userAkanName = akanNames[dayOfTheWeekIndex];

    // Alert user of his/her Akan name
    formAlerts.appendChild(
      document.createTextNode(
        salutation +
          ", you were born on " +
          MM +
          "/" +
          DD +
          "/" +
          YY +
          " a " +
          weekDay +
          " and your Akan name is " +
          userAkanName
      )
    );
    formAlerts.classList.remove("hide-alert");
    formAlerts.classList.add("alert-success");

    // reset the form
    selectYear.selectedIndex = null;
    selectMonth.selectedIndex = null;
    selectGender.selectedIndex = null;
    removeOptions(selectDay);
    let option = document.createElement("option");
    option.value = "";
    option.textContent = "Choose day";
    selectDay.appendChild(option);
  }
}

let populateSelectDayList = (selectedYearText) => {
  const selectedYearValue = selectYear.options[selectYear.selectedIndex].value;
  const selectedMonthValue =
    selectMonth.options[selectMonth.selectedIndex].value;

  if (selectedYearValue != 0 && selectedMonthValue != 0) {
    let choosenYear = parseInt(selectedYearText);
    let choosenMonthIndex = parseInt(selectedMonthValue);
    let numberOfDaysInAMonth = checkIfLeapYear(parseInt(choosenYear))[
      choosenMonthIndex - 1
    ];

    removeOptions(selectDay);

    let option = document.createElement("option");
    option.value = "";
    option.textContent = "Choose day";
    selectDay.appendChild(option);

    for (i = 0; i < numberOfDaysInAMonth; i++) {
      let option = document.createElement("option");
      option.value = i + 1;
      option.textContent = i + 1;
      selectDay.appendChild(option);
    }
  } else {
    let option = document.createElement("option");
    option.value = "";
    option.textContent = "Choose day";
    removeOptions(selectDay);
    selectDay.appendChild(option);
  }
};

// Remove options for the selcted input
let removeOptions = (selectInput) => {
  while (selectInput.options.length) {
    selectInput.remove(0);
  }
};
// Check if selected year is a leap year
let monthDays = [];
let checkIfLeapYear = (selectedYear) => {
  if (
    (selectedYear % 4 === 0 && selectedYear % 100 !== 0) ||
    selectedYear % 400 === 0
  ) {
    // Leap year
    monthDays = [
      "31",
      "29",
      "31",
      "30",
      "31",
      "30",
      "31",
      "31",
      "30",
      "31",
      "30",
      "31",
    ];
  } else {
    // Its not a leap year
    monthDays = [
      "31",
      "28",
      "31",
      "30",
      "31",
      "30",
      "31",
      "31",
      "30",
      "31",
      "30",
      "31",
    ];
  }

  return monthDays;
};
