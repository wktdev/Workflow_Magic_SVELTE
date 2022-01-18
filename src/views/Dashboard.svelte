<script>
  import { onMount } from "svelte";
  import ToggleList from "../components/ToggleList.svelte";
  import BackButton from "../components/BackButton.svelte";
  import { fade, fly } from "svelte/transition";
  import { getClientById } from "../storageAPI/indexedDB";
  import {push, pop, replace} from 'svelte-spa-router'


  export let params = {};
  let clientName;
  console.log(params);

  onMount(async () => {
    console.log(params);
    let clientId = parseInt(params.clientId);
    await getClientById(clientId).then((client) => {
      clientName = client.name;
    });
  });

  let workflowsURL = window.location.href + "/" + "workflows";
  let contactsURL = window.location.href + "/" + "contacts";
  let calendarURL = window.location.href + "/" + "calendar";

  let dashboardLinks = [
    {
      title: "Workflows",
      description: "- A note pad to document client information",
      url: workflowsURL,
      endpoint: "Workflows",
    },

    {
      title: "Meetings & Events",
      description: "- Event calendar for this client",
      url: calendarURL,
      endpoint: "calendar",
    },

    /*{title:"Contacts", url: contactsURL}*/
  ];

  function onSelection(index) {
    window.location.href =
      "#/client/" +
      params.clientId +
      "/dashboard/" +
      dashboardLinks[index].endpoint.toLowerCase();
  }


  function redirectURL(){

   window.location.assign("/#/"); // or
  }
</script>



<div class="logo-form-container">
  <div class="container">
    <BackButton top="-100px" text="Go to Client List" width="160px" buttonEvent = {redirectURL}></BackButton>
    <div class="row">
      <div class="col-0" />
      <div class="col-12" id="ele-container">
      

        <h1 class="client-name">Dashboard</h1>
        <h2 class="logo-title">{clientName}</h2>
        <p class="get-started-text">
          Below is a list of useful tools to make working with the client easier.<br />
          Each item has a description below it. <br />
          To start organizing your project, make a selection.<br />
          If at any time you feel lost, click the big green arrow to go back a step.
        </p>
        <hr />
      </div>
      <div class="col-0" />
    </div>
    <div class="row">
      <div class="col-0" />
      <div class="col-12">
        <ToggleList
          arrayOfObjects={dashboardLinks}
          keyToRender="title"
          onSelectionEvent={onSelection}
        />
      </div>
      <div class="col-0" />
    </div>
  </div>
</div>

<!-- <h2 class="dashboard-text">DASHBOARD</h2>
<p class="get-started-text">Below is a list of data categories for the client. You can add to, remove from, and search each category. Each item has a description below it. To start organizing your project, select a category.</p>

 -->

<!-- 
  <div class="logo-form-container">
      <div class="container">
        <div class="row">
          <div class="col-0">
          </div>
            <div class="col-4">
    
               <p class="get-started-text">Below is a list of data categories for the client. You can add to, remove from, and search each category. Each item has a description below it. To start organizing your project, select a category.</p>
            </div>
          <div class="col-0">
          </div>
        </div>
        <div class="row">
          <div class="col-0">
          </div>
          <div class="col-12">
         


          </div>
          <div class="col-0">
          </div>
        </div>
      </div>
  </div>
 -->

<style>

  #ele-container{
    top: -60px;
    position: relative;

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
    top: 20px;
    margin-bottom: 50px;
    text-align: center;
  }

  .get-started-text {
    text-align: center;
    font-size: 1.1em;
    color:#787878db;
  }

  .container {
    margin-top: 200px;
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

  .logo-form-container {
    position: relative;
    bottom: 90px;
  }
</style>
