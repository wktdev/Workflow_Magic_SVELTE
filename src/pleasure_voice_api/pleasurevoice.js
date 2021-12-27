import moment from 'moment';


let SpeechRecognition = webkitSpeechRecognition || SpeechRecognition

let months = {
  january: 1,
  february: 2,
  march: 3,
  april: 4,
  may: 5,
  june: 6,
  july: 7,
  august: 8,
  september: 9,
  october: 10,
  november: 11,
  december: 12,
}

//____________________________________________________________________START functions
// months @takes an object of months with the key the month name and the value the month number
// monthAndDayVoiceInput @ takes a string with a month name in it such as "December 15"
// This functions parses out the month name from a string
function parseMonthFromVoiceInput(months, monthAndDayVoiceInput) {
  let bool = false
  let prop = undefined
  for (prop in months) {
    if (monthAndDayVoiceInput.includes(prop)) {
      return prop
    }
  }
  return prop
}

/* monthNumberOfDate@ Type number (of month)*/
/* function determines if the voice slected month is for this year or next year */

function getYearOfEvent(monthNumberOfDate) {
  let date = new Date()
  let currentMonthNumber = moment().month() + 1 // moment starts months at a zero based list
  let currentYear = date.getFullYear()
  let returnedYear

  console.log(currentMonthNumber)

  if (monthNumberOfDate < currentMonthNumber) {
    return (currentYear += 1)
  } else {
    return currentYear
  }
}

const convertTime12to24 = (time12h) => {
  const [time, modifier] = time12h.split(' ')

  let [hours, minutes] = time.split(':')

  if (hours === '12') {
    hours = '00'
  }

  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12
  }

  return `${hours}:${minutes}`
}

function timeVoiceConversion(time) {
  let removePeriods = time.replace(/\./g, '')

  console.log(removePeriods, 'PERIODS')

  let originalTime = removePeriods //"7 PM";
  let upcaseTime = originalTime.toUpperCase()
  let timeNoWhiteSpace = upcaseTime.replace(/ /g, '')
  console.log(timeNoWhiteSpace)
  let splitTime = timeNoWhiteSpace.split('')

  let answer = splitTime.map((val, index, arr) => {
    let unTouched = val
    let result = parseInt(val)

    if (isNaN(result)) {
      return val
    } else {
      return result
    }
  })

  console.log(answer)
  if (typeof answer[1] !== 'number') {
    let x = answer.unshift(0)
    console.log(answer)
  }

  if (answer[2] !== ':') {
    answer.splice(2, 0, ':00')
  }

  answer.splice(answer.length - 2, 0, ' ')
  return answer.join('')
}

//______________________________________________________________________END functions

function speechOutput(m) {
  return new Promise((resolve) => {
    const msg = new SpeechSynthesisUtterance(m)

    speechSynthesis.speak(msg)
    msg.onend = function () {
      resolve()
    }
  })
}

function speechInput(inputData) {
  return new Promise((resolve) => {
    let speechcalendarDateVoiceInput = new SpeechRecognition()
    speechcalendarDateVoiceInput.start()
    speechcalendarDateVoiceInput.onresult = function (event) {
      const current = event.resultIndex

      let str = event.results[current][0].transcript

      resolve(str)
    }
  })
}

let calendarDateVoiceInput = {
  name: undefined,
  time: undefined,
  date: undefined,
}

let calendarDateSchema = {
  year: undefined,
  month: undefined,
  day: undefined,
  time: undefined,
  name: undefined,
}

export async function createNewPleasureVoiceCalendarEvent() {
  let questionOne = await speechOutput('what is the students name')
  let answerOne = await speechInput()
  calendarDateVoiceInput['name'] = answerOne
  let questionTwo = await speechOutput('What date is the session')
  let answerTwo = await speechInput()
  calendarDateVoiceInput['date'] = answerTwo
  let questionThree = await speechOutput('what time is the session')
  let answerThree = await speechInput()
  calendarDateVoiceInput['time'] = answerThree

  console.log(calendarDateVoiceInput.time)

  //____________________convert voice input data to lower case

  let monthAndDayLowerCasePreDatabase = calendarDateVoiceInput.date.toLowerCase() // lower case month
  let studentNameLowerCasePreDatabase = calendarDateVoiceInput.name.toLowerCase() // lower case month
  //________________________________________________________________

  //_______________________________________________________________BEGIN get month example "april"
  let monthName = parseMonthFromVoiceInput(
    months,
    monthAndDayLowerCasePreDatabase,
  )

  //________________________________________________________________END get month

  //________________________________________________________________BEGIN get date of month example "12"
  let dateOfMonth = monthAndDayLowerCasePreDatabase.replace(/[^0-9]/g, '')

  console.log(monthName)

  //_________________________________________________________________END get date of month

  //_________________________________________________________________BEGIN determine year

  /* NOTE is month less that or greater than current month?
   If less that the year is incremented by 1 
*/


  let monthNumber = months[monthName] // 11

  let yearOfEvent = getYearOfEvent(monthNumber)


  console.log(yearOfEvent,"year of event")
  //_________________________________________________________________END determine year

  //________________________________________________________________BEGIN get numericDay

  let day = calendarDateVoiceInput.date.replace(/[^0-9]/g, '') // get number of day
  let numericalDay = parseInt(day)

  //_________________________________________________________________EMD

  //____BEGIN time conversion

  // 11:00 pm

  let timeVal = timeVoiceConversion(calendarDateVoiceInput.time)

  console.log(timeVal, 'pre 24 hour')
  let convertedTime = convertTime12to24(timeVal)

  //____END time conversion

  calendarDateSchema.name = studentNameLowerCasePreDatabase
  calendarDateSchema.day = numericalDay
  calendarDateSchema.month = { monthNumber: monthNumber, monthName: monthName }
  calendarDateSchema.time = convertedTime
  calendarDateSchema.year = yearOfEvent
  
  console.log(calendarDateSchema)
}



// day: 2
// month: {monthNumber: 1, monthName: 'january'}
// name: "somebody"
// time: "07:00"
// year: 2022

//'++id,calendarId,start,end,title,location,isPrivate,isAllDay,category,clientId',