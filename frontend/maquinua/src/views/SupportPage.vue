<template>
    <div>
      <h1>Support Page</h1>
      <router-link to="/">Go to Home</router-link>
  
      <div v-for="machine in filteredMachines" :key="machine.id" :class="getTableClass(machine.type)">
        <table>
          <tbody>
            <tr>
              <th>Título de la máquina</th>
              <td colspan="4">{{ machine.popupContent.title }}</td>
            </tr>
            <tr>
              <th>Descripción de la máquina</th>
              <td colspan="4">{{ machine.popupContent.description }}</td>
            </tr>
            <tr>
              <th>Tipo de máquina</th>
              <td colspan="4">{{ machine.type }}</td>
            </tr>
            <tr>
              <th>Nombre del producto</th>
              <td v-for="product in machine.lista_productos" :key="product">{{ product }}</td>
            </tr>
            <tr>
              <th>Precio del producto</th>
              <td v-for="price in machine.lista_precios" :key="price">{{ price }}</td>
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
    computed: {
      filteredMachines() {
        return this.machines.filter(machine => machine.lista_productos.length > 0);
      }
    },
    created() {
      this.fetchMachines();
    },
    methods: {
      fetchMachines() {
        fetch('/maquinas.json')
          .then(response => response.json())
          .then(data => {
            this.machines = data;
          })
          .catch(error => console.error('Error:', error));
      },
      getTableClass(type) {
        const typeToClassMap = {
          'MIXTA': 'mixta',
          'CAFETERA': 'cafetera',
          'BEBIDAS FRIAS': 'bebidas-frias',
          'COMIDA SALUDABLE': 'comida-saludable'
        };
        return `table-${typeToClassMap[type] || type.toLowerCase()}`;
      }
    }
  };
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 2em;
  }
  
  th {
    background-color: #f2f2f2;
    text-align: left;
  }
  
  td ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  td ul li {
    padding: 0.5em;
    border: 1px solid #ddd;
  }
  
  /* MIXTA style */
  .table-mixta th {
    background-color: #FFC0CB;
  }
  .table-mixta ul li:nth-child(odd) {
    background-color: #FFD6DD;
  }
  .table-mixta ul li:nth-child(even) {
    background-color: #FFC0CB;
  }
  
  /* CAFETERA style */
  .table-cafetera th {
    background-color: #D2B48C;
  }
  .table-cafetera ul li:nth-child(odd) {
    background-color: #E4CDA2;
  }
  .table-cafetera ul li:nth-child(even) {
    background-color: #D2B48C;
  }
  
  /* BEBIDAS FRIAS style */
  .table-bebidas-frias th {
    background-color: #ADD8E6;
  }
  .table-bebidas-frias ul li:nth-child(odd) {
    background-color: #BFEFFF;
  }
  .table-bebidas-frias ul li:nth-child(even) {
    background-color: #ADD8E6;
  }
  
  /* COMIDA SALUDABLE style */
  .table-comida-saludable th {
    background-color: #90EE90;
  }
  .table-comida-saludable ul li:nth-child(odd) {
    background-color: #98FB98;
  }
  .table-comida-saludable ul li:nth-child(even) {
    background-color: #90EE90;
  }
  </style>
  
  
  