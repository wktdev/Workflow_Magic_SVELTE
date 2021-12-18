<script>
  import TuiCalendar from "tui-calendar"; /* ES6 */
  // import "tui-calendar/dist/tui-calendar.css";
  import { onMount } from "svelte";

  // If you use the default popups, use this.
  import "tui-date-picker/dist/tui-date-picker.css";
  import "tui-time-picker/dist/tui-time-picker.css";
  let calendar;

  onMount(function () {
    calendar = new TuiCalendar("#calendar", {
      defaultView: "month",
      taskView: true,
      scheduleView: ['time'], 
     
    });

    calendar.createSchedules([
    {
        id: '1',
        calendarId: '1',
        title: 'my schedule',
        category: 'time',
        dueDateClass: '',
        start: '2021-12-18T22:30:00+09:00',
        end: '2021-01-19T02:30:00+09:00'
    },
    {
        id: '2',
        calendarId: '1',
        title: 'second schedule',
        category: 'time',
        dueDateClass: '',
        start: '2021-12-18T17:30:00+09:00',
        end: '2021-12-19T17:31:00+09:00'
    }
])
  });




</script>

<div id="menu">
  <span id="menu-navi">
    <button type="button" class="btn btn-default btn-sm move-today" data-action="move-today">Today</button>
    <button type="button" class="btn btn-default btn-sm move-day" data-action="move-prev">
      <i class="calendar-icon ic-arrow-line-left" data-action="move-prev"></i>
    </button>
    <button type="button" class="btn btn-default btn-sm move-day" data-action="move-next">
      <i class="calendar-icon ic-arrow-line-right" data-action="move-next"></i>
    </button>
  </span>
  <span id="renderRange" class="render-range"></span>
</div>

<div id="calendar"></div>

<style>
  #menu{
    height:200px;
    background-color:orange;

  }
</style>