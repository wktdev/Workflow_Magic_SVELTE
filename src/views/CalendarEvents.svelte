<script>
  import TuiCalendar from "tui-calendar"; /* ES6 */
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

    await getClientById(clientId).then((client) => {
      clientName = client.name;
    }).then(()=>{


      calendar = new TuiCalendar("#calendar", {
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
          bgColor: "#9e5fff",
          dragBgColor: "#9e5fff",
          borderColor: "#9e5fff",
        },
      ],
    });
    })

   

    await getAllCalendarEvents().then((calendarEventList) => {
      console.log("calendar events !", calendarEventList);

      let calEvents = calendarEventList.filter((val, index, arr) => {
        return val.calendar_id === clientId;
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
          await getCalendarEventById(e.schedule.id).then((calendarEvent) => {
            result = Object.assign({}, calendarEvent, e.changes);
            result.start = new Date(result.start);
            result.end = new Date(result.end);
            console.log("Updated", result);
          });

          await updateCalendarEvent(e.schedule.id, result).then((x) => {
            console.log("Updated..?", x);
            location.reload();
          });
        }

        updateEvent();

        console.log(e.schedule);
      },

      beforeCreateSchedule: function (e) {
        console.log("beforeCreateSchedule", e);
        let x = e.start;
        let y = e.end;

        async function makeEvent() {
          createCalendarEvent(
            new Date(x),
            new Date(y),
            e.title,
            e.location,
            e.isPrivate,
            e.isAllDay,
            "time",
            clientId
          ).then(() => {
            location.reload();
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
    <BackButton top="65px" />
    <div class="row">
      <div class="col-0" />
      <div class="col-12">
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
    width: 100%;
    /* background-color:orange */
  }
</style>
