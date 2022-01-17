<script>
  import { onMount } from "svelte";
  import Dexie from "dexie";
  import moment from "moment";
  import {
    ButtonGroup,
    ButtonGroupItem,
    TextField,
    Divider,
    Select,
    Menu,
    Col,
    Row,
    Button,
    List,
    ListItem,
    MaterialApp,
  } from "svelte-materialify";

  //   import SearchAndCreateField from "../components/SearchAndCreateField.svelte";

  import {
    updateCalendarEvent,
    getClientCalendarEvents,
    getClientById,
    createCalendarEvent,
    deleteCalendarEvent,
    getCalendarEventById,
  } from "../storageAPI/indexedDB";

  import { createRepeatDatesDaily } from "../helper_functions";
  import { createRepeatWeekDayDates } from "../helper_functions";
  import { showNav } from "../store/nav_animation.js";
  import { animateNav } from "../store/nav_animation.js";
  import { fade, fly } from "svelte/transition";
  import { spring } from "svelte/motion";
  import BackButton from "../components/BackButton.svelte";
  import "date-time-picker-component/dist/css/date-time-picker-component.min.css";
  import {
    DateTimePicker,
    DateRangePicker,
    DatePicker,
  } from "date-time-picker-component/dist/js/date-time-picker-component.min";

  export let params = {};

  let selectedItemIndex = 0;

  let repeatEventValue = [
    {
      value: "NONE",
    },
    {
      value: "DAILY",
    },
    {
      value: "WEEKLY",
    }
    //,
    // {
    //   value: "MONTHLY",
    // },
  ];

  let clientId;
  let eventId;
  let clientName = "";
  let calendarEvents = [];

  let selection;
  let startEventObj;
  let terminationDateObj;

  let startEventDate;
  let terminationDate;

  let eventTitle = ""; // is set during onMount

  let eventRepeatValue = {
    value: "NONE",
  };

  let lengthOfEvent;

  let eventLengthChoices = [
    {
      minutes: 30,
      text: `30 min`,
    },
    {
      minutes: 60,
      text: `1 Hour`,
    },
    {
      minutes: 240,
      text: `4 Hours`,
    },
    {
      minutes: 480,
      text: `8 Hours`,
    },
  ];

  let initialLengthIndex;
  let initialLengthText = eventLengthChoices[initialLengthIndex];

  function getIndex(arr, key, value) {
    let answer;
    arr.forEach((val, index, arr) => {
      if (val[key] === value) {
        answer = index;
      }
    });

    return answer;
  }

  //::::::::::::::::::::::::::::::::::::::::: NEW DATE OBJECT CONSTRUCTION
  //:::::::::::::::::::::::::::::::::::::::::FOR ALL UI INPUTS A NEW EVENT OBJECT
  //:::::::::::::::::::::::::::::::::::::::::IS CONTRUCTED HERE_________________

  let updateCalendarEventObj = {};

  //::::::::::::::::::::::::::::::::::::::::::END NEW DATE OBJECT_______________

  onMount(async function () {
    //_________________________________________________________________________BEGIN async DB setup
    clientId = parseInt(params.clientId);
    eventId = parseInt(params.eventId);

    await getClientById(parseInt(params.clientId)).then((data) => {
      clientName = data.name;
    });

    await getClientCalendarEvents(clientId).then((result) => {
      let list = result.reverse();
      calendarEvents = [...list];
    });

    await getCalendarEventById(eventId).then((item) => {
      let startEventObj = Object.assign({}, item);
      updateCalendarEventObj = Object.assign({}, item);

      initialLengthIndex = getIndex(
        eventLengthChoices,
        "minutes",
        updateCalendarEventObj.lengthOfEvent
      );

      console.log(eventLengthChoices[initialLengthIndex].text);
      lengthOfEvent = eventLengthChoices[initialLengthIndex];
      eventTitle = startEventObj.title;

      console.log(updateCalendarEventObj);
    });

    //__________________________________________________________________________END async DB setup

    //__________________________________________________________________________BEGIN SET UI date to event

    // https://www.marcellosurdi.name/demo/date-time-picker-compoment_new/

    startEventObj = new DateTimePicker("select_datetime", {
      start_date: updateCalendarEventObj.start,
      date_output: "full_ISO",
    });

    terminationDateObj = new DatePicker("end_date", {
      start_date: updateCalendarEventObj.terminationDate,
      date_output: "full_ISO",
    });

    //_________________________________________________________________________END SET UI date to event
  });

  function goToRoute(item) {
    window.location.href =
      "#/client/" + clientId + "/dashboard/calendar/event/" + item.id + "/edit";
  }

  function redirectURL() {
    window.location.assign("/#/client/" + clientId + "/dashboard/calendar");
  }

  //:::::::::::::::::::::::::::::::::::::::BEGIN SET Length of Event____________

  function lengthSelect(event) {
    updateCalendarEventObj;
    let endDate = moment(updateCalendarEventObj.start)
      .add(lengthOfEvent.minutes, "m")
      .toDate();

    updateCalendarEventObj.end = endDate;
    updateCalendarEventObj.lengthOfEvent = lengthOfEvent.minutes;
  }

  //:::::::::::::::::::::::::::::::::::::::END SET Length of Event_______________

  //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::BEGIN EVENT DATE SELECT

  function eventDateSelect(e) {
    startEventDate = document.querySelector(
      "div#select_datetime input.date_output"
    ).value;

    let endDate = moment(startEventDate)
      .add(lengthOfEvent.minutes, "m")
      .toDate();
    let start = moment(startEventDate).toDate();
    updateCalendarEventObj.end = endDate;
    updateCalendarEventObj.start = start;

    resetTerminationDate();
  }

  //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::END EVENT DATE SELECT

  //::::::::::::::::::::::::::::::::::::::::::BIG GROSS FUNCTION
  //::::::::::::::::::::::::::::::::::::::::::Checks if Start Date is BEFORE TERMINATION DATE
  //::::::::::::::::::::::::::::::::::::::::::IF FALSE RESETS TERMINATION DATE TO START DATE

  function resetTerminationDate() {
    terminationDate = document.querySelector(
      "div#end_date input.date_output"
    ).value;

    startEventDate = document.querySelector(
      "div#select_datetime input.date_output"
    ).value;

    function isStartAfterTerminationDate(event) {
      let startIsAfterTerminationDate =
        moment(startEventDate).isAfter(terminationDate);

      if (startIsAfterTerminationDate) {
        return true;
      } else {
        return false;
      }
    }

    if (isStartAfterTerminationDate()) {
      document.getElementById("end_date").innerHTML = "";
      terminationDateObj = new DatePicker("end_date", {
        start_date: startEventDate,
        date_output: "full_ISO",
      });
    }
  }

  //:::::::::::::::::::::::::::::::::::::::::::::::::::::END BIG GROSS FUNCTION

  //:::::::::::::::::::::::::::::::::::::::::::::::::::::::SET TERMINATION DATE
  function setTerminationDate() {
    terminationDate = document.querySelector(
      "div#end_date input.date_output"
    ).value;

    startEventDate = document.querySelector(
      "div#select_datetime input.date_output"
    ).value;

    console.log(terminationDate);

    let terminationEventDate = moment(terminationDate).toDate();
    updateCalendarEventObj.terminationDate = terminationEventDate;
    updateCalendarEventObj.start = moment(startEventDate).toDate();
    console.log(updateCalendarEventObj);
    resetTerminationDate();
  }

  //:::::::::::::::::::::::::::::::::::::::::::::::::::::::END TERMINATION DATE

  //::::::::::::::::::::::::::::::::::::::::::::::::: BEGIN REPEAT DATES SANDBOX

  //:::::::::::::::::::::::::::::::::::::::::::::::::::: END REPEAT DATES SANDBOX

  //:::::::::::::::::::::::::::::::::::::::::::::::::::::::BEGIN submit event

  async function submitEvent(e) {
    e.preventDefault();

    let event = await getCalendarEventById(eventId);
    event.start = updateCalendarEventObj.start;
    event.end = updateCalendarEventObj.end;
    event.terminationDate = updateCalendarEventObj.terminationDate;
    event.repeatValue = eventRepeatValue.value;
    event.lengthOfEvent = updateCalendarEventObj.lengthOfEvent;

    let result = await updateCalendarEvent(eventId, event);

    //_____________________________________________________________

    if (event.repeatValue === "DAILY") {
      console.log(event.repeatValue, "Repeat value");

      let arr = createRepeatDatesDaily(event.start, event.terminationDate);

      console.log(event, "Initial Event");
      console.log(arr, "List of events");

      debugger;

      arr.forEach(async (val, index, arr) => {
        let repeatEvent = Object.assign({}, event);
        repeatEvent.start = moment(val).toDate();
        repeatEvent.end = moment(val).add(event.lengthOfEvent, "m").toDate();
        repeatEvent.repeat = true;
        console.log(repeatEvent);

        let result = await createCalendarEvent(
          repeatEvent.start,
          repeatEvent.end,
          repeatEvent.title,
          undefined,
          false,
          false,
          "time",
          repeatEvent.clientId,
          true,
          repeatEvent.groupRepeatId,
          repeatEvent.terminationDate, // termination date
          repeatEvent.lengthOfEvent,
          repeatEvent.repeatValue
        );
      });
    }





    if (event.repeatValue === "WEEKLY") {
        let arr = createRepeatWeekDayDates(event.start, event.terminationDate);

        console.log(event, "Initial Event");
        console.log(arr, "List of events");

        debugger;

        arr.forEach(async (val, index, arr) => {
          let repeatEvent = Object.assign({}, event);
          repeatEvent.start = moment(val).toDate();
          repeatEvent.end = moment(val).add(event.lengthOfEvent, "m").toDate();
          repeatEvent.repeat = true;
          console.log(repeatEvent);

          let result = await createCalendarEvent(
            repeatEvent.start,
            repeatEvent.end,
            repeatEvent.title,
            undefined,
            false,
            false,
            "time",
            repeatEvent.clientId,
            true,
            repeatEvent.groupRepeatId,
            repeatEvent.terminationDate, // termination date
            repeatEvent.lengthOfEvent,
            repeatEvent.repeatValue
          );
        });
      }







    redirectURL();
  }

  //::::::::::::::::::::::::::::::::::::::::::::::::::::::::END submit event
</script>

<div class="logo-form-container">
  <div class="container">
    <BackButton
      top="-110px"
      text="Client Calendar"
      width="135px"
      buttonEvent={redirectURL}
    />
    <div class="row">
      <div class="col-0" />
      <div class="col-12">
        <h1 class="client-name">You are scheduling an event titled</h1>
        <h1 class="client-name">{eventTitle}</h1>
        <h2 class="logo-title">{clientName}</h2>
      </div>
      <div class="col-0" />
    </div>

    <!-- ________________BEGIN  event start______________________________________-->

    <div>
      <p class="some-text">Event is scheduled for this day and time</p>
    </div>

    <div class="datetime-container">
      <div id="select_datetime" on:click={eventDateSelect} />
    </div>

    <!--___________________END  event start_________________________________________-->

    <!--____________________BEGIN duration of event_________________________________-->

    <div>
      <p class="some-text">Event has the following duration</p>
    </div>

    <div class="length-form-container">
      <form>
        <select bind:value={lengthOfEvent} on:change={lengthSelect}>
          {#each eventLengthChoices as eventLength}
            <option id="length-menu" value={eventLength}>
              {eventLength.text}
            </option>
          {/each}
        </select>
      </form>
    </div>
    <!--____________________END duration of event_________________________________-->

    <!--____________________BEGIN duration of event_________________________________-->

    <hr />
    <div><p class="some-text">Event repeat</p></div>

    <div class="repeat-container">
      {#each repeatEventValue as { value }, i}
        <div
          class="length-choice"
          class:selectedLengthChoice={selectedItemIndex === i}
          on:click={(e) => {
            selectedItemIndex = i;
            eventRepeatValue = repeatEventValue[selectedItemIndex];

            console.log(eventRepeatValue);
          }}
        >
          {value}
        </div>
      {/each}
    </div>

    <!--____________________END duration of event_________________________________-->

    <!-- BEGIN ___________________termination end date for repeated events-->

    <div><p class="some-text">Until</p></div>

    <div class="datetime-container">
      <div id="end_date" on:click={setTerminationDate} />
    </div>

    <!-- END ___________________termination end date for repeated events-->

    <!-- BEGIN__________________submit event____________________________-->

    <div class="row">
      <div class="col-0" />
      <div class="col-12">
        <section class="submit-button-container">
          <button
            on:click={submitEvent}
            class="submit-button btn btn-info btn-block my-4"
            type="submit">Submit Event</button
          >
        </section>
      </div>
      <div class="col-0" />
    </div>

    <!-- END__________________submit event____________________________-->
  </div>
</div>

<style>
  .submit-button {
    margin: 0 auto;
  }

  .submit-button-container {
  }

  .length-form-container {
    margin-top: -30px;
    /* background-color:orange; */
  }

  .length-form-container > form {
    /* background-color:red; */
    width: 160px;
    margin: 0 auto;
  }

  select {
    text-align: center;
    font-size: 2.1em;
    padding-left: 10px;
    padding-right: 10px;
  }

  .some-text {
    font-size: 2em;
    margin: 0 auto;
    color: grey;
    margin-bottom: 30px;
    text-align: center;
  }

  .with-item {
    top-margin: 200px;
    top: 21px;
    font-size: 30px;
    margin: 0 auto;
    position: relative;
    display: block;
    color: #be3ebc91;
    width: 60px;
  }

  .datetime-container {
    margin-top: 30px;
  }

  /* .button-container {
      height: 10vh;
      flex-direction: column;
      display: flex;
      align-items: center;
      justify-content: center;
      bottom: 100px;
    } */

  .main-container {
    display: flex;
    flex-direction: column;
    padding: 1rem 0.6rem;
    margin: 0;
    height: 100%;
    width: 100%;
  }

  /* .form {
      height: 100%;
      width: 100%;
    } */

  .show-btn {
    width: 100%;
    padding: 0.6rem 1.5rem;
    background: transparent;
    font-weight: 300;
    font-size: 1.5rem;
    border-radius: 10px;
    border: 1px solid #9c9a9a;
    position: flex;
    margin-bottom: 100px;
  }

  .footer {
    height: 5vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* button {
      background-color: #8f4089 !important;
      font-size: 1.5em;
      color: white !important;
      margin-left: 10%;
      margin-right: 10%;
      margin-top: 10%;
      border-radius: 50px;
    } */

  button:hover {
    outline-color: #666;
    background-color: #0fb52beb !important;
  }

  .dashboard-text {
    color: #96008fc9;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #787878db;
    font-size: 1.2em;
    position: relative;
    top: 00px;
    margin-bottom: 0px;
    text-align: center;
  }

  .get-started-text {
    text-align: center;
    font-size: 1.1em;
  }

  .container {
    margin-top: 250px;
  }

  .logo-title {
    text-align: center;
    color: #266d2591;
    font-size: 3em;
    margin-top: 30px;
    margin-bottom: 10px;
  }

  .client-name {
    font-family: logoFont;
    font-size: 1.8em;
    color: #be3ebc91;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: -50px;
  }

  .logo-form-container {
    position: relative;
    bottom: 120px;
  }

  button {
    background-color: #8f4089 !important;
    font-size: 1.5em;
    color: white !important;
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 10%;
    border-radius: 50px;
  }

  button:hover {
    outline-color: #666;
    background-color: #0fb52beb !important;
  }

  button.w-50 {
    background-color: purple;
  }

  .repeat {
    display: flex;
  }

  .repeat-container {
    flex-direction: row;
    background-color: #1b2e63;
    text-align: center;
    color: white;
  }

  .selectedLengthChoice {
    background-color: #684361;
  }

  .length-choice {
    font-size: 2em;
    outline-style: solid;
    outline-width: 1px;
  }
</style>
