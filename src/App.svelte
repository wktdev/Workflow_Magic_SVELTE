<script>
  	import Router from 'svelte-spa-router';
	  import routes from './routes';
	  import {showNav}              from './store/nav_animation.js';
    import {animateNav}           from './store/nav_animation.js';
    import {onMount}              from 'svelte';  
    import {getAllClients}        from './storageAPI/indexedDB.js'
    import { fade, fly }          from 'svelte/transition';

      onMount(function() {

          let firstUseCookieBool = document.cookie.split(';').some(function(item) {
              return item.trim().indexOf('workflow-magic=') == 0
          });


          console.log(firstUseCookieBool)

          getAllClients().then(result=>{
              let clients = [...result];

                if(result.length > 1 || firstUseCookieBool  ){
                    animateNav.set(false);
                    showNav.set(true);
       
                  }

                if(result.length===1 && !firstUseCookieBool ){
                    animateNav.set(true);
                }
          });

          
      });



</script>

<main>

{#if  $showNav }
 <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

	  <div class="collapse navbar-collapse" id="navbarSupportedContent">
	     <div class="collapse navbar-collapse" id="navbarSupportedContent">
	      <ul class="navbar-nav mr-auto">
	        <li class="nav-item active">
	         <!-- <a class="nav-link" href="/"> Client List<span class="sr-only">(current)</span></a> -->
	        </li>
	      </ul>
	    </div>
	     <ul class="navbar-nav mr-auto">
	        <li class="nav-item active" >
	          <a class="nav-link" href="/">All Clients<span class="sr-only">(current)</span></a>
	        </li>
	      </ul>
	  </div>
  </nav>
{/if}



{#if $animateNav }
  <div in:fly="{{ y: -50, duration: 500 }}">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
          <!-- <a class="nav-link" href="/"> Client List<span class="sr-only">(current)</span></a> -->
          </li>
        </ul>
      </div>
      <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link " href="/"> All Clients<span class="sr-only">(current)</span></a>
          </li>
        </ul>
    </div>
  </nav>
  </div>
{/if} 


 <Router {routes} />

</main>

<style>

nav {
  background-color:#682699e6 !important;
  color:white !important

}
  
nav a {
  color:white !important;
}

.nav-item{
  background-color:green;

}
</style>
