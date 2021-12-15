

<style>

.description{
  text-align:center !important;
  display:block;
}

.selected{
    text-align:center !important;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    padding: 1rem;
    line-height: 1;
    background-color:#8a0eff3b;
    margin:0 auto;
}

input{
    font-size: 2em;
    color: grey;
    text-align:center;
}

li{
    font-size: 2em;
    color: grey;
    text-align:center !important;
      margin:0 auto;
      width: 100%;
       padding-left: 0px;
}

/*.list-group-item{
    text-align:center !important;
}*/

button{
    background-color: #8f4089 !important;
    font-size: 1.5em;
    color:white !important;

}

.input-group{
    height:200px;
}
  
  .list-group-item{
    text-align: center !important;
    display: block;
    flex-flow: row wrap;
    align-items: center;
    padding: 1rem;
    line-height: 1;
}
  .selected{
    text-align: center !important;
    display: block;
    flex-flow: row wrap;
    align-items: center;
    padding: 1rem;
    line-height: 1;
}

</style>


<script>
	

import { onMount } from 'svelte';
export let keyToRender;
export let arrayOfObjects = []; 
export let onSelectionEvent;


    $:nameOfKey = keyToRender;
    let hoverID;
    let indexVal = 0;
    let downArrowPress = 40;
    let upArrowPress = 38; 
    let enterKeyPress = 13;
    let inputTextField = "";
    let itemVal = "";
    let inputIsFocused = true;
    let onHoverClassChangeState = ''; 

    function resetClassOnMouseout(){
        onHoverClassChangeState = "";

    }

    function onClickHandler(i){
        onSelectionEvent(i)

    }

     function handleKeydown(event) {
        if(event.keyCode === upArrowPress) {
            indexVal-=1;    
            indexVal = indexVal < 0 ?  arrayOfObjects.length-1 : indexVal
            console.log(indexVal);
        }

        if(event.keyCode === downArrowPress) {
            indexVal+=1;
            indexVal = indexVal > arrayOfObjects.length-1 ?  0 : indexVal
            console.log(indexVal);
        }

     

        if(event.keyCode === enterKeyPress && indexVal !== arrayOfObjects.length ){
      
               onClickHandler(indexVal)
            
        }
    }


</script>

<svelte:window on:keydown={handleKeydown}/>

    <ul class="list-inline mx-auto justify-content-center">
        {#each arrayOfObjects as item, i}

            {#if i === indexVal}
            <div class="d-flex">
               <li  class={onHoverClassChangeState === i ? 'selected' : "list-group-item"}
                   on:mouseover={() => onHoverClassChangeState = i }
                   on:mouseout = {resetClassOnMouseout}
                   on:click={()=>onClickHandler(i)} style="background-color:#8a0eff3b">{item[nameOfKey]} 

               </li>  

             </div>
               <p class="description">{item["description"]}</p>  
                  <hr>
               {:else}
  <div class="d-flex">
               <li class= {onHoverClassChangeState === i ? 'selected' : "list-group-item"}
                   on:mouseover= {() => onHoverClassChangeState = i }
                   on:mouseout = {resetClassOnMouseout}
                   on:click={()=>onClickHandler(i)} style="">{item[nameOfKey]}
              </li>  

            </div>
              <p class="description" >{item["description"]}</p>
                 <hr>
            {/if}
        {/each}
    </ul>
