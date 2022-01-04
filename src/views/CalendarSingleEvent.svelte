<script>
  import TuiCalendar from "tui-calendar"; /* ES6 */
  import { stringToColour } from "../helper_functions/";
  import "tui-calendar/dist/tui-calendar.css";
  import "tui-date-picker/dist/tui-date-picker.css";
  import "tui-time-picker/dist/tui-time-picker.css";
  import { createCalendarEvent } from "../storageAPI/indexedDB";
  import { getClientCalendarEvents } from "../storageAPI/indexedDB";
  import { getAllCalendarEvents } from "../storageAPI/indexedDB";
  import { getCalendarEventById } from "../storageAPI/indexedDB";
  import { updateCalendarEvent } from "../storageAPI/indexedDB";
  import { deleteCalendarEvent } from "../storageAPI/indexedDB";
  import { getClientById } from "../storageAPI/indexedDB";
  import BackButton from "../components/BackButton.svelte";
  import { push, pop, replace } from "svelte-spa-router";

  import { onMount } from "svelte";

  // If you use the default popups, use this.
  import "tui-date-picker/dist/tui-date-picker.css";
  import "tui-time-picker/dist/tui-time-picker.css";
  let calendar;
  export let params = {};
  let clientId = parseInt(params["clientId"]);
  let clientName;
  let calendarEvents = [];
  onMount(async function () {
    //________________________________________________________BEGIN get calendar events from IndexDB

    //_________________________________________________________END get calendar events from IndexDB

    await getClientById(clientId)
      .then((client) => {
        clientName = client.name;
      })
      .then(() => {
        calendar = new TuiCalendar("#calendar", {
          // id:clientId,
          // name: clientName,
          //     color: "#ffffff",
          //     bgColor: "#9e5fff",
          //     dragBgColor: "#9e5fff",
          //     borderColor: "#9e5fff",
          defaultView: "month",
          taskView: true,
          scheduleView: ["time"],
          useCreationPopup: true,
          useDetailPopup: true,
          calendars: [
            {
              id: clientId,
              name: clientName,
              color: "#ffffff",
              bgColor: stringToColour(clientName),
              dragBgColor: "#9e5fff",
              borderColor: "#9e5fff",
            },
          ],
        });
      });

    await getAllCalendarEvents().then((calendarEventList) => {
      console.log("calendar events !", calendarEventList);

      let calEvents = calendarEventList.filter((val, index, arr) => {
        return val.calendarId === clientId;
      });

      // calendarEvents = [...calendarEventList];
      calendar.createSchedules([...calEvents]);
    });

    calendar.on({
      //___________________________________________________On EVENTS CLICKS !IMPORTANT
      //_______________________________ CLICK LISTED EVENT
      clickSchedule: function (e) {
        console.log("clickMore", e);
      },

      //__________ _____________________SELECT ITEM AND DELETE BUTTON

      beforeDeleteSchedule: function (e) {
        console.log("beforeDeleteSchedule", e.schedule.id);

        //____________________________________REMOVE FROM CALENDAR & UPDATES IMMEDIATLY
        calendar.deleteSchedule(e.schedule.id, e.schedule.calendarId);

        //___________________________________REMOVE FROM DB
        async function removeEvent() {
          await deleteCalendarEvent(e.schedule.id);
        }

        removeEvent(); // ____ NO PAGE REFRESH !
      },

      beforeUpdateSchedule: function (e) {
        console.log(e.changes.start);

        async function updateEvent() {
          let result;
          let oldCalendarId;
          console.log("Changes", e.changes);
          await getCalendarEventById(e.schedule.id).then((calendarEvent) => {
            console.log("BEFORE CHANGES", calendarEvent);
            oldCalendarId = calendarEvent.calendarId;
            result = Object.assign({}, calendarEvent, e.changes);
            result.start = new Date(result.start);
            result.end = new Date(result.end);
            console.log("CHANGES", e.changes);
            console.log("Updated", result);
          });

          await updateCalendarEvent(e.schedule.id, result).then((x) => {
            console.log("Updated..?", x);
            // location.reload();
            calendar.updateSchedule(x.id, oldCalendarId, result);
            console.log(calendar.updateSchedule);
            console.log(result);
            // calendar.updateSchedule(e.schedule.id,e.calendarId,x)
          });
        }

        updateEvent();

        console.log(e.schedule);
      },

      beforeCreateSchedule: function (e) {
        console.log("beforeCreateSchedule", e);
        let x = e.start;
        let y = e.end;
        console.log(e);
        // debugger;
        async function makeEvent() {
          await createCalendarEvent(
            new Date(x),
            new Date(y),
            e.title,
            e.location,
            e.isPrivate,
            e.isAllDay,
            "time",
            e.calendarId
          ).then(() => {
            // location.reload();
          });

          await getClientCalendarEvents(clientId).then((calendarEventList) => {
            // console.log("calendar events !", calendarEventList);
            calendarEvents = [...calendarEventList];
            calendar.clear();
            calendar.createSchedules([...calendarEventList]);

            console.log(calendarEventList);
          });
          
        }

        makeEvent();
      },

      aferRenderSchedule: function (e) {
        //____ ??
        console.log("afterRenderSchedule", e);
        // const schedule = e.schedule;
      },
    });
  });

  function nextMonth() {
    calendar.next();
  }

  function prevMonth() {
    calendar.prev();
  }

  function redirectURL() {
    window.location.assign("/#/client/" + clientId + "/dashboard/");
  }
</script>



<div class="logo-form-container">
  <div class="container">
    <BackButton
      top="10px"
      text="GoTo Dashboard"
      width="140px"
      buttonEvent={redirectURL}
    />
    <div class="row">
      <div class="col-0" />
      
      <div class="col-12" id="cal-box">

  <h1 class="client-name">Meetings & Events</h1>
  <h2 class="logo-title">{clientName}</h2>
  <p class="instructions">Select a date to add an event</p>
  <p class="instructions"  id="pleasure-voice">Click here to use Pleasure Voice service</p>
        <div id="menu">
          <span id="menu-navi">
            <button
              type="button"
              class="btn btn-default btn-sm move-today"
              data-action="move-today">Today</button
            >
            <button
              on:click={prevMonth}
              type="button"
              class="btn btn-default btn-sm move-day"
              id="move-prev"
            >
              PREV
            </button>
            <button
              on:click={nextMonth}
              type="button"
              class="btn btn-default btn-sm move-day"
              id="move-next"
            >
              NEXT
            </button>
          </span>
          <span id="renderRange" class="render-range" />
        </div>

        <div class="calendar-container">
          <div id="calendar" />
        </div>

        <hr />
      </div>
      <div class="col-0" />
    </div>
    <div class="row">
      <div class="col-0" />
      <div class="col-12" />
      <div class="col-0" />
    </div>
  </div>
</div>

<style>

  .instructions{
    display:block;
    text-align:center;
  }

  #pleasure-voice:hover{
    display:block;
    text-align:center;
    color:orange;
    cursor:pointer;
  }

  #cal-box {
    top: 100px;
    position: relative;
  }
  .header {
    height: 10vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .header-title {
    margin: 0;
  }

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
    margin-top: 120px;
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
