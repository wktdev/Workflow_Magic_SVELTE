<script>
  export let color = `red`;
  export let top = `${-90}px`;
  export let width =`${80}px`
  export let onClick;
  export let text = "Back";
  export let buttonEvent
  import {push, pop, replace} from 'svelte-spa-router'
</script>


<div class="circle-container" style="--top:{top}">
  <!-- <div class="res-circle" on:click={buttonEvent} style="--width:{width}">  -->
    <img on:click={buttonEvent}  class="res-circle"src="images/backicon.png" alt="back-image" />
   
    <!-- <div class="circle-txt"><slot>{text}</slot></div> -->
  </div>




<!-- <div class="circle-container" style="--top:{-140}">
  <div class="res-circle" id="big-circle" on:click={function(){ pop() }}>


    
    <div class="circle-txt"><slot>ACME Dashboard</slot></div>
  </div>
</div> -->

<style>
  /* #big-circle{
    height:150px;
    width:150px;
    left:20px;
  } */

  img{
    opacity:0.8
  }
  .circle-container {
    z-index: +5;
    top: var(--top);
    position: absolute;
    /* top: var(--top); */
    background: var(--color, "red");
    width: 80%;
  }

  .res-circle {
    cursor: pointer;
    /* (A) PERCENTAGE WIDTH & BORDER RADIUS */
    width: 80px;
    width: var(--width);
    border-radius: 50%;

    /* (B) BACKGROUND COLOR */
    background: #54b35b7a;

    /* (C) NECESSARY TO POSITION TEXT BLOCK */
    line-height: 0;

    position: relative;
  }

  .res-circle:hover{
    background:#8f4089;
  }

  /* (D) MATCH HEIGHT */
  .res-circle::after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }

  /* (E) TEXT BLOCK */
  .circle-txt {
    /* (E1) CENTER TEXT IN CIRCLE */
    position: absolute;
    bottom: 50%;
    width: 100%;
    text-align: center;

    /* (E2) THE FONT - NOT REALLY IMPORTANT */
    font-family: arial, sans-serif;
    font-weight: bold;
  }

  
</style>
