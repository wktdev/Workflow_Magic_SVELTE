<script>
  //createNewPleasureVoiceCalendarEvent
  import { pleasureVoiceEvent } from "../pleasure_voice_api/pv_sandbox";
  import { onMount } from "svelte";
  import moment from "moment";

  onMount(function () {});

  //_____________________________________________________________BEGIN parse name of event

  function parseVoiceEventName(voiceEventName) {
    let result = voiceEventName.toLowerCase();
    return result;
  }

  //_____________________________________________________________END parse name of event

  //_____________________________________________________________BEGIN parse date of event

  function parseVoiceEventDate(voiceInput) {
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
    };

    //____________________________________________________________________START functions
    // months @takes an object of months with the key the month name and the value the month number
    // monthAndDayVoiceInput @ takes a string with a month name in it such as "December 15"
    // This functions parses out the month name from a string
    function parseMonthFromVoiceInput(months, monthAndDayVoiceInput) {
      let bool = false;
      let prop = undefined;
      for (prop in months) {
        if (monthAndDayVoiceInput.includes(prop)) {
          return prop;
        }
      }
      return prop;
    }

    function getYearOfEvent(monthNumberOfDate) {
      let date = new Date();
      let currentMonthNumber = moment().month() + 1; // moment starts months at a zero based list
      let currentYear = date.getFullYear();
      let returnedYear;

      console.log(currentMonthNumber);

      if (monthNumberOfDate < currentMonthNumber) {
        return (currentYear += 1);
      } else {
        return currentYear;
      }
    }

    let lowerCaseDate = voiceInput.toLowerCase(); // lower case month
    let monthName = parseMonthFromVoiceInput(months, lowerCaseDate);
    let dateOfMonth = lowerCaseDate.replace(/[^0-9]/g, "");
    let monthNumber = months[monthName]; // 11
    let yearOfEvent = getYearOfEvent(monthNumber);
    console.log(yearOfEvent, "year of event");
    let day = voiceInput.replace(/[^0-9]/g, ""); // get number of day
    let numericalDay = parseInt(day);

    return {
      monthName: monthName,
      monthNumber: monthNumber,
      year: yearOfEvent,
    };
  }

  //______________________________________________________________END parse date of event

  function parseVoiceStartTime(startTime) {


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
      console.log(removePeriods, "PERIODS");
      let originalTime = removePeriods; //"7 PM";
      let upcaseTime = originalTime.toUpperCase();
      let timeNoWhiteSpace = upcaseTime.replace(/ /g, "");
      console.log(timeNoWhiteSpace);
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

      console.log(answer);
      if (typeof answer[1] !== "number") {
        let x = answer.unshift(0);
        console.log(answer);
      }

      if (answer[2] !== ":") {
        answer.splice(2, 0, ":00");
      }

      answer.splice(answer.length - 2, 0, " ");
      return answer.join("");
    }



    

	let timeVal = timeVoiceConversion(startTime);
	console.log(timeVal, "pre 24 hour");
    let convertedTime = convertTime12to24(timeVal);
	return {time:convertedTime}
  }

  let questions = [
    "What is the name of the event?",
    "What date is the event?",
    "what time is the event",
  ];

  let parserFunctions = [
    parseVoiceEventName,
    parseVoiceEventDate,
    parseVoiceStartTime,
  ];
  
</script>

<div
  on:click={() => {
    pleasureVoiceEvent(questions, parserFunctions, (parsedStuff) => {
      console.log(parsedStuff);
    });
  }}
>
  Click me
</div>
