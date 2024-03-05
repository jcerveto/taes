<template>
    <div class="marker-card">
      <h3>{{ lugar }}</h3>
      <p>{{ descripcion }}</p>
      <p>Valoración: {{ valoracion }}/10</p>
      <a :href="googleMapsUrl" target="_blank">Ver en Google Maps</a>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      lugar: String,
      descripcion: String,
      valoracion: Number,
      lat: Number,
      lon: Number,
    },
    computed: {
      googleMapsUrl() {
        return `https://www.google.com/maps?q=${this.lat},${this.lon}`;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Agrega estilos CSS según sea necesario */
  .marker-card {
    max-width: 200px;
  }
  </style>
  