<script>



	import DatePicker from "@beyonk/svelte-datepicker/src/components/DatePicker.svelte";
	
	let selected

</script>




  <div class="logo-form-container">
    <div class="container">
      <div class="row">
        <div class="col-0" />
        <div class="col-12">
          <h1 class="client-name">Set Date and Time</h1>
          <div class="logo-title">
            <DatePicker placeholder = "Choose Date & Time" range={true} time = {true} on:range-selected={(e) => (selected = e.detail)}/>
            </div>
            
        </div>
        <div class="col-0" />
      </div>
      <div class="row">
        <div class="col-0" />
        <div class="col-12">
          <!-- Replace value of arrayOfObject with calendarEvents-->
        </div>
        <div class="col-0" />
      </div>
    </div>
  </div>
  
  
<style>
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
    margin-bottom: 30px;
  }

  @font-face {
    font-family: logoFont;
    src: url(/fonts/next.ttf);
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

  .logo-title {
    text-align: center;
    color: #266d2591;
    font-size: 1em;
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
</style>

