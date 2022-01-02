<script>
  //createNewPleasureVoiceCalendarEvent
  import { pleasureVoiceApp } from "../pleasure_voice_api/pleasurevoice";

  import { createCalendarEvent } from "../storageAPI/indexedDB";

  import { Button, Overlay, MaterialApp } from "svelte-materialify";
  $: active = false;

  import { onMount } from "svelte";

  import moment from "moment";

  onMount(function () {});

  $: test = text;
  let text = "";

  // let questions = [
  //   "What is the name of the event?",
  //   "What date is the event?",
  //   "what time is the event",
  //   "Here is a summary of the calendar information you provided. Is it correct?",
  // ];

  // function parseSummary(data) {
  //   return data;
  // }

  // let parserFunctions = [
  //   parseVoiceEventName,
  //   parseVoiceEventDate,
  //   parseVoiceStartTime,
  //   parseSummary,
  // ];

  async function pleasureVoice(finalCB) {

    let app = pleasureVoiceApp;
    app.loadQuestions([
      "What is the title of the event?",
      "What is the date of the event",
      "What time is the event",
    ]); // []
    app.loadParsers([
      app.textToLowercaseParser,
      app.voiceEventDateParser,
      app.voiceToTimeParser,
    ]); // []

    let data = await app.run(
      app.questions,
      app.parsers,
      (info) => {
        console.log("questions", info);
 

        text = info
      }
    );


    let title = data[0].title;
    let year = data[1].year;
    let monthName = data[1].monthName;
    let monthNumber = data[1].monthNumber;
    let day = data[1].day;
    let time = data[2].time;

    console.log(app.data);

    text = `Is the following summary of the information you submitted correct? 
        The title of the event is ${title}. The month and day is ${monthName} ${day}. 
        The start time of the event is ${time} `;

    
      console.log("submitted to database", app.parsedData);

      let hr = parseInt(time.split(":")[0]);
      let min = parseInt(time.split(":")[1]);

      let timeStart = new Date(year, monthNumber - 1, day, hr, min);
      let timeEnd = new Date(year, monthNumber - 1, day, hr, min + 30);

      await createCalendarEvent(timeStart, timeEnd, title, "", true, true, "time", 1);
     
      // active = false;
 
    finalCB();
  }
</script>

<!-- <div
  on:click={() => {
    pleasureVoiceEvent(questions, parserFunctions, (index) => {
      console.log(index);

  text = index
    }).then((data) => {
      console.log(data);
    });
  }}
> -->

<MaterialApp>
  <div class="text-center">
    <Button
      class="red white-text"
      on:click={() => {
        active = true;

        pleasureVoice(() => {
          active = false;
        });
      }}
    >
      Show Overlay
    </Button>
  </div>

  <Overlay
    {active}
    on:click={() => {
      active = false;
    }}
  >
    {test}
  </Overlay>
</MaterialApp>
