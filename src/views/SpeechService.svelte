<div>TEST SPEECH COMP</div>



<script>

let SpeechRecognition = webkitSpeechRecognition ||  SpeechRecognition ;


function speechOutput(m) { 
    return new Promise((resolve) => {
        const msg = new SpeechSynthesisUtterance(m);

        speechSynthesis.speak(msg);
        msg.onend = function() {
            resolve()
        }
    });
}





function speechInput(inputData) {
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

let obj = {
    name: undefined,
    time: undefined,
    date: undefined
}


async function createNewStudentEvent() {
    let questionOne = await speechOutput("what is the title of the event");
    let answerOne = await speechInput();
    obj["name"] = answerOne;
    let questionTwo = await speechOutput("What date is the event");
    let answerTwo = await speechInput();
    obj["date"] = answerTwo;
    let questionThree = await speechOutput("what time is the event");
    let answerThree = await speechInput();
    obj["time"] = answerThree;

    console.log(obj)
}


window.addEventListener("click", () => {
    createNewStudentEvent()
});
</script>