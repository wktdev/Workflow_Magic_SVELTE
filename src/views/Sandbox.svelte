<script>
  async function getRandomNumber() {
  

    let res = await fetch("http://api.github.com/users/wktdev");
    const text = await res.json();

    if (res.ok) {
      return text;
    } else {
      throw new Error(text);
    }

  }

  let promise = getRandomNumber();

 


</script>



<!-- replace this element -->
<p>{promise}</p>





