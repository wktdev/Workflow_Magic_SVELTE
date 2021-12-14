<script>
    import {onMount} from "svelte"
    import Dexie from 'dexie';
    import SearchAndCreateField from "../components/SearchAndCreateField.svelte";
    import {createClient, getAllClients, deleteClient} from "../storageAPI/indexedDB";
    import { showNav } from '../store/nav_animation.js';
    import { animateNav } from '../store/nav_animation.js';
    import { fade, fly }          from 'svelte/transition';


   
  let clients = []; 
  let firstUseCookieBool;

    onMount(function() {
        firstUseCookieBool = document.cookie.split(';').some(function(item) {
              return item.trim().indexOf('workflow-magic=') == 0
          });


        getAllClients().then(result=>{
            let list = result.reverse();
            clients = [...list];
   
          });
    });

    async function submitToDatabase(item){
         try{
             let id =  await createClient(item); // create new client
             // let result = await getAllClients(); // get all clients
             getAllClients().then(result=>{
               clients = [...result.reverse()];            // store new state to page
                             // show nav if 
                 if(result.length>1){
                    showNav.set(true)
                    animateNav.set(false);
                 }

                if(result.length===1 && !firstUseCookieBool){
                    animateNav.set(true);
                    document.cookie = 'workflow-magic=user-first-submit-true';
                 }

             })

         }catch(error){
                 throw error
         }
     }

    function goToRoute(item){
     console.log(item)

       window.location.href = "#/client/"+item.id +"/dashboard";
    }


   async function onDelete(id){
      let clientID = clients[id].id;
      await deleteClient(clientID);
      await  getAllClients().then(result=>{
            let list = result.reverse();
            clients = [...list];
            console.log(clients)
      });
    }



</script>

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
  margin-bottom:0px;

}

@font-face {
  font-family: logoFont;
  src: url(/fonts/next.ttf);
}


.logo-title{
    font-family:logoFont;
    font-size:2.5em;
    color:#be3ebc91;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
}

.background-image{
  background-image: url(/background_image/background.png);
   background-repeat: no-repeat;
  background-size: auto;
  background-size: cover;
background-size: 43% 60%;
  bottom:  60px;
  top: -20px;
 width: 150%;
 left: 8px;
 height: 1000px;
 position: absolute;
opacity: 0.2;


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


</style>


  
{#if $showNav || $animateNav}
<div class="background-image"></div>


  <div class="logo-form-container">

      <div class="container">
        <div class="row">
          <div class="col-0">
          </div>

          {#if $animateNav && !$showNav}
            <div class="col-12">
            
               <h2 class="logo-title">Workflow Magic</h2>
               <h3 class="app-is-ready-text">Your app is ready!</h3>
               <p class="get-started-text" in:fly="{{ y: -50, duration: 900 }}">
                 To get started select a client name that <br/>
                 you entered below. You can add <br/>
                 as many clients as you want. Use the up <br/> 
                 and down arrows on your keyboard to <br/>
                 make toggling faster!
               </p>
            </div>
          {/if}

          {#if !$animateNav && $showNav}


            <div class="col-12">
               <h2 class="logo-title">Workflow Magic</h2>
               <h3 class="app-is-ready-text">Your app is ready!</h3>
               <p class="get-started-text" >
                 To get started select a client name that <br/>
                 you entered below. You can add <br/>
                 as many clients as you want. Use the up <br/> 
                 and down arrows on your keyboard to <br/>
                 make toggling faster!
               </p>
            </div>
          {/if}


          <div class="col-0">
          </div>
        </div>
        <div class="row">
          <div class="col-0">
          </div>
          <div class="col-12">
       <SearchAndCreateField 
               arrayOfObjects = {clients} 
               keyToRender="name"           
               buttonText = "Create Client"
               onSubmit = {submitToDatabase}  
               onDelete = {onDelete}   
               onSelectionEvent = {goToRoute}
               placeholder= "Type the name of a company or client that you work with"

               />
          </div>
          <div class="col-0">
          </div>
        </div>
      </div>
  </div>

  {:else}
    <div class="logo-form-container">

      <div class="container">
        <div class="row">
          <div class="col-0">

         </div>
          <div class="col-12">
             <h2 class="logo-title">Workflow Magic</h2>
              <h2 class="top-text">
                 SignIn / SignUp
               </h2>

                   <h2 class="top-text">
                 No?
               </h2>

                        <h2 class="top-text">
                 Get Started Now!
               </h2>
          </div>
          <div class="col-0">
          
          </div>
        </div>

        <div class="row">
          <div class="col-0">
          </div>
          <div class="col-12">
              <SearchAndCreateField 
               buttonText = "Create Client"
               placeholder= "Type the name of a client"
               arrayOfObjects = {clients} 
               keyToRender="name"           
               onSubmit = {submitToDatabase}     
                onDelete = {onDelete}   
               onSelectionEvent = {goToRoute}
               />
          </div>
          <div class="col-0">
          </div>
        </div>
      </div>
  </div>
{/if}



