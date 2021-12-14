
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
</style>


<script>
	import {junk} from '../voice_service';
	import {speechInput} from '../voice_service';
	import {speechOutput} from '../voice_service';
	import FullCalendar, { Draggable } from 'svelte-fullcalendar';
	import dayGridPlugin from '@fullcalendar/daygrid';
	import timeGridPlugin from '@fullcalendar/timegrid';
	import interactionPlugin from '@fullcalendar/interaction'; // needed for dateClick
	


	let options = {
		dateClick: handleDateClick,
		droppable: true,
		editable: true,
		events: [
			// initial event data
			{ title: 'New Event', start: new Date() },
		],
		initialView: 'dayGridMonth',
		plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
		headerToolbar: {
			left: 'prev,next today',
			center: 'title',
			right: 'dayGridMonth,timeGridWeek,timeGridDay',
		},
		height: 'auto',
		weekends: true,
	};
	let calendarComponentRef;
	let eventData = { title: 'my event', duration: '02:00' };
	// function toggleWeekends() {
	// 	options.weekends = !options.weekends;
	// 	options = { ...options };
	// }


	function gotoPast() {
		let calendarApi = calendarComponentRef.getAPI();
		calendarApi.gotoDate('2000-01-01'); // call a method on the Calendar object
	}


	function handleDateClick(event) {
		if (
			confirm('Would you like to add an event to ' + event.dateStr + ' ?')
		) {
			const { events } = options;
			const calendarEvents = [
				...events,
				{
					title: 'New Event',
					start: event.date,
					allDay: event.allDay,
				},
			];
			options = {
				...options,
				events: calendarEvents,
			};


			console.log(events)
		}
	}


let obj = {
    name: undefined,
    time: undefined,
    date: undefined
}



	async function createNewStudentEvent(callback) {
	    let questionOne = await speechOutput("what is the students name");
	    let answerOne = await speechInput();
	    obj["name"] = answerOne;
	    let questionTwo = await speechOutput("What date is the session");
	    let answerTwo = await speechInput();
	    obj["date"] = answerTwo;
	    let questionThree = await speechOutput("what time is the session");
	    let answerThree = await speechInput();
	    obj["time"] = answerThree;
	    callback()

	    console.log(obj)
	}



	function handePleasureVoiceClick(event){
       console.log("VOICE RUN");
       createNewStudentEvent(function(){
       	console.log("MAKE THINGGGY")
       }) 

	}




</script>


<div class="demo-app">
<!-- 	<div class="demo-app-top">
		<button on:click={toggleWeekends}>toggle weekends</button> &nbsp; <button
			on:click={gotoPast}>go to a date in the past</button> &nbsp; (also, click
		a date/time to add an esurevent)
	</div> -->

	<div>
		<button on:click={handePleasureVoiceClick}>
			Create event with Pleasure Voice servic
		</button>
	</div>

	<div class="demo-app-calendar">
		<FullCalendar bind:this={calendarComponentRef} {options} />
	</div>
</div>