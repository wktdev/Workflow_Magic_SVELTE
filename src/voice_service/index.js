let SpeechRecognition = webkitSpeechRecognition ||  SpeechRecognition ;

export let junk = "TEST OINK";

export function speechOutput(m) { 
    return new Promise((resolve) => {
        const msg = new SpeechSynthesisUtterance(m);

        speechSynthesis.speak(msg);
        msg.onend = function() {
            resolve()
        }
    });
}


export function speechInput(inputData) {
    return new Promise((resolve) => {
        let speechObj = new SpeechRecognition();
        speechObj.start();
        speechObj.onresult = function(event) {

            const current = event.resultIndex;

            let str = event.results[current][0].transcript;

            resolve(str)

        }
    });
}

// let obj = {
//     name: undefined,
//     time: undefined,
//     date: undefined
// }


// async function createNewStudentEvent() {
//     let questionOne = await speechOutput("what is the students name");
//     let answerOne = await speechInput();
//     obj["name"] = answerOne;
//     let questionTwo = await speechOutput("What date is the session");
//     let answerTwo = await speechInput();
//     obj["date"] = answerTwo;
//     let questionThree = await speechOutput("what time is the session");
//     let answerThree = await speechInput();
//     obj["time"] = answerThree;

//     console.log(obj)
// }


// window.addEventListener("click", () => {
//     createNewStudentEvent()
// });