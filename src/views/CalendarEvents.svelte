<script>
  import DatePicker from "@beyonk/svelte-datepicker/src/components/DatePicker.svelte";
  import Dexie from "dexie";
  import SearchAndCreateField from "../components/SearchAndCreateField.svelte";
  import { createWorkflow } from "../storageAPI/indexedDB";
  import {
    deleteCalendarEvent,
    createCalendarEvent,
    getClientCalendarEvents,
    getClientById,
    deleteWorkflow,
  } from "../storageAPI/indexedDB";
  import { onMount } from "svelte";
  export let params = {};

  let calendarEvents = [];
  let clientID = parseInt(params.clientId);
  let clientName;
  $: allClientCalendarEvents = [];

  onMount(async () => {

console.log(params)

console.log(clientID)
    getClientById(clientID).then((obj)=>{
      console.log(obj)
       clientName = obj.name
    })


    console.log(params)
    clientID = parseInt(params.clientId);


    await getClientCalendarEvents(parseInt(params.clientId)).then(
      (calendarEvents) => {
        allClientCalendarEvents = calendarEvents;

        console.log(calendarEvents)
      }
    );



  });

  async function submitToDatabase(title) {
    //___________________________________________________BEGIN replace with calendar events
    // let workflowID = await createWorkflow(clientID, item); // create new client
    //________________________________________________________END

    await createCalendarEvent("2021-12-25T06:00:00.000Z","2021-12-25T06:00:00.000Z",title,"Description test","test client name",clientID,"group-data");

    await getClientCalendarEvents(parseInt(params.clientId)).then((events)=>{
        let eventsOrdered = events.reverse();
          allClientCalendarEvents = [...eventsOrdered ]
    });


  // 2021-12-25T06:00:00.000Z


    // window.location.href =
    // "#/client/" + clientID + "/dashboard/calendar-events/" + calendarID + "/edit";
  }

  function goToRoute(item) {
    console.log(item);

    window.location.href = "#/client/" + item.id + "/dashboard/calendar-events";
  }

  // function goToRoute(item) {
  //   window.location.href =
  //       "#/client/" +
  //       clientID +
  //       "/dashboard/calendar-events/"
  //   // let calendarEventID = item.id;
  //   // if (item.title === undefined) {
  //   //   window.location.href =
  //   //     "#/client/" +
  //   //     clientID +
  //   //     "/dashboard/calendar-events/" +
  //   //     calendarEventID +
  //   //     "/edit";
  //   // } else {
  //   //   window.location.href =
  //   //     "#/client/" + clientID + "/dashboard/calendar-events/" + calendarEventID;
  //   // }
  // }

  async function onDelete(id) {
    let calendarEventID = allClientCalendarEvents[id].id;
    await deleteCalendarEvent(calendarEventID);
    await getClientCalendarEvents(clientID).then((result) => {
      let list = result.reverse();
     allClientCalendarEvents = [...list];
    });
  }

  let selected;
</script>

<DatePicker range={true} on:range-selected={(e) => (selected = e.detail)} />
<br />
{JSON.stringify(selected)}
<div class="logo-form-container">
  <div class="container">
    <div class="row">
      <div class="col-0" />
      <div class="col-12">
        <h1 class="client-name">Events & Meetings</h1>
        <h2 class="logo-title">{clientName}</h2>
      </div>
      <div class="col-0" />
    </div>
    <div class="row">
      <div class="col-0" />
      <div class="col-12">
        <!-- Replace value of arrayOfObject with calendarEvents-->
        <SearchAndCreateField
          placeholder="Type the title of event"
          arrayOfObjects={allClientCalendarEvents}
          keyToRender="title"
          onSubmit={submitToDatabase}
          onSelectionEvent={goToRoute}
          {onDelete}
          buttonText="Create Event"
        />
      </div>
      <div class="col-0" />
    </div>
  </div>
</div>

<style>
  .get-started-text {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #787878db;
    font-size: 1.2em;
    position: relative;
    top: 20px;
    margin-bottom: 50px;
  }

  .top-text {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #787878db;
    font-size: 1.2em;
    position: relative;
    top: 0px;
    margin-bottom: 30px;
  }

  @font-face {
    font-family: logoFont;
    src: url(/fonts/next.ttf);
  }

  .logo-form-container {
    position: relative;
    top: 100px;
  }

  .app-is-ready-text {
    color: #819dc2;
    text-align: center;
    font-size: 2em;
  }

  .logo-title {
    text-align: center;
    color: #266d2591;
    font-size: 3em;
  }

  .client-name {
    font-family: logoFont;
    font-size: 1.8em;
    color: #be3ebc91;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
