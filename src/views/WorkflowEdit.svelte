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
/*        background-color: green;*/
        justify-content: space-evenly;
    }



    .markdown-editor__right-panel {
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

    .footer {
        height: 5vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }

button{
    background-color: #8f4089 !important;
    font-size: 1.5em;
    color:white !important;
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 10%;
    border-radius: 50px

}

    button:hover {
        outline-color: #666;
        background-color: #0fb52beb !important;
   }

.dashboard-text{
    color:#96008fc9;
    text-align:center;
  display: flex;
  align-items: center;
  justify-content: center;
  color:#787878db;
  font-size:1.2em;
  position:relative;
  top:00px;
  margin-bottom:0px;
  text-align:center;
}

.get-started-text{
    text-align:center;
    font-size:1.1em;
}

.container{
    margin-top:120px;
}

.logo-title{
  text-align:center;
  color:#266d2591;
  font-size:3em;

}

.client-name{
  font-family: logoFont;
    font-size: 1.8em;
    color: #be3ebc91;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
        margin-bottom: -30px;

}

.logo-form-container{
    position:relative;
    bottom:120px;
}
</style>



<script>
    import {onMount} from 'svelte';  
    import marked from 'marked';
    
    let source = '';
    import {getAllClients} from "../storageAPI/indexedDB";
    import {updateWorkflow} from "../storageAPI/indexedDB";
    import {getClientById} from "../storageAPI/indexedDB";
    import {getWorkflowById} from "../storageAPI/indexedDB";
    export let params = {};
    $: workflowContent = marked(source);


 let clientId;
 let currentWorkflow;

let workflowId = parseInt(params["workflow-id"]);


onMount(async ()=>{

   await getWorkflowById(workflowId).then((workflow)=>{
        source = workflow.content;
   })

   await getAllClients().then((x)=>{
    console.log(x)

   })

   // console.log(workflowItem)


})


async function saveWorkflow(){
    await updateWorkflow(workflowId, currentWorkflow.title, workflowContent).then((result)=>{
           alert("Complete")
    })
}


</script>


<!-- <div class="markdown-editor">
    <div class="markdown-editor__right-panel">
        <textarea bind:value={source} class="markdown-editor__source"></textarea>
    </div>

</div>
 -->

 <div class="logo-form-container">
    <div class="container">
        <div class="row">
          <div class="col-0">

         </div>
          <div class="col-12">
                          <h1 class="client-name">Client name</h1>

             <h2 class="logo-title">Workflow name</h2>
            <header class="header">
    
<!--     <button on:click={saveWorkflow}>Save This Workflow</button>
 -->     <button on:click = {saveWorkflow} class="btn btn-info btn-block my-4" >Save This Workflow</button>
    
</header>

            

          </div>
          <div class="col-0">
          
          </div>
        </div>
        <div class="row">
       <div class="markdown-editor">
    <div class="markdown-editor__right-panel">
        <textarea bind:value={source} class="markdown-editor__source" ></textarea>
    </div>

</div>
          <div class="col-0">
          </div>
        </div>
      </div>
  </div>
