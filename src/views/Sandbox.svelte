<script>
  import { onMount } from "svelte";
  import moment from "moment";
  import "date-time-picker-component/dist/css/date-time-picker-component.min.css";
  import {
    DateTimePicker,
    DateRangePicker,
    DatePicker,
  } from "date-time-picker-component/dist/js/date-time-picker-component.min";

  import {
    updateCalendarEvent,
    getClientCalendarEvents,
    getClientById,
    createCalendarEvent,
    deleteCalendarEvent,
    getCalendarEventById,
  } from "../storageAPI/indexedDB";

  let currentEventDate = {};
  let initialDateOnPageLoad;
  let terminationDate;


  function createRepeatWeekDayDates(startDate, endDate) {
    // returns an array
   
    let endDatePlusOne = moment(endDate).add(1, "d").toDate();
    let start = moment(startDate),
      end = moment(endDatePlusOne),
      day = start.day()

    let result = []
    let current = start.clone()
    result.push(start)

    while (current.day(7 + day).isBefore(end)) {
      result.push(current.clone());
    }

    let correctedDateList = result.slice(1); // removes first item


    let final = correctedDateList.map((m) => new Date(m));

    return final
  }



  function createRepeatDatesDaily(startDate, endDate) {
    // returns an array
    let dates = [];

    let endDatePlusOne = moment(endDate).add(1, "d").toDate();

    let currDate = moment(startDate);
    let lastDate = moment(endDatePlusOne);
    dates.push(currDate.clone().toDate());

    while (currDate.add(1, "days").diff(lastDate) < 0) {
      console.log(currDate.toDate());
      dates.push(currDate.clone().toDate());
    }

    let correctedDateList = dates.slice(1); // removes first item

    return correctedDateList;
  }

  onMount(async function () {
    new DateTimePicker("select_datetime", {
      date_output: "full_ISO",
    });

    new DatePicker("end_date", {
      date_output: "full_ISO",
    });

    initialDateOnPageLoad = document.querySelector(
      "div#select_datetime input.date_output"
    ).value;

    terminationDate = document.querySelector(
      "div#end_date input.date_output"
    ).value;

    currentEventDate.startDate = moment(initialDateOnPageLoad).toDate();
    currentEventDate.endDate = moment(initialDateOnPageLoad)
      .add(30, "m")
      .toDate();
    currentEventDate.terminationDate = moment(terminationDate).toDate();
    console.log(currentEventDate.startDate);
    console.log(currentEventDate.terminationDate);

    let result = createRepeatDatesDaily(
      currentEventDate.startDate,
      currentEventDate.terminationDate
    );

    console.log(result);
  });

  function dateSelect() {
    initialDateOnPageLoad = document.querySelector(
      "div#select_datetime input.date_output"
    ).value;
  }

  function setTerminationDate() {
    terminationDate = document.querySelector(
      "div#end_date input.date_output"
    ).value;

    console.log(terminationDate);
  }

  function submit() {
    console.log(initialDateOnPageLoad, "Initial Date");
    console.log(terminationDate, "Termination date");

    let dateList = createRepeatDatesDaily(
      initialDateOnPageLoad,
      terminationDate
    );

    let answer = createRepeatWeekDayDates(initialDateOnPageLoad, terminationDate)

    console.log(dateList);
    console.log("submit works");


    console.log(answer);

    // correctedDateList.forEach(async (val,index,arr)=>{
    //     // let repeatEvent = Object.assign({},event);
    //     // repeatEvent.start = moment(val).toDate();
    //     // repeatEvent.end = moment(val).add(event.lengthOfEvent, "m").toDate();
    //     // repeatEvent.repeat = true;
    //     // console.log(repeatEvent);

    //     let result = await createCalendarEvent(
    //         val

    //      );

    //   });
  }
</script>

<div id="select_datetime" on:click={dateSelect} />

<hr />

<div id="end_date" on:click={setTerminationDate} />

<hr />

<button on:click={submit}>SUBMIT</button>
