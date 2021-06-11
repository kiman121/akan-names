const currentDate = new Date();
const currentYear = parseInt(currentDate.getFullYear());
const selectYear = document.querySelector(".select-year");
const selectMonth = document.querySelector(".select-month");
const selectDay = document.querySelector(".select-day");
const selectGender = document.querySelector(".select-gender");

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

function fetchAkanName (){
    let formData = {
        choosenYearValue: selectYear.value, 
        choosenMonthValue: selectMonth.value, 
        choosenDayValue: selectDay.value,
        choosenGenderValue: selectGender.value
    };
    let error = true;
    let fieldsToCheck = [];

    for(i = 0; i < Object.keys(formData).length; i++){
        let field = Object.keys(formData)[i], fieldValue = Object.values(formData)[i];
        // Remove '.validate' class
        document.querySelector('#'+field).classList.remove('validate');
        // validate
        if(fieldValue === ''){
            fieldsToCheck.push(field);
            error = false; 
        } 
    }
    console.log(fieldsToCheck);
    if(error !== true){
        for(i=0; i < fieldsToCheck.length; i++){
            document.querySelector('#'+fieldsToCheck[i]).classList.add('validate');
        }
    } else {
        
    }

}

let populateSelectDayList = (selectedYearText) => {
  const selectedYearValue = selectYear.options[selectYear.selectedIndex].value;
  const selectedMonthValue = selectMonth.options[selectMonth.selectedIndex].value;

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
