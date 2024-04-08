<template>
    <div>
      <h1>Support Page</h1>
      <router-link to="/">Go to Home</router-link>
  
      <div v-for="machine in machines" :key="machine.id">
        <table v-if="machine.lista_productos.length > 0" :class="getTableClass(machine.type)">
          <thead>
            <tr>
              <th>Título de la máquina</th>
              <th>Descripción de la máquina</th>
              <th>Tipo de máquina</th>
              <th>Nombre del producto</th>
              <th>Precio del producto</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in machine.lista_productos" :key="index">
              <td>{{ machine.popupContent.title }}</td>
              <td>{{ machine.popupContent.description }}</td>
              <td>{{ machine.type }}</td>
              <td>{{ product }}</td>
              <td>{{ machine.lista_precios[index] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        machines: []
      };
    },
    created() {
      this.fetchMachines();
    },
    methods: {
      fetchMachines() {
        // Fetch the data from the local JSON file
        // Note: Depending on your setup you might need to set the correct path to your JSON file
        fetch('/maquinas.json')
          .then(response => response.json())
          .then(data => {
            this.machines = data;
          })
          .catch(error => console.error('Error:', error));
      },
      getTableClass(type) {
        switch (type) {
          case 'MIXTA':
            return 'table-mixta';
          case 'CAFETERA':
            return 'table-cafetera';
          case 'BEBIDAS FRIAS':
            return 'table-bebidas-frias';
          case 'COMIDA SALUDABLE':
            return 'table-comida-saludable';
          default:
            return '';
        }
      }
    }
  };
  </script>
  
  <style>
  /* Add your styles here, example for one type of machine */
  .table-mixta thead {
    background-color: #FFC0CB; /* Light pink background for header */
  }
  .table-mixta tbody tr:nth-child(odd) {
    background-color: #FFB6C1; /* Lighter pink for odd rows */
  }
  .table-mixta tbody tr:nth-child(even) {
    background-color: #FFC0CB; /* Darker pink for even rows */
  }
  /* Repeat similar styles for .table-cafetera, .table-bebidas-frias, and .table-comida-saludable */
  </style>
  