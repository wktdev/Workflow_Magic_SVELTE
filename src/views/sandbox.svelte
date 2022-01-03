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

  //______________________________________________________________
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

    let data = await app.run(app.questions, app.parsers, async (data) => {
      if (typeof data === "string") {
        text = data;
      } else {
        let title = data[0].title;
        let year = data[1].year;
        let monthName = data[1].monthName;
        let monthNumber = data[1].monthNumber;
        let day = data[1].day;
        let time = data[2].time;

  
        text = `The following is a summary of the information you submitted. 
        The title of the event is ${title}. The month and day is ${monthName} ${day}. 
        The start time of the event is ${time}. If this is correct please say yes`;

        let questionResult =
          await app.speechOutput(text);
        let result = await app.speechInput();

        if (result === "yes") {
          await app.speechOutput("Thank you your data is being submitted");
          

        

          let hr = parseInt(time.split(":")[0]);
          let min = parseInt(time.split(":")[1]);

          let timeStart = new Date(year, monthNumber - 1, day, hr, min);
          let timeEnd = new Date(year, monthNumber - 1, day, hr, min + 30);

          await createCalendarEvent(
            timeStart,
            timeEnd,
            title,
            "",
            true,
            true,
            "time",
            1
          ).then(()=>{
            active = false;
          })
        }
      }
    });
  }
</script>

<MaterialApp>
  <div class="text-center">
    <Button
      class=""
      on:click={() => {
        active = true;

        pleasureVoice();
      }}
    >
      Create Event Using Pleasure Voice Service
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
