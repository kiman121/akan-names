const currentDate = new Date();
const currentYear = parseInt( currentDate.getFullYear());
const selectYear = document.querySelector('.select-year');
const selectMonth = document.querySelector('.select-month');

let yearsFrom1900 = [];
let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August','September', 'October', 'November','December'];

let counter = currentYear;
let i = 0;
// Get years form 1900 to current year
while (counter >= 1900){ 
    let option = document.createElement('option');
    
    option.value = i;
    option.textContent = counter;
    selectYear.appendChild(option);

    counter --;
    i++;
}
// Push the months array value to selectMonth html element
for(i = 0; i < months.length; i++){
    let option = document.createElement('option');
    option.value = i;
    option.textContent = months[i];
    selectMonth.appendChild(option);
}
//
let monthDays = [];
let checkIfLeapYear = (selectedYear) => {
    if(((selectedYear % 4 === 0) && (selectedYear % 100 !== 0 )) || (selectedYear % 400 === 0)){
        // Leap year
        monthDays = ['31', '29', '31', '30', '31', '30', '31', '31', '30', '31', '30', '31'];
    } else{
        monthDays = ['31', '28', '31', '30', '31', '30', '31', '31', '30', '31', '30', '31'];
    } 
}