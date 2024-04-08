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

th, td {
  padding: 0.5em;
  border: 1px solid #ddd;
  text-align: left;
}

/* MIXTA style */
.table-mixta th,
.table-mixta td:nth-child(odd) {
  background-color: #FFD6DD; /* Lighter pink for odd columns */
}

.table-mixta td:nth-child(even) {
  background-color: #FFC0CB; /* Darker pink for even columns */
}

/* CAFETERA style */
.table-cafetera th,
.table-cafetera td:nth-child(odd) {
  background-color: #E4CDA2; /* Lighter brown for odd columns */
}

.table-cafetera td:nth-child(even) {
  background-color: #D2B48C; /* Darker brown for even columns */
}

/* BEBIDAS FRIAS style */
.table-bebidas-frias th,
.table-bebidas-frias td:nth-child(odd) {
  background-color: #BFEFFF; /* Lighter blue for odd columns */
}

.table-bebidas-frias td:nth-child(even) {
  background-color: #ADD8E6; /* Darker blue for even columns */
}

/* COMIDA SALUDABLE style */
.table-comida-saludable th,
.table-comida-saludable td:nth-child(odd) {
  background-color: #98FB98; /* Lighter green for odd columns */
}

.table-comida-saludable td:nth-child(even) {
  background-color: #90EE90; /* Darker green for even columns */
}
</style>

  
  
  