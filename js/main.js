var yearsFrom1900 = [];
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August','September', 'October', 'November','December'];
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
    
var startYear = 1900;

for(i=0, i < currentYear; i++){
    yearsFrom1900.push(startYear++);
    startYear++;
}

console.log(yearsFrom1900);
/* January - 31 days
February - 28 days in a common year and 29 days in leap years
March - 31 days
April - 30 days
May - 31 days
June - 30 days
July - 31 days
August - 31 days
September - 30 days
October - 31 days
November - 30 days
December - 31 days */