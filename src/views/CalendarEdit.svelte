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

  let items = [
    {
      value: "NONE",
    },
    {
      value: "DAILY",
    },
    {
      value: "WEEKLY",
    },
    {
      value: "MONTHLY",
    },
  ];

  let itemSelect = items[selectedItemIndex];

  let clientId;
  let eventId;
  let clientName = "";
  let calendarEvents = [];
  let currentEventDate = {
    startDate: moment(Date.now()).add(0, "m").toDate(),
    endDate: moment(Date.now()).add(60, "m").toDate(),
  };

  let selection;
  let calendar;
  let calendarDateRangeSelector;
  let calendarEventUpdate = {};

  onMount(async function () {
    clientId = parseInt(params.clientId);
    eventId = parseInt(params.eventId);


    await getClientById(parseInt(params.clientId)).then((data) => {
      clientName = data.name;
    });

    //________________________________________GET ALL CALENDAR EVENTS FOR CLIENT
    await getClientCalendarEvents(clientId).then((result) => {
      let list = result.reverse();
      calendarEvents = [...list];
    });

    await getCalendarEventById(eventId).then((item) => {
      calendarEventUpdate = Object.assign({}, item);
      console.log(calendarEventUpdate.title);
    });

    calendar = new DateTimePicker("select_datetime", {
      first_date: moment(Date.now()),
      start_date: calendarEventUpdate.start,
      // last_date: new Date(2030, 0, 29),
      // first_day_no: 1,
      date_output: "timestamp",
    });


    calendarDateRangeSelector = new DatePicker("end_date",{
        start_date: calendar.start_date

    });


    console.log(calendar.start_date);
    console.log(calendarEventUpdate, "CHECK");

    currentEventDate = {
      startDate: calendar.start_date,
      endDate: moment(calendar.start_date).add(60, "m").toDate(),
    };

    //_________________________________________END
  });


  function goToRoute(item) {
    window.location.href =
      "#/client/" + clientId + "/dashboard/calendar/event/" + item.id + "/edit";
  }

  async function onDelete(id) {
    //________________________________________DELETE Calendar events
    let calendarID = calendarEvents[id].id;
    await deleteCalendarEvent(calendarID);
    await getClientCalendarEvents(clientId).then((result) => {
      let list = result.reverse();
      calendarEvents = [...list];
    });
    //_________________________________________END
  }




  //___________________________________________________________BEGIN FIRST DATE SELECT

  function dateSelect(e) {
    let selection = document.querySelector(
      "div#select_datetime input.date_output"
    ).value;

    let endDate = moment(selection).add(30, "m").toDate();
    currentEventDate.startDate = new Date(selection);
    currentEventDate.endDate = new Date(endDate);
  }

  function redirectURL() {
    window.location.assign("/#/client/" + clientId + "/dashboard");


  }

  //_____________________________________________________________END First Date Select










  //__________________________________BEGIN Length of Event

  let questions = [
    {
      id: 1,
      text: `30 min`,
    },
    {
      id: 2,
      text: `1 Hour`,
    },
    {
      id: 3,
      text: `4 Hour`,
    },
    {
      id: 3,
      text: `All Day`,
    },
  ];

  let selected;





  //_______________________________________BEGIN length select 30 min, hour etc

  function lengthSelect(event) {
    console.log(selected);
  }


 //_________________________________________END of length of event








 //___________________________________________________________BEGIN set terminationDate
  let repeatTerminationDate;

  function selectedTerminationDate(event) {
    let terminationDatePre = document.querySelector(
      "div#end_date input.date_output"
    ).value;


    console.log(terminationDatePre);

    let eventStart  = moment(Date(calendar.start_date))
    let terminationDate = moment(Date(terminationDatePre))

    console.log(eventStart);

    console.log(terminationDate);

    let isTerminationBeforeStartDate = moment(eventStart.toString()).isAfter(terminationDate.toString());

    console.log(isTerminationBeforeStartDate);
 
  }

//______________________________________________________________END set terminationDate







  

  //________________________________________________BEGIN submit event



  async function submitEvent(e) {
    e.preventDefault();
    let event = await getCalendarEventById(eventId);
    event.start = currentEventDate.startDate;
    event.end = currentEventDate.endDate;
 
  }

  //____________________________________________________END submit event


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
        <h1 class="client-name">{calendarEventUpdate.title}</h1>
        <!-- <div><p class = "with-item">with</p></div> -->
        <h2 class="logo-title">{clientName}</h2>
      </div>
      <div class="col-0" />
    </div>

    <!-- ________________BEGIN  event start______________________________________-->

    <div>
      <p class="some-text">Event is scheduled for this day and time</p>
    </div>

    <div class="datetime-container">
      <div id="select_datetime" on:click={dateSelect} />
    </div>

    <!--___________________END  event start_________________________________________-->

    <!--____________________BEGIN duration of event_________________________________-->

    <div>
      <p class="some-text">Event has the following duration</p>
    </div>

    <div class="length-form-container">
      <form>
        <select bind:value={selected} on:change={lengthSelect}>
          {#each questions as question}
            <option value={question}>
              {question.text}
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
      {#each items as { value }, i}
        <div
          class="length-choice"
          class:selectedLengthChoice={selectedItemIndex === i}
          on:click={(e) => {
            selectedItemIndex = i;
            repeatDataValue = items[selectedItemIndex];

            //checkTerminationDateOrder();
            /*
                    if termination is less than start THEN set termination to start

                    let isTerminationBeforeStartDate = moment(start).isAfter(terminationDate); //true

                    if(isTerminationBeforeStartDate){
                    terminationDate = startDate
                    }

                    */
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
      <div id="end_date" on:click={selectedTerminationDate}/>
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
