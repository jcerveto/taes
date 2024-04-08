<template>
    <div>
      <h1>Support Page</h1>
      <router-link to="/">Go to Home</router-link>
  
      <div v-for="machine in filteredMachines" :key="machine.id" :class="getTableClass(machine.type)">
        <table>
          <tbody>
            <tr>
              <th>Título de la máquina</th>
              <td>{{ machine.popupContent.title }}</td>
            </tr>
            <tr>
              <th>Descripción de la máquina</th>
              <td>{{ machine.popupContent.description }}</td>
            </tr>
            <tr>
              <th>Tipo de máquina</th>
              <td>{{ machine.type }}</td>
            </tr>
            <tr v-for="(product, index) in machine.lista_productos" :key="`product-${index}`">
              <th>Nombre del producto</th>
              <td>{{ product }}</td>
              <th>Precio del producto</th>
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
  
  th, td {
    padding: 0.5em;
    border: 1px solid #ddd;
  }
  
  th {
    background-color: #f2f2f2;
    text-align: left;
  }
  
  /* MIXTA style */
  .table-mixta th {
    background-color: #FFC0CB;
  }
  .table-mixta td {
    background-color: #FFD6DD;
  }
  
  /* CAFETERA style */
  .table-cafetera th {
    background-color: #D2B48C;
  }
  .table-cafetera td {
    background-color: #E4CDA2;
  }
  
  /* BEBIDAS FRIAS style */
  .table-bebidas-frias th {
    background-color: #ADD8E6;
  }
  .table-bebidas-frias td {
    background-color: #BFEFFF;
  }
  
  /* COMIDA SALUDABLE style */
  .table-comida-saludable th {
    background-color: #90EE90;
  }
  .table-comida-saludable td {
    background-color: #98FB98;
  }
  </style>
  
  