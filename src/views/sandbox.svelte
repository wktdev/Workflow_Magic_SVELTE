<script>
  //createNewPleasureVoiceCalendarEvent
  import { pleasureVoiceEvent } from "../pleasure_voice_api/pv_sandbox";
  import { parseVoiceEventName } from "../pleasure_voice_api/pv_sandbox";
  import { parseVoiceEventDate } from "../pleasure_voice_api/pv_sandbox";
  import { parseVoiceStartTime } from "../pleasure_voice_api/pv_sandbox";
  

  import { onMount } from "svelte";
  import moment from "moment";

  onMount(function () {});


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
    pleasureVoiceEvent(questions, parserFunctions, (index,data) => {
		
	   
		console.log(index)
 
    });
  }}
>
  Click me
</div>
