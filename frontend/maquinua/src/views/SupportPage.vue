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

/* MIXTA style - odd rows darker, even rows lighter */
.table-mixta tr:nth-child(odd) th,
.table-mixta tr:nth-child(odd) td {
  background-color: #FFD6DD; /* Darker pink */
}
.table-mixta tr:nth-child(even) th,
.table-mixta tr:nth-child(even) td {
  background-color: #FFC0CB; /* Lighter pink */
}

/* CAFETERA style - odd rows darker, even rows lighter */
.table-cafetera tr:nth-child(odd) th,
.table-cafetera tr:nth-child(odd) td {
  background-color: #E4CDA2; /* Darker brown */
}
.table-cafetera tr:nth-child(even) th,
.table-cafetera tr:nth-child(even) td {
  background-color: #D2B48C; /* Lighter brown */
}

/* BEBIDAS FRIAS style - odd rows darker, even rows lighter */
.table-bebidas-frias tr:nth-child(odd) th,
.table-bebidas-frias tr:nth-child(odd) td {
  background-color: #ADD8E6; /* Darker blue */
}
.table-bebidas-frias tr:nth-child(even) th,
.table-bebidas-frias tr:nth-child(even) td {
  background-color: #BFEFFF; /* Lighter blue */
}

/* COMIDA SALUDABLE style - odd rows darker, even rows lighter */
.table-comida-saludable tr:nth-child(odd) th,
.table-comida-saludable tr:nth-child(odd) td {
  background-color: #90EE90; /* Darker green */
}
.table-comida-saludable tr:nth-child(even) th,
.table-comida-saludable tr:nth-child(even) td {
  background-color: #98FB98; /* Lighter green */
}
</style>

  