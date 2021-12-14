// const btn = document.querySelector(".talk");
// const content = document.querySelector('.content');
// var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition


// var speechObj = new SpeechRecognition();

// speechObj.onstart = function() {

//     console.log("working....................")

// }

// function parseTextToObj(str) {
//     let answer = str.split(" ");

//     let obj = {}
//     let prev = undefined;
//     for (let i = 0; i < answer.length; i += 1) {
       

//         if (answer[i] === "event" || answer[i] === "time" || answer[i] === "date" || answer[i] === "Event" || answer[i] === "Time" || answer[i] === "Date") {

//             prev = answer[i]
//             obj[prev] = "";
//         } else {
//             obj[prev] += answer[i];
//         }


//     }

//     return obj

// }

// speechObj.onresult = function(event) {

//     const current = event.resultIndex;

//     console.log(current)

//     console.log(event.results[current][0].transcript)

//     let str = event.results[current][0].transcript;

//     console.log(parseTextToObj(str) )

// }

// var synth = window.speechSynthesis;



let SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
let speechObj = new SpeechRecognition();


let questions = [{name:"What is the students name"},{time:"what time is the session"},{date:"What day is the session"}]

function askQuestion(question){
     const utterance = new SpeechSynthesisUtterance(question);
     speechSynthesis.speak(utterance);
}





window.addEventListener("click", () => {

      
let calendarData = questions.map((val,index,arr)=>{
        const utterance = new SpeechSynthesisUtterance(question);
     speechSynthesis.speak(utterance);
     return val

});

});


// function captureUserReply() {
//     utterance.addEventListener('end', function(event) {
//         console.log('Utterance has finished being spoken after ' + event.elapsedTime + ' seconds.');

//         speechObj.start();

//         speechObj.onresult = function(event) {

//             const current = event.resultIndex;

//             console.log(current)

//             console.log(event.results[current][0].transcript)

//             let str = event.results[current][0].transcript;

//             console.log(str)

//         }
//     });

// }







// window.addEventListener('click', event => {
//     event.preventDefault();

//     const utterance = new SpeechSynthesisUtterance("What is the students name");
//     speechSynthesis.speak(utterance);

//     utterance.addEventListener('end', function(event) {
//         console.log('Utterance has finished being spoken after ' + event.elapsedTime + ' seconds.');

//         speechObj.start();


//     });

// });


// speechObj.onstart = function() {

//     console.log("working....................")

// }


// speechObj.onresult = function(event) {

//     const current = event.resultIndex;

//     console.log(current)

//     console.log(event.results[current][0].transcript)

//     let str = event.results[current][0].transcript;

//     console.log(str)

// }




// btn.addEventListener("click", () => {

//     speechObj.start();

// })