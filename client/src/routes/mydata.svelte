<script>
  async function loadMyData() {
    const res = await fetch('http://localhost:4009/mydata');
    const mydata = await res.json();

    console.log(mydata);
  }

  loadMyData();

</script>

<h1>Hello MyData</h1>
