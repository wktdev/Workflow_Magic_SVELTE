<script>
    import { onMount } from "svelte";
    import Dexie from "dexie";
    import moment from "moment";
    import {
        ButtonGroup,
        ButtonGroupItem,
        TextField,
        Divider,
        Select,
        Menu,
        Col,
        Row,
        Button,
        List,
        ListItem,
        MaterialApp,
    } from "svelte-materialify";

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
    let currentEventDate = {
        startDate: moment(Date.now()).add(0, "m").toDate(),
        endDate: moment(Date.now()).add(60, "m").toDate(),
    };

    let selection;
    let calendar;

    onMount(function () {
        clientId = parseInt(params.clientId);
        calendar = new DateTimePicker("select_datetime", {
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

            // '++id,calendarId,start,end,title,location,isPrivate,isAllDay,category,clientId',
            await createCalendarEvent(
                currentEventDate.startDate,
                currentEventDate.endDate,
                eventTitle,
                undefined,
                false,
                false,
                "time",
                clientId
            );

            await getClientCalendarEvents(clientId).then((result) => {
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

        window.location.href =
            "#/client/" +
            clientId +
            "/dashboard/calendar/event/" +
            item.id +
            "/edit";
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
        let selection = document.querySelector(
            "div#select_datetime input.date_output"
        ).value;

        let endDate = moment(selection).add(30, "m").toDate();
        console.log(selection);
        console.log(endDate);
        currentEventDate.startDate = new Date(selection);
        currentEventDate.endDate = new Date(endDate);

        //  console.log(currentEventDate);
    }

    function redirectURL() {
        window.location.assign("/#/client/" + clientId + "/dashboard");
    }

    let theme = "light";
    let objvalue = {
        main1: "1",
        main2: "2",
    };
    let stvalue = "";
    function selectStatus(event) {
        console.log("bind value", objvalue);
        console.log("selected value", event.detail[0]);
    }
    function selectStatus1(event) {
        console.log("bind value", stvalue);
        console.log("selected value", event.detail[0]);
    }
    let statuses = [
        { id: 1, name: "v1", value: "z1" },
        { id: 2, name: "v2", value: "z2" },
    ];

    let questions = [
        { id: 1, text: `30 min` },
        { id: 2, text: `1 Hour` },
        { id: 3, text: `4 Hour` },
        { id: 3, text: `All Day` },
    ];

    let selected;

    let answer = "";

    function handleSubmit() {
        console.log("weeee");
        alert(
            `answered question ${selected.id} (${selected.text}) with "${answer}"`
        );
    }

    let group = 1;

    $: valuesChange = values;
    const values = [0, [0]];

    function chooseRepeatValue() {
        console.log(valuesChange);
    }

    let lengthOfEvent = 30;



function lengthSelect(event){
    console.log(event)
    console.log(selected)
}



</script>

<div class="logo-form-container">
    <div class="container">
        <BackButton
            top="-110px"
            text="Client Calendar"
            width="135px"
            buttonEvent={redirectURL}
        />
        <div class="row">
            <div class="col-0" />
            <div class="col-12">
                <h1 class="client-name">You are scheduling an event titled</h1>
                <h1 class="client-name">Some Event</h1>
                <!-- <div><p class = "with-item">with</p></div> -->
                <h2 class="logo-title">{clientName}</h2>
            </div>
            <div class="col-0" />
        </div>

        <div>
            <p class="some-text">
                The event is scheduled for the following day and time
            </p>
        </div>

        <div class="datetime-container">
            <div id="select_datetime" on:click={dateSelect} />
        </div>

        <div>
            <p class="some-text">
                The event is scheduled for the following duration
            </p>
        </div>

        <div class="length-form-container">
            <form on:submit={handleSubmit}>
                <select bind:value={selected} on:change={lengthSelect}>
                    {#each questions as question}
                        <option value={question}>
                            {question.text}
                        </option>
                    {/each}
                </select>
            </form>
        </div>
        <!-- <p>selected question {selected ? selected.id : '[waiting...]'}</p> -->
        <hr />
        <div><p class="some-text">To Repeat the Event Make a Selection</p></div>

        <MaterialApp>
            <div class="length-selection-container">
                <ButtonGroup
                    class="purple darken-1 d-flex flex-column flex-sm-row justify-space-between"
                    mandatory
                    size="x-large"
                    activeClass="orange white-text"
                    bind:value={values[0]}
                >
                    <ButtonGroupItem on:click={chooseRepeatValue}
                        >None</ButtonGroupItem
                    >

                    <ButtonGroupItem on:click={chooseRepeatValue}
                        >Daily</ButtonGroupItem
                    >
                    <ButtonGroupItem on:click={chooseRepeatValue}
                        >Weekly</ButtonGroupItem
                    >
                    <ButtonGroupItem on:click={chooseRepeatValue}
                        >Monthly</ButtonGroupItem
                    >
                </ButtonGroup>
                <br />
            </div>
        </MaterialApp>

        <div class="row">
            <div class="col-0" />
            <div class="col-12">
                <section class="submit-button-container">
                    <button
                        on:click={handleSubmit}
                        class="submit-button btn btn-info btn-block my-4"
                        type="submit">Submit Event</button
                    >
                </section>
            </div>
            <div class="col-0" />
        </div>
    </div>
</div>

<style>
    .submit-button {
        margin: 0 auto;
    }
    .submit-button-container {
    }

    .length-form-container {
        margin-top: -30px;
        /* background-color:orange; */
    }
    .length-form-container > form {
        /* background-color:red; */
        width: 160px;
        margin: 0 auto;
    }
    select {
        text-align: center;
        font-size: 2.1em;
        padding-left: 10px;
        padding-right: 10px;
    }

    .some-text {
        font-size: 2em;
        margin: 0 auto;
        color: grey;
        margin-bottom: 30px;
        text-align: center;
    }
    .with-item {
        top-margin: 200px;
        top: 21px;
        font-size: 30px;
        margin: 0 auto;
        position: relative;
        display: block;
        color: #be3ebc91;
        width: 60px;
    }
    .datetime-container {
        margin-top: 30px;
    }

    /* .button-container {
      height: 10vh;
      flex-direction: column;
      display: flex;
      align-items: center;
      justify-content: center;
      bottom: 100px;
    } */

    .main-container {
        display: flex;
        flex-direction: column;
        padding: 1rem 0.6rem;
        margin: 0;
        height: 100%;
        width: 100%;
    }

    /* .form {
      height: 100%;
      width: 100%;
    } */

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

    /* button {
      background-color: #8f4089 !important;
      font-size: 1.5em;
      color: white !important;
      margin-left: 10%;
      margin-right: 10%;
      margin-top: 10%;
      border-radius: 50px;
    } */

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
        margin-top: 30px;
        margin-bottom: 10px;
    }

    .client-name {
        font-family: logoFont;
        font-size: 1.8em;
        color: #be3ebc91;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: -50px;
    }

    .logo-form-container {
        position: relative;
        bottom: 120px;
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

    button.w-50 {
        background-color: purple;
    }
</style>
