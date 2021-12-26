<script>
  import TuiCalendar from "tui-calendar"; /* ES6 */
  import "tui-calendar/dist/tui-calendar.css";
  import "tui-date-picker/dist/tui-date-picker.css";
  import "tui-time-picker/dist/tui-time-picker.css";
  import { stringToColour } from "../helper_functions/";
  import { createCalendarEvent } from "../storageAPI/indexedDB";
  import { getClientCalendarEvents } from "../storageAPI/indexedDB";
  import { getAllCalendarEvents } from "../storageAPI/indexedDB";
  import { getCalendarEventById } from "../storageAPI/indexedDB";
  import { updateCalendarEvent } from "../storageAPI/indexedDB";
  import { deleteCalendarEvent } from "../storageAPI/indexedDB";
  import { getAllClients } from "../storageAPI/indexedDB";
  import BackButton from "../components/BackButton.svelte";
  import { push, pop, replace } from "svelte-spa-router";

  import { onMount } from "svelte";

  // If you use the default popups, use this.
  import "tui-date-picker/dist/tui-date-picker.css";
  import "tui-time-picker/dist/tui-time-picker.css";
  let calendar;
  export let params = {};
  let calendarEvents = [];
  onMount(async function () {
    // calendar = new TuiCalendar("#calendar", {
    //   defaultView: "month",
    //   taskView: true,
    //   scheduleView: ["time"],
    //   useCreationPopup: true,
    //   useDetailPopup: true,
    //   calendars:[]
    // });

    let tempCalendars = [];
    //________________________________________________________BEGIN get calendar events from IndexDB
    await getAllClients()
      .then((item) => {
        item.forEach((val) => {
          tempCalendars.push({
            name: val.name,
            id: val.id,
            color: "#ffffff",
            bgColor: stringToColour(val.name),
            dragBgColor: "#9e5fff",
            borderColor: "#9e5fff",
          });
        });

        console.log(tempCalendars);
      })
      .then(() => {
        console.log(tempCalendars);
        calendar = new TuiCalendar("#calendar", {
          defaultView: "month",
          taskView: true,
          scheduleView: ["time"],
          useCreationPopup: true,
          useDetailPopup: true,
          calendars: [...tempCalendars],
        });
      });

    await getAllCalendarEvents().then((calendarEventList) => {
      // console.log("calendar events !", calendarEventList);
      calendarEvents = [...calendarEventList];
      calendar.createSchedules([...calendarEventList]);

      console.log(calendarEventList);
    });

    // console.log(calendar._controller.calendars);

    // calendars: [
    //   {
    //     id: clientId,
    //     name: clientName,
    //     color: "#ffffff",
    //     bgColor: "#9e5fff",
    //     dragBgColor: "#9e5fff",
    //     borderColor: "#9e5fff",
    //   },
    // ],
    //_________________________________________________________END get calendar events from IndexDB

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
        console.log(e);
        
        async function updateEvent() {
          let result;
          let oldCalendarId;
          console.log("Changes",e.changes);
          await getCalendarEventById(e.schedule.id).then((calendarEvent) => {
            console.log("BEFORE CHANGES",calendarEvent);
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

          await getAllCalendarEvents().then((calendarEventList) => {
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
</script>

<div class="logo-form-container">
  <div class="container">
    <BackButton top="10px"/>
    <div class="row">
      <div class="col-0" />
      <div class="col-12" id="cal-box">
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

  #cal-box{
    top:120px;
    position:relative
  }
    /* .logo-form-container {
    position: relative;
    bottom: 120px;
  }
  
  #menu {
    height: 50px;
    position: relative;
    top: 110px;
    left: 20%;
  }

  #calendar {
    position: relative;
    top: 90px;
    width: 70%;
    margin: 0 auto;
  }

  .calendar-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%; */

    .header {
    height: 10vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .header-title {
    margin: 0;
  }

  /*    .markdown-editor {
        width: 100%;
        display: flex;
        align-items:flex-start;
        justify-content: space-evenly;
    }
*/

  /*    .markdown-editor__right-panel {
        width: 85%;
        border: solid 1px black;
        height: 85vh;
    }

    .markdown-editor__right-panel {
        overflow: auto;
    }

    .markdown-editor__source {
        border: none;
        width: 100%;
        height: 100%;
        font-size: 2em;
    }

    .markdown-editor__source:focus {
        outline: none;
    }

    .markdown-editor__output {
        width: 100%;
        padding: 0 2em;
        font-size: 2em;

    }
*/

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





/* 
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
  } */

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
    /* background-color:orange */
  
</style>
