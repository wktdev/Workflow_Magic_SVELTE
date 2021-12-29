import moment from 'moment'

let SpeechRecognition = webkitSpeechRecognition ?? SpeechRecognition

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
      console.log('Speech input', str)
      resolve(str)
    }
  })
}




export async function pleasureVoiceEvent(questions, parserList,callback) {
  let parsedData = []

  for (let i = 0; i < questions.length; i++) {
    let question = await speechOutput(questions[i]);
    let result = await speechInput();
    parsedData.push(parserList[i](result))
     
  }
  
  callback(parsedData)
}

// export async function pleasureVoiceEvent(questions, callback) {
//   let items = []
//   console.log(questions)
//   for (let i = 0; i < questions.length; i++) {
//     let obj = {}
//     callback(questions[i], items[i].answer)

//     obj.question = await speechOutput(questions[i])
//     obj.answer = await speechInput()
//   }

//   console.log(items)
// }
