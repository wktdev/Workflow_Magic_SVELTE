let SpeechRecognition = webkitSpeechRecognition || SpeechRecognition
import moment from 'moment'

//___________________________________________________MODULE

export let pleasureVoiceApp = (function () {
  let app = {
    // userVoiceInput: userVoiceInput,

    speechOutput: function (m) {
      return new Promise((resolve) => {
        const msg = new SpeechSynthesisUtterance(m)
        speechSynthesis.speak(msg)
        msg.onend = function () {
          resolve()
        }
      })
    },

    speechInput: function (inputData) {
      return new Promise((resolve) => {
        let speechcalendarDateVoiceInput = new SpeechRecognition()
        speechcalendarDateVoiceInput.start()
        speechcalendarDateVoiceInput.onresult = function (event) {
          const current = event.resultIndex
          let str = event.results[current][0].transcript
          resolve(str)
        }
      })
    },

    //________________________________________________________________

    booleanCheckParser(input) {},

    //________________________________________________________________

    //________________________________________________________________

    textToLowercaseParser: function (voiceEventName) {
      let result = voiceEventName.toLowerCase()
      return { title: result }
    },

    //_________________________________________________________________

    voiceEventDateParser: function (voiceInput) {
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

      function getYearOfEvent(monthNumberOfDate) {
        let date = new Date()
        let currentMonthNumber = moment().month() // moment starts months at a zero based list
        let currentYear = date.getFullYear()
        let returnedYear

        if (monthNumberOfDate < currentMonthNumber) {
          return (currentYear += 1)
        } else {
          return currentYear
        }
      }

      let lowerCaseDate = voiceInput.toLowerCase() // lower case month
      let monthName = parseMonthFromVoiceInput(months, lowerCaseDate)
      let dateOfMonth = lowerCaseDate.replace(/[^0-9]/g, '')
      let monthNumber = months[monthName] // 11
      let yearOfEvent = getYearOfEvent(monthNumber)
      let day = voiceInput.replace(/[^0-9]/g, '') // get number of day
      let numericalDay = parseInt(day)

      return {
        monthName: monthName,
        monthNumber: monthNumber,
        year: yearOfEvent,
        day: numericalDay,
      }
    },

    convertToNewDate: function (year, month, day, hours, minutes) {
      let result = new Date(year, month, day, hours, minutes)
      return result
    },

    //__________________________________________________________________

    voiceToTimeParser: function (startTime) {
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
        let originalTime = removePeriods //"7 PM";
        let upcaseTime = originalTime.toUpperCase()
        let timeNoWhiteSpace = upcaseTime.replace(/ /g, '')
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

        if (typeof answer[1] !== 'number') {
          let x = answer.unshift(0)
        }

        if (answer[2] !== ':') {
          answer.splice(2, 0, ':00')
        }

        answer.splice(answer.length - 2, 0, ' ')
        return answer.join('')
      }

      let timeVal = timeVoiceConversion(startTime)
      let convertedTime = convertTime12to24(timeVal)
      return { time: convertedTime }
    },

    eventStartTime: undefined,
    eventEndTime: undefined,

    questions: [],
    parsers: [],
    parsedData: [],

    loadQuestions: function (arr) {
      app.questions = [...arr]
    },

    loadParsers: function (arr) {
      app.parsers = [...arr]
    },

    //__________________________________________________________________

    summaryDataParse: function () {
      console.log(app.parsedData)
    },

    // createDate: function(data){

    //     let info =  {
    //         title:data[0].title;
    //         year:data[1].year;
    //         monthName:data[1].monthName;
    //         monthNumber:data[1].monthNumber;
    //         day:data[1].day;
    //         time:data[2].time;
    //       }

    //   let hr = parseInt(info.time.split(":")[0]);
    //   let min = parseInt(info.time.split(":")[1]);

    //   let timeStart = new Date(year, monthNumber - 1, day, hr, min);
    //   let timeEnd = new Date(year, monthNumber - 1, day, hr, min + 30);

    //   return {
    //       start:timeStart,
    //       end:timeEnd
    //   }

    // },

    //___________________________________________________________________

    pleasureVoiceEvent: async function (questions, parser, callback) {
      for (let i = 0; i < app.questions.length; i += 1) {
        callback(questions[i])
        let questionResult = await app.speechOutput(app.questions[i])
        let result = await app.speechInput()
        app.parsedData.push(app.parsers[i](result))
        console.log('PV_log')
      }

      callback(app.parsedData)

      return app.parsedData
    },

    send: async function (callback) {
      callback(app.parsedData)
    },

    summary: async function (data, message, thankYou, callback) {
      let questionResult = await app.speechOutput(message)
      let answer = await app.speechInput()

      console.log('answer', answer)
      if (answer === 'yes' || answer.includes('yes')) {
        await app.speechOutput(thankYou)
        callback(data)
      } else {
        await app.speechOutput(
          'The data ha not been submitted. Please try again',
        )
      }

      // //     await app.speechOutput(confirmation);
      //     callback(data)
    },



    summaryParser:function(data){

        let title = data[0].title;
        let year = data[1].year;
        let monthName = data[1].monthName;
        let monthNumber = data[1].monthNumber;
        let day = data[1].day;
        let time = data[2].time;
    
        console.log(app.data);
    
        return `Is the following summary of the information you submitted correct? 
            The title of the event is ${title}. The month and day is ${monthName} ${day}. 
            The start time of the event is ${time} `;

    },

    run: async function (data, parser, callback) {
      let result = await app.pleasureVoiceEvent(data, parser, callback)

      return result
    },
  }

  return app
})()

//______________________________________________________________END MODULE

//______________________________________________________________BEGIN app

/*

let app = pleasureVoiceApp;
app.loadQuestions(["What is the title of the event?", "What is the date of the event", "What time is the event" ]); // []
app.loadParsers([app.textToLowercaseParser, app.voiceEventDateParser, app.voiceToTimeParser]) // []




async function test() {
    await app.run(app.questions, app.parsers, (questions, answers, results) => {
        console.log("questions", questions);
        console.log("answers", answers);
        console.log("results", results);
    })

    await app.summary(()=>{

        console.log("submitted to database",app.parsedData)

    });
}

*/

// window.addEventListener("click", async () => {

//     test();

// });
