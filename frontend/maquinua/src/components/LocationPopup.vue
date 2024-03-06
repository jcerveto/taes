<template>
    <div>
      <h3>Coordenadas: {{ coordinates }}</h3>
      <label>Tipo de productos:</label>
      <input v-model="productType" />
      <label>Edificio:</label>
      <input v-model="building" />
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        coordinates: '38.384, -0.513', // Puedes ajustar esto con las coordenadas correctas
        productType: '',
        building: '',
      };
    },
  };
  </script>
  
  <style scoped>
  /* Estilos específicos del componente si es necesario */
  </style>
  