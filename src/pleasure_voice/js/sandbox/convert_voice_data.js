


// let months = {

//     "january": 1,
//     "february": 2,
//     "march":3,
//     "april":4,
//     "may":5,
//     "june":6,
//     "july":7,
//     "august":8,
//     "september":9,
//     "october":10,
//     "november":11,
//     "december":12
// }



// //____________________________________________________________________START functions
// // months @takes an object of months with the key the month name and the value the month number
// // monthAndDayVoiceInput @ takes a string with a month name in it such as "December 15"
// // This functions parses out the month name from a string
// function parseMonthFromVoiceInput(months,monthAndDayVoiceInput ) { 
//     let bool = false;
//     let prop= undefined;
//     for (prop in months) {

//         if (monthAndDayVoiceInput .includes(prop)) {
//             bool = true
//         }
//     }
//     return prop
// }


//  /* monthNumberOfDate@ Type number (of month)*/
//  /* function determines if the voice slected month is for this year or next year */

// function getYearOfEvent(monthNumberOfDate) {    
//     let date = new Date();
//     let currentMonthNumber = moment().month() + 1; // moment starts months at a zero based list
//     let currentYear = date.getFullYear();
//     let returnedYear;

//     console.log(currentMonthNumber)

//     if (monthNumberOfDate < currentMonthNumber) {

//         return currentYear += 1;

//     } else {

//         return currentYear
//     }

// }


// //______________________________________________________________________END functions


// let calendarDateVoiceInput = {   // example data

//     date: "November 12th",
//     name: "Cindy Martinez",
//     time: "9 p.m."

// }




// //____________________convert voice input data to lower case

// let monthAndDayLowerCasePreDatabase = calendarDateVoiceInput.date.toLowerCase(); // lower case month
// let studentNameLowerCasePreDatabase = calendarDateVoiceInput.name.toLowerCase(); // lower case month
// //________________________________________________________________


// //_______________________________________________________________BEGIN get month example "april"
// let monthName = parseMonthFromVoiceInput(months,monthAndDayLowerCasePreDatabase)

// //________________________________________________________________END get month

// //________________________________________________________________BEGIN get date of month example "12"
// let dateOfMonth = monthAndDayLowerCasePreDatabase.replace(/[^0-9]/g,'');

// //_________________________________________________________________END get date of month


// //_________________________________________________________________BEGIN determine year

// /* NOTE is month less that or greater than current month?
//    If less that the year is incremented by 1 
// */

// let monthNumber = months[monthName]; // 11

// let yearOfEvent = getYearOfEvent(monthNumber);

// console.log(yearOfEvent)
// //_________________________________________________________________END determine year

// //________________________________________________________________BEGIN get numericDay

// let day = calendarDateVoiceInput.date.replace(/[^0-9]/g,''); // get number of day
// let numericalDay = parseInt(day)


// //_________________________________________________________________END get numberic day


// //______BEGIN assemble schema

// let calendarDateSchema = {
//     year:undefined,
//     month:undefined,
//     day:undefined,
//     time:undefined,
//     name:undefined,
    
// };



// function createCelendarEntry() {

//     let calendarDateSchema = {
//         year: undefined,
//         month: undefined,
//         day: undefined,
//         time: undefined,
//         name: undefined,

//     };


// }


// //______END assemble schema