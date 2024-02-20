<script setup>

import TableFromCsv from '@/components/TableFromCsv.vue';


</script>

<template>
  <h1>
    Home
  </h1>

  <TableFromCsv csvPath="/prices.csv" title="Prices" />
  <TableFromCsv csvPath="/distribution.csv" title="Teika's distribution" />

</template>



<style>
h3 {}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
