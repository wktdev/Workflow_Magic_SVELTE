<script>
  import { onMount } from "svelte";
  import Dexie from "dexie";
  import moment from "moment";

  import SearchAndCreateField from "../components/SearchAndCreateField.svelte";

  import {
    getClientCalendarEvents,
    getClientById,
    createCalendarEvent,
    deleteCalendarEvent,
  } from "../storageAPI/indexedDB";

  import { showNav } from "../store/nav_animation.js";
  import { animateNav } from "../store/nav_animation.js";
  import { fade, fly } from "svelte/transition";
  import { spring } from "svelte/motion";
  import BackButton from "../components/BackButton.svelte";
  import "date-time-picker-component/dist/css/date-time-picker-component.min.css";
  import { DateTimePicker } from "date-time-picker-component/dist/js/date-time-picker-component.min";

  export let params = {};
  let clientId;
  let clientName = "";
  let calendarEvents = [];

  let selection;
  let calendar;

  let currentEventDate;

  onMount(function () {
    clientId = params.clientId;
    calendar = new DateTimePicker("select_datetime", {
      start_date: Date.now(),
      last_date: moment(Date.now()).add(30, "m").toDate(),
      first_day_no: 0,
      getDate: function () {
        console.log("TEST");
      },
      // l10n: it
    });

    getClientById(parseInt(params.clientId)).then((data) => {
      clientName = data.name;
    });
    //________________________________________GET ALL CALENDAR EVENTS FOR CLIENT
    getClientCalendarEvents(clientId).then((result) => {
      let list = result.reverse();
      console.log(list);
      calendarEvents = [...list];
    });
    //_________________________________________END
  });

  async function submitToDatabase(eventTitle) {
    console.log(eventTitle);

    try {
      /*_____________________________________________BEGIN change to calendar events for client*/

      //   let currentEventDate = {
      //   startDate:calendar.start_date,
      //   endDate:calendar.last_date.
      //   title:
      //   location: undefined
      //   isPrivate: false
      //   isAllDay:  false
      //   category:  undefined
      //   clientId:
      // };

      await createCalendarEvent(
        calendar.start_date,
        calendar.last_date,
        eventTitle,
        undefined,
        false,
        false,
        undefined,
        clientId
      )

      await   getClientCalendarEvents(clientId).then((result) => {
      let list = result.reverse();
      console.log(list);
      calendarEvents = [...list];
    });

      //_____________________________________________END
    } catch (error) {
      throw error;
    }
  }

  function goToRoute(item) {
    console.log(item);

    window.location.href = "#/client/" + item.id + "/dashboard";
  }

  async function onDelete(id) {

    console.log(id);

    console.log(calendarEvents[id].id);
    //________________________________________DELETE Calendar events
    let calendarID = calendarEvents[id].id;
    await deleteCalendarEvent(calendarID);
    await getClientCalendarEvents(clientId).then((result) => {
      let list = result.reverse();
      calendarEvents = [...list];
      console.log(calendarEvents);
    });
    //_________________________________________END
  }

  function dateSelect(e) {
    let x = moment(calendar.start_date).add(30, "m").toDate(),
    currentEventDate = {
      startDate: calendar.start_date,
      endDate: x,
    
    };

    console.log(currentEventDate )
  }

  function redirectURL() {
    window.location.assign("/#/client/" + clientId + "/dashboard");
  }



</script>

<div class="logo-form-container">
  <div class="container">
    <BackButton
      top="-90px"
      text="Client Dashboard"
      width="145px"
      buttonEvent={redirectURL}
    />
    <div class="row">
      <div class="col-0" />
      <div class="col-12">
        <h1 class="client-name">Calendar Events</h1>
        <h2 class="logo-title">{clientName}</h2>
      </div>
      <div class="col-0" />
    </div>

    <div id="select_datetime" on:click={dateSelect} />

    <div class="row">
      <div class="col-0" />
      <div class="col-12">
        <SearchAndCreateField
          buttonText="Create Event"
          placeholder="Type the name of an event date"
          arrayOfObjects={calendarEvents}
          keyToRender="title"
          onSubmit={submitToDatabase}
          {onDelete}
          onSelectionEvent={goToRoute}
        />
      </div>
      <div class="col-0" />
    </div>
  </div>
</div>

<style>
  .button-container {
    height: 10vh;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 100px;
  }

  .main-container {
    display: flex;
    flex-direction: column;
    padding: 1rem 0.6rem;
    margin: 0;
    height: 100%;
    width: 100%;
  }

  .form {
    height: 100%;
    width: 100%;
  }

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
    /* margin-top: 70px;
    margin-bottom: -20px; */
  }

  .client-name {
    font-family: logoFont;
    font-size: 1.8em;
    color: #be3ebc91;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: -30px;
  }

  .logo-form-container {
    position: relative;
    bottom: 120px;
  }
</style>
