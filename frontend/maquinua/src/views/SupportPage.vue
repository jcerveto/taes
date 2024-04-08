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
            <tr class="productos-header">
              <th colspan="2">Productos</th>
            </tr>
            <tr>
              <th>Nombre del producto</th>
              <th>Precio del producto</th>
            </tr>
            <tr v-for="(product, index) in machine.lista_productos" :key="product" :class="{'odd': index % 2 === 0, 'even': index % 2 !== 0}">
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
  text-align: left;
}

/* MIXTA style - odd rows darker, even rows lighter */
.table-mixta tr:nth-child(odd) {
  background-color: #FFD6DD; /* Darker pink for odd rows */
}
.table-mixta tr:nth-child(even), .table-mixta .productos-header {
  background-color: #FFC0CB; /* Lighter pink for even rows and productos header */
}

/* CAFETERA style - odd rows darker, even rows lighter */
.table-cafetera tr:nth-child(odd) {
  background-color: #D2B48C; /* Darker brown for odd rows */
}
.table-cafetera tr:nth-child(even), .table-cafetera .productos-header {
  background-color: #E4CDA2; /* Lighter brown for even rows and productos header */
}

/* BEBIDAS FRIAS style - odd rows darker, even rows lighter */
.table-bebidas-frias tr:nth-child(odd) {
  background-color: #ADD8E6; /* Darker blue for odd rows */
}
.table-bebidas-frias tr:nth-child(even), .table-bebidas-frias .productos-header {
  background-color: #BFEFFF; /* Lighter blue for even rows and productos header */
}

/* COMIDA SALUDABLE style - odd rows darker, even rows lighter */
.table-comida-saludable tr:nth-child(odd) {
  background-color: #90EE90; /* Darker green for odd rows */
}
.table-comida-saludable tr:nth-child(even), .table-comida-saludable .productos-header {
  background-color: #98FB98; /* Lighter green for even rows and productos header */
}

/* Adjusting the "Productos" header to span two columns */
.productos-header th {
  text-align: center;
  font-weight: bold;
}
</style>


  