<script>
  import * as S from "svelte-materialify";
  // OR
  import { Button } from "svelte-materialify";

  import { onMount } from "svelte";

  export let keyToRender;
  export let arrayOfObjects = [];
  export let onSubmit;
  export let onDelete;
  export let redirect;
  export let idPropName;
  export let onSelectionEvent;
  export let placeholder;
  export let buttonText;
  let arrayOfObjectsCopy;

  $: arrayOfObjectsCopy = arrayOfObjects;
  $: nameOfKey = keyToRender;
  let hoverID;
  let indexVal = -1;
  let downArrowPress = 40;
  let upArrowPress = 38;
  let enterKeyPress = 13;
  let inputTextField = "";
  let itemVal = "";
  let inputIsFocused = true;
  let onHoverClassChangeState = "";

  onMount(function () {
    inputTextField.focus();
  });

  console.log(arrayOfObjectsCopy);

  function isFocused() {
    inputIsFocused = true;
    indexVal = arrayOfObjectsCopy.length || -1;
  }

  function isBlurred() {
    inputIsFocused = false;
  }

  function search(e) {
    console.log(e.target.value);
    const searchString = e.target.value.toLowerCase();
    const filteredCharacters = arrayOfObjects.filter((character) => {
      return (
        character[nameOfKey].toLowerCase().includes(searchString) ||
        character[nameOfKey].toLowerCase().includes(searchString)
      );
    });

    arrayOfObjectsCopy = [...filteredCharacters];
  }

  function handleKeydown(event) {
    if (event.keyCode === upArrowPress) {
      indexVal -= 1;
      indexVal = indexVal < 0 ? arrayOfObjectsCopy.length : indexVal;
      console.log(indexVal);
    }

    if (event.keyCode === downArrowPress) {
      indexVal += 1;
      indexVal = indexVal > arrayOfObjectsCopy.length ? 0 : indexVal;
      console.log(indexVal);
    }

    if (indexVal > arrayOfObjectsCopy.length - 1 || indexVal < 0) {
      inputTextField.focus();
    } else {
      inputTextField.blur();
    }

    if (
      event.keyCode === enterKeyPress &&
      indexVal !== arrayOfObjectsCopy.length
    ) {
      if (inputIsFocused) {
      } else {
        console.log(indexVal, "onSelectionEvent");
        // router.redirect(redirect + "/" +arrayOfObjectsCopy[indexVal][idPropName])
        onSelectionEvent(arrayOfObjectsCopy[indexVal]); /// need OBJECT!
      }
    }
  }

  function onClickHandler(i) {
    onSelectionEvent(arrayOfObjectsCopy[i]);
  }

  function handleSubmit(e) {
    const value = e.target.input.value;
    let trimmedVal = value.trim();
    if (trimmedVal) {
      arrayOfObjects = [...arrayOfObjects, { name: value }];
      onSubmit(trimmedVal);
    } else {
      alert("value can not be empty");
    }

    itemVal = "";
  }

  function resetClassOnMouseout() {
    onHoverClassChangeState = "";
  }

  function handleDelete(i) {
    // onDelete()
    onDelete(i);
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<section class="container">
  <form on:submit|preventDefault={handleSubmit} class="input-group">
    <input
      placeholder={placeholder || "Type the name of an item here and submit"}
      aria-label="Clients name"
      aria-describedby=""
      class="form-control"
      on:click={isFocused}
      on:focus={isFocused}
      on:blur={isBlurred}
      type="text"
      name="input"
      bind:this={inputTextField}
      bind:value={itemVal}
      on:input={search}
      autocomplete="off"
    />

    <button class="btn btn-info btn-block my-4" type="submit"
      >{buttonText}</button
    >
  </form>
  <div>
    <ul>
      {#each arrayOfObjectsCopy as item, i}
        {#if i === indexVal}
          <Button class="red white-text" on:click={() => handleDelete(i)}
            >DELETE</Button
          >
          <li
            class={onHoverClassChangeState === item["id"]
              ? "selected"
              : "list-group-item"}
            style="background-color:#8a0eff3b"
            on:mouseover={() => (onHoverClassChangeState = item["id"])}
            on:mouseout={resetClassOnMouseout}
            on:click={() => onClickHandler(i)}
          >
            {item[nameOfKey]}
          </li>
        {:else}
          <Button class="red white-text" on:click={() => handleDelete(i)}
            >DELETE</Button
          >
          <li
            class={onHoverClassChangeState === item["id"]
              ? "selected"
              : "list-group-item"}
            on:mouseover={() => (onHoverClassChangeState = item["id"])}
            on:mouseout={resetClassOnMouseout}
            on:click={() => onClickHandler(i)}
            style=""
          >
            {item[nameOfKey]}
          </li>
        {/if}

        <hr />
      {/each}
    </ul>
  </div>
</section>

<!-- Documentation___________________________________

<SearchAndCreateField nameOfKey="name" arrayOfObjects = {items}/>


Component takes two arguments 

The arguments are:

1. arrayOfObjects

  This should have the structure of [{someKey:"someval"},{someKey:"someval"}]


2. nameOfKey

  This is the data of the key that you want to access
  IE: 

  If arrayOfObject is [{name:"blah"},{name:"whatever"},{name:"I don't know"}]

  then nameOfKey is "name"


 Example use for copy and paste:
 
    <script>
    import SearchAndCreateField from "../components/SearchAndCreateField.svelte"
    let items = [{name:"a outside"},{name:"some thing"},{name:"c thing"}]; 

    </script>

    <SearchAndCreateField nameOfKey="name" arrayOfObjects = {items}/>



For more documentation check the documentation folder in src/documentation

_____________________________________________________________-->

<!-- NOTE


On hover, you need to select the index value of the thing you are hovering over
    -->

<style>
  .selected {
    text-align: center !important;
    display: block;
    /*   flex-flow: row wrap;*/
    align-items: center;
    padding: 1rem;
    line-height: 1;
    background-color: #8a0eff3b;
  }

  input {
    font-size: 2em;
    color: grey;
    text-align: center;
  }

  input::placeholder {
    font-size: 0.6em;
  }

  li {
    font-size: 2em;
    color: grey;
    text-align: center !important;
    list-style-type: none;
    padding-left: 0px;
    /*  width:900%;*/
  }

  .list-group-item {
    text-align: center !important;
    display: block;
    flex-flow: row wrap;
    align-items: center;
    padding: 1rem;
    line-height: 1;
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

  .input-group {
    height: 200px;
  }

  .delete {
    float: left;
  }

  ul {
    position: relative;
    list-style-position: inside;
    padding: 0px;
  }
</style>
