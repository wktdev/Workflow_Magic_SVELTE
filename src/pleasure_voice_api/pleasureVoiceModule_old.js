let SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;





//___________________________________________________MODULE

let pleasureVoiceApp = (function Module(userVoiceInput) {

    let app = {

        userVoiceInput: userVoiceInput,

        speechOutput: function(m) {
            return new Promise((resolve) => {
                const msg = new SpeechSynthesisUtterance(m);
                speechSynthesis.speak(msg)
                msg.onend = function() {
                    resolve()
                }
            })
        },

        speechInput: function(inputData) {
            return new Promise((resolve) => {
                let speechcalendarDateVoiceInput = new SpeechRecognition()
                speechcalendarDateVoiceInput.start()
                speechcalendarDateVoiceInput.onresult = function(event) {
                    const current = event.resultIndex
                    let str = event.results[current][0].transcript
                    resolve(str)
                }
            })
        },

        //________________________________________________________________


       booleanCheckParser(input){

       },

        //________________________________________________________________

        //________________________________________________________________

        textToLowercaseParser: function(voiceEventName) {
            let result = voiceEventName.toLowerCase();
            return { title: result }

        },

        //_________________________________________________________________



        VoiceEventDateParser: function(voiceInput) {
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
                let currentMonthNumber = moment().month() + 1 // moment starts months at a zero based list
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
                day: numericalDay
            }
        },





        //__________________________________________________________________

        voiceToTimeParser: function(startTime) {
            const convertTime12to24 = (time12h) => {
                const [time, modifier] = time12h.split(" ");
                let [hours, minutes] = time.split(":");
                if (hours === "12") {
                    hours = "00";
                }

                if (modifier === "PM") {
                    hours = parseInt(hours, 10) + 12;
                }
                return `${hours}:${minutes}`;
            };

            function timeVoiceConversion(time) {
                let removePeriods = time.replace(/\./g, "");
                let originalTime = removePeriods; //"7 PM";
                let upcaseTime = originalTime.toUpperCase();
                let timeNoWhiteSpace = upcaseTime.replace(/ /g, "");
                let splitTime = timeNoWhiteSpace.split("");

                let answer = splitTime.map((val, index, arr) => {
                    let unTouched = val;
                    let result = parseInt(val);
                    if (isNaN(result)) {
                        return val;
                    } else {
                        return result;
                    }
                });


                if (typeof answer[1] !== "number") {
                    let x = answer.unshift(0);

                }

                if (answer[2] !== ":") {
                    answer.splice(2, 0, ":00");
                }

                answer.splice(answer.length - 2, 0, " ");
                return answer.join("");
            }

            let timeVal = timeVoiceConversion(startTime);
            let convertedTime = convertTime12to24(timeVal);
            return { time: convertedTime };
        },



        //__________________________________________________________________


        summary:async function(yesNoQuestion,trueResponse,falseResponse,callback){
            let questionResult = await app.speechOutput(yesNoQuestion);
            let result = await app.speechInput();
            console.log(result)

            // if(response){
            //    callback()
            
            //    return true
            // }

        },



        parsedData: [],

        pleasureVoiceEvent: async function(question,parser,callback) {
            let questionResult = await app.speechOutput(question);
            let result = await app.speechInput();
            app.parsedData.push(parser(result));
            console.log(app.parsedData)
             
             if(callback){
                callback(app.parsedData)
             }

             return app.parsedData
        },


        send: async function(callback){
            
            callback(app.parsedData)

        },


        run: async function(data,parser,callback) {
            await app.pleasureVoiceEvent(data,parser,callback);

        }

    }


    return app

})();

//______________________________________________________________END MODULE



//______________________________________________________________BEGIN app

let app = pleasureVoiceApp;

async function test(){
     await app.run("what is the event",app.textToLowercaseParser);
     await app.run("what is your name",app.textToLowercaseParser);
     await app.summary("Is the following information correct?");
     await app.send((data)=>{

        console.log(data)
     });
}

window.addEventListener("click", async () => {

    test()

});

