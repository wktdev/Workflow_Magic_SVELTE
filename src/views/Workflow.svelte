<script>
  import { onMount } from "svelte";
  import marked from "marked";
  import {updateWorkflow} from "../storageAPI/indexedDB";
  import { getWorkflowById } from "../storageAPI/indexedDB";
  import {getClientById} from "../storageAPI/indexedDB";
  export let params = {};
  let myData = "";
  // $: workflowContent = marked(currentWorkflow.content)

  let workflowId = parseInt(params["workflow-id"]);
  let clientID = parseInt(params["clientId"]);
  let clientName = "";
  let workflowTitle = "";
  

  onMount(async () => {
    console.log(params);



    await getWorkflowById(workflowId).then((workflow) => {
       workflowTitle = workflow.title;
       myData = workflow.content;
     
    });

     await getClientById(clientID).then((client)=>{
      clientName = client.name
     });

     
  });

  let rawData = "";
  let preview = false;
  let previewText = "Preview";

  function togglePreview() {
    preview = !preview;
    previewText = preview ? "Edit" : "Preview";
  }

  async function editWorkflow() {
    window.location.href =
      "#/client/" +
      params.clientId +
      "/dashboard/workflows/" +
      workflowId +
      "/edit";
  }
</script>

<div class="logo-form-container">
  <div class="container">
    <div class="row">
      <div class="col-0" />
      <div class="col-12">

        <h2 class="logo-title">{clientName}</h2>
        <h1 class="client-name">{workflowTitle}</h1>

  
        <header class="header">
          <button on:click={editWorkflow} class="btn btn-info btn-block my-4"
            >Edit This Workflow</button
          >
        </header>

        <div>
          <div class="button-container" />
          {@html marked(myData)}
        </div>
      </div>
      <div class="col-0" />
    </div>
  </div>
</div>

<!-- 



<style>

    h1{
        font-size: 1em;
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

    .markdown-editor {
        width: 100%;
        display: flex;
        align-items:flex-start;
        justify-content: space-evenly;
    }

    .markdown-editor__left-panel, .markdown-editor__right-panel {
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
    }

    .markdown-editor__source:focus {
        outline: none;
    }

    .markdown-editor__output {
        width: 100%;
        padding: 0 2em;
    }

    .footer {
        height: 5vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    button{
        background-color: orange;
        outline-style: solid;
        border-radius: 5px;
        padding: 5px;
        margin: 5px;

    }

    button:hover {
        outline-color: #666;
        background-color: #f4ee40;
    }



</style>



<script>
    import {onMount} from 'svelte';  
    import marked from 'marked';
    let source = '# Write markdown here';
    export let params = {};
    import {getClientById} from "../storageAPI/indexedDB";
    $: markdown = marked(source);

 
onMount(async ()=>{
   await getClientById(1).then((client)=>{
      console.log(client)
    });

   console.log(params)
})


</script>

<header class="header">
    <button>Edit This Workflow</button>
    
</header>

<div class="markdown-editor">
    <div class="markdown-editor__right-panel">
        <div class="markdown-editor__output">{@html markdown}</div>
    </div>
</div>


 -->
<style>
  h1 {
    font-size: 1em;
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

  .markdown-input {
    font-size: 2rem;
    width: 100%;
    height: 150%;
    border: unset;
    border: 1px solid #9c9a9a;
    padding: 0.8rem 1rem;
    border-radius: 10px;
    background: transparent;
  }

  .markdown-input::placeholder {
    font-size: 2rem;
    font-weight: 100;
    font-family: sans-serif;
    letter-spacing: 1px;
  }

  .markdown-input:focus {
    outline: unset;
    font-size: 2rem;
  }

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
    margin-top: 70px;
    margin-bottom: -20px;

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
