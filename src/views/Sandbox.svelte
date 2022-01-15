<script>
  import { onMount } from "svelte";
  import moment from "moment";


  var current = moment();
  let endDate = moment(current).add(30, "m").toDate();




  let result = moment(endDate).isBefore(current ); //false


  console.log(result);


 </script>