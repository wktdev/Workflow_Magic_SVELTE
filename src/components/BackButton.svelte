<script>
  export let color = `red`;
  export let top = `${-90}px`;
  export let onClick;
  import {push, pop, replace} from 'svelte-spa-router'
  



</script>

<div class="circle-container" style="--top:{top}">
  <div class="res-circle" on:click={function(){ pop() }}>


    
    <div class="circle-txt"><slot>BACK</slot></div>
  </div>
</div>

<style>
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
    border-radius: 50%;

    /* (B) BACKGROUND COLOR */
    background: #eee459;

    /* (C) NECESSARY TO POSITION TEXT BLOCK */
    line-height: 0;

    position: relative;
  }

  .res-circle:hover{
    background:#ffac0da8;
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
