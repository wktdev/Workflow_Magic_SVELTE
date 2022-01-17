import moment from 'moment'

export let stringToColour = function (str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  let colour = '#'
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff
    colour += ('00' + value.toString(16)).substr(-2)
  }
  return colour
}

export function createRepeatWeekDayDates(startDate, endDate) {
  // returns an array

  let start = moment(startDate),
    end = moment(endDate),
    day = start.day()

  let result = []
  let current = start.clone()
  result.push(start)

  while (current.day(7 + day).isBefore(end)) {
    result.push(current.clone())
  }

  let final = result.map((m) => new Date(m))

  return final
}

export function createRepeatDatesDaily(startDate, endDate) {
  // returns an array
  let dates = []

  let endDatePlusOne = moment(endDate).add(1, 'd').toDate()

  let currDate = moment(startDate)
  let lastDate = moment(endDatePlusOne)
  dates.push(currDate.clone().toDate())

  while (currDate.add(1, 'days').diff(lastDate) < 0) {
    console.log(currDate.toDate())
    dates.push(currDate.clone().toDate())
  }

  let correctedDateList = dates.slice(1) // removes first item

  return correctedDateList
}

// export function createRepeatDatesDaily(startDate, endDate) { // returns an array
//   let dates = [];

//   let currDate = moment(startDate).startOf('day');
//   let lastDate = moment(endDate).startOf('day');
//    dates.push(currDate.clone().toDate())

//   while(currDate.add(1, 'days').diff(lastDate) < 0) {
//       console.log(currDate.toDate());
//       dates.push(currDate.clone().toDate());
//   }
// console.log(dates)
//   return dates;

// }

// ?? not  sure if this works

// export function createRepeatMonthlyDayDates(startDate, endDate) { // returns an array

//   let start = moment(startDate),
//   end = moment(endDate),
//   day = start.day();;

//   let result = [];
//   let current = start.clone();
//   result.push(start)

//   while (current.day(7 + day).isBefore(end)) {
//       result.push(current.clone());
//   }

//   let final = result.map(m => new Date(m));

//   return final
// }
