<script>
  import { onMount } from "svelte";
  import Dexie from "dexie";
  import Dropzone from "svelte-file-dropzone";
  import SearchAndCreateField from "../components/SearchAndCreateField.svelte";
  import { exportIndexedDB, importIndexedDB } from "../storageAPI/indexedDB";
  import {} from "dexie-export-import";

  import BackButton from "../components/BackButton.svelte";

  //  import downloadjs from "downloadjs";

  async function downloadIndexDBUserData() {
    await exportIndexedDB().then((blob) => {
      console.log(blob);
    });
  }

  // async function handleFileChange(event) {
  //   console.log("File(s) dropped");
  //   event.preventDefault();
  //   console.log(event.target.files[0]);

  //   importIndexedDB(event.target.files[0]);
  // }


  async function handleFileChange(event) {
    console.log("File(s) dropped");
    event.preventDefault();
    console.log(event.target.files[0]);

    importIndexedDB(event.target.files[0]);
  }


  async function handleFileDrop(event) {
    console.log("File(s) dropped");
    event.preventDefault();
    console.log(event.dataTransfer.files[0]);

    importIndexedDB(event.dataTransfer.files[0]);
  }


  //_________________________________________________



  let files = {
    accepted: [],
    rejected: []
  };

  function handleFilesSelect(e) {
    const { acceptedFiles, fileRejections } = e.detail;
    files.accepted = [...files.accepted, ...acceptedFiles];
    files.rejected = [...files.rejected, ...fileRejections];

    importIndexedDB(files.accepted[0]);
  }


</script>

<!-- <form> -->
  <input on:change={handleFileChange} type="file" name="filename" />

  <!-- <input type="submit" /> -->
<!-- </form> -->

<div class="logo-form-container">
  <div class="container">
    <div class="row">
      <div class="col-0">
        <BackButton onClick={console.log("WORKS CLICKED")} />
      </div>
      <div class="col-12">
        <h2 class="logo-title">Workflow Magic</h2>

        <h2 class="top-text" on:click={downloadIndexDBUserData}>
          Click Here to Save & Download Your Data
        </h2>
      </div>
      <Dropzone on:drop={handleFilesSelect} />
<ol>
  {#each files.accepted as item}
    <li>{item.name}</li>
  {/each}
</ol>

      <div class="col-0" />

      <div class="column" />
    </div>

    <div class="row">
      <div class="col-0" />
      <div class="col-12" />
      <div class="col-0" />
    </div>
  </div>
</div>

<style>
  #dropzone {
    width: 600px;
    height: 120px;
    border: 2px dotted #bbb;
    border-radius: 10px;
    padding: 35px;
    color: rgba(0, 0, 0, 0.52);
    position: relative;
    top: 70px;
    margin: 0 auto;
    text-align: center;
  }

  .get-started-text {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #787878db;
    font-size: 1.2em;
    position: relative;
    top: 20px;
    margin-bottom: 50px;
  }

  .top-text {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #787878db;
    font-size: 1.2em;
    position: relative;
    top: 0px;
    margin-bottom: 0px;
  }

  .top-text:hover {
    outline-style: solid;
    outline-color: grey;
    background-color: #fbff0042;
    border-radius: 10px;
  }

  @font-face {
    font-family: logoFont;
    src: url(/fonts/next.ttf);
  }

  .logo-title {
    font-family: logoFont;
    font-size: 2.5em;
    color: #be3ebc91;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .background-image {
    background-image: url(/background_image/background.png);
    background-repeat: no-repeat;
    background-size: auto;
    background-size: cover;
    background-size: 43% 60%;
    bottom: 60px;
    top: -190px;
    width: 150%;
    left: 8px;
    height: 1000px;
    position: absolute;
    opacity: 0.2;
  }

  .logo-form-container {
    position: relative;
    top: 100px;
  }

  .app-is-ready-text {
    color: #819dc2;
    text-align: center;
    font-size: 2em;
  }
</style>
