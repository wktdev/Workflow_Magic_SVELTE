<style>
.get-started-text{
  text-align:center;
  display: flex;
  align-items: center;
  justify-content: center;
  color:#787878db;
  font-size:1.2em;
  position:relative;
  top:20px;
  margin-bottom:50px;

}

.top-text{
  text-align:center;
  display: flex;
  align-items: center;
  justify-content: center;
  color:#787878db;
  font-size:1.2em;
  position:relative;
  top:0px;
  margin-bottom:30px;

}

@font-face {
  font-family: logoFont;
  src: url(/fonts/next.ttf);
}



.logo-form-container{
    position:relative;
    top:100px;
}

.app-is-ready-text{
    color:#819dc2;
    text-align:center;
    font-size:2em;
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
}

</style>



<script>
import SearchAndCreateField from "../components/SearchAndCreateField.svelte";
import {createWorkflow }from "../storageAPI/indexedDB";
import {getClientWorkflows,getClientById,deleteWorkflow} from "../storageAPI/indexedDB";
import {onMount} from 'svelte';  
export let params = {};

let workflows = [];
let clientID;
let clientName;

onMount(async ()=>{
    clientID = params.clientId;
    getClientWorkflows(clientID).then((result)=>{
        workflows = [...result]
    });

    await getClientById( parseInt(params.clientId)).then((client)=>{
      clientName = client.name
    });


});



async function submitToDatabase(item){
    let workflowID = await createWorkflow(clientID,item); // create new client
    await getClientWorkflows(clientID).then(result=>{
         workflows = [...result.reverse()];            // store new state to page
    });
    window.location.href = "#/client/"+clientID+"/dashboard/workflows/" + workflowID + "/edit";
}


function goToRoute(item){
  let workflowID = item.id;
  if(item.title === undefined && item.content === undefined){
     window.location.href = "#/client/"+clientID+"/dashboard/workflows/" + workflowID + "/edit";
  }else{
          window.location.href = "#/client/"+clientID+"/dashboard/workflows/" + workflowID

  }

  // get workflow from IndexDB
  // If not exist then go to EDIT
  // If DOES exist go to page
console.log(item)
    // let workflowID = item.id;
    
}

async function onDelete(id){
  let workflowID = workflows[id].id;
  await deleteWorkflow(workflowID);
  await  getClientWorkflows(clientID).then(result=>{
        let list = result.reverse();
        workflows = [...list];
     
  });
}




</script>



 <div class="logo-form-container">
    <div class="container">
        <div class="row">
          <div class="col-0">

         </div>
          <div class="col-12">
            <h1 class="client-name"> Workflows</h1>
             <h2 class="logo-title">{clientName}</h2>

          </div>
          <div class="col-0">
          
          </div>
        </div>
        <div class="row">
          <div class="col-0">
          </div>
          <div class="col-12">
          <SearchAndCreateField 
               placeholder= "Type the name of the workflow"
               arrayOfObjects = {workflows} 
               keyToRender="title"           
               onSubmit = {submitToDatabase}     
               onSelectionEvent = {goToRoute}
               onDelete = {onDelete}   
               buttonText = "Create Workflow"

           />
          </div>
          <div class="col-0">
          </div>
        </div>
      </div>
  </div>
