<script>
  import FullCalendar, { Draggable } from "svelte-fullcalendar";
  import dayGridPlugin from "@fullcalendar/daygrid";
  import timeGridPlugin from "@fullcalendar/timegrid";
  import interactionPlugin from "@fullcalendar/interaction"; // needed for dateClick
  import { createCalendarEvent } from "../storageAPI/indexedDB";








	import DatePicker from "@beyonk/svelte-datepicker/src/components/DatePicker.svelte";
	
	let selected




  let options = {
    dateClick: handleDateClick,
    droppable: true,
    editable: true,
    events: [
      // initial event data
      { title: "New Event", start: new Date() },
    ],
    initialView: "dayGridMonth",
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay",
    },
    height: "auto",
    weekends: true,
  };

  let calendarComponentRef;
  let eventData = { title: "my event", duration: "02:00" };

  function gotoPast() {
    let calendarApi = calendarComponentRef.getAPI();
    calendarApi.gotoDate("2000-01-01"); // call a method on the Calendar object
  }

  /*

allDay: true
start: Thu Nov 18 2021 00:00:00 GMT-0600 (Central Standard Time) {}
title: "New Event"


*/

  function handleDateClick(event) {
    if (confirm("Would you like to add an event to " + event.dateStr + " ?")) {
      const { events } = options;
      console.log(event.date);
      const calendarEvents = [
        ...events,
        {
          title: "New Event",
          start: event.date,
          allDay: event.allDay,
        },
      ];
      options = {
        ...options,
        events: calendarEvents,
      };

      console.log(calendarEvents);
      createCalendarEvent({ title: "weeee" });
    }

    console.log(options);
  }
</script>

<div class="demo-app">
  <!-- 	<div class="demo-app-top">
		<button on:click={toggleWeekends}>toggle weekends</button> &nbsp; <button
			on:click={gotoPast}>go to a date in the past</button> &nbsp; (also, click
		a date/time to add an event)
	</div> -->


	

  <div>
    <Draggable {eventData} class="draggable">
      Record Date with Pleasure Voice Service
    </Draggable>
  </div>

  <div class="demo-app-calendar">
    <FullCalendar bind:this={calendarComponentRef} {options} />
  </div>
</div>

<style>
  .demo-app {
    width: 100vw;
    height: 100vh;
    font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
    font-size: 14px;
  }
  .demo-app-top {
    margin: 0 0 3em;
  }
  .demo-app-calendar {
    margin: 0 auto;
    max-width: 900px;
  }
  :global(.draggable) {
    color: white;
    background: #3788d8;
    width: fit-content;
    padding: 1rem;
    margin: 1rem;
    cursor: pointer;
  }

  button {
    color: #333;
    background-color: red;
  }


</style>
