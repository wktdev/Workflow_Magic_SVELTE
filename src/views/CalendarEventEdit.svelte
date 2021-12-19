<script>
  import TuiCalendar from "tui-calendar"; /* ES6 */
  import "tui-calendar/dist/tui-calendar.css";
  import "tui-date-picker/dist/tui-date-picker.css";
  import "tui-time-picker/dist/tui-time-picker.css";

  import { onMount } from "svelte";

  // If you use the default popups, use this.
  import "tui-date-picker/dist/tui-date-picker.css";
  import "tui-time-picker/dist/tui-time-picker.css";
  let calendar;
  // let next;

  onMount(function () {
    calendar = new TuiCalendar("#calendar", {
      defaultView: "month",
      taskView: true,
      scheduleView: ["time"],
      useCreationPopup: true,
      useDetailPopup: true,
    });

    // index db to loop and populate calendar.createSchedules

    calendar.createSchedules([
      {
        id: "3",
        calendarId: "1",
        title: "second schedule",
        category: "time",
        dueDateClass: "",
        start: "2021-12-18T17:30:00+09:00",
        end: "2021-12-19T17:31:00+09:00",
      },
      {
        id: "4",
        calendarId: "1",
        title: "second schedule",
        category: "time",
        dueDateClass: "",
        start: "2021-12-18T17:30:00+09:00",
        end: "2021-12-19T17:31:00+09:00",
      },
    ]);

    console.log(calendar)

    calendar.on({
      //___________________________________________________On EVENTS CLICKS !IMPORTANT
      //_______________________________ CLICK LISTED EVENT
      clickSchedule: function (e) {
        console.log("clickMore", e);
      },

      //__________ _____________________SELECT ITEM AND DELETE BUTTON

      beforeDeleteSchedule: function (e) {
        console.log("beforeDeleteSchedule", e);
        calendar.deleteSchedule(e.schedule.id, e.schedule.calendarId);
      },

      beforeUpdateSchedule: function (e) {
        // AFTER DRAG and before DROP
        console.log("beforeUpdateSchedule", e);

        // createCalendarEvent(
        //   startDate,
        //   endDate,
        //   title,
        //   description,
        //   clientName,
        //   clientId,
        //   groupId
        // );
      },

      beforeCreateSchedule: function (e) {
        console.log("beforeCreateSchedule", e);
        let x = e.start;
        let y = e.end;
        let one = x.toUTCString();
        let two = y.toUTCString();

        console.log("TZ", x.toUTCString());
        calendar.createSchedules([
          {
            id: "1",
            calendarId: "1",
            title: e.title,
            category: "time",
            start: one,
            end: two,
            isAllDay:true,
            isPrivate:true,
            location:"ONLINE 123"
          },
          {
            id: "2",
            calendarId: "1",
            title: e.title,
            category: "time",
            start: one,
            end: two,
          },
        ]);
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

<div id="calendar" />

<style>
  #menu {
    height: 50px;
  }
</style>
