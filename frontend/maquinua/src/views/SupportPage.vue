<template>
  <div>
    <h1>Support Page</h1>
    <select v-model="selectedMachineType">
      <option value="">All Types</option>
      <option value="MIXTA">MIXTA</option>
      <option value="CAFETERA">CAFETERA</option>
      <option value="BEBIDAS FRIAS">BEBIDAS FRIAS</option>
      <option value="COMIDA SALUDABLE">COMIDA SALUDABLE</option>
    </select>
    <select v-model="selectedBuilding">
      <option value="">All Buildings</option>
      <option v-for="building in buildingOptions" :key="building" :value="building">{{ building }}</option>
    </select>
    <input type="text" v-model="productFilter" placeholder="Producto concreto">
    <!-- Input for Precio mínimo -->
    <input type="number" v-model.number="minPrice" placeholder="Precio mínimo" step="0.10">
    <router-link to="/">Go to Home</router-link>
    <div v-for="(building, index) in filteredBuildings" :key="index">
      <details>
        <summary>{{ building.name }}</summary>
        <div v-for="machine in filteredMachines(building)" :key="machine.id">
          <details>
            <summary>{{ machine.popupContent.title }}</summary>
            <div class="table-container">
              <table :class="getTableClass(machine.type)">
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
                  <tr v-for="(product, index) in machine.lista_productos" :key="index">
                    <td>{{ product }}</td>
                    <td>{{ machine.lista_precios[index] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </details>
        </div>
      </details>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      machines: [],
      buildings: [],
      selectedMachineType: '',
      selectedBuilding: '',
      productFilter: '',
      minPrice: null, // Holds the minimum price entered by the user
    };
  },
  computed: {
    buildingOptions() {
      const buildingSet = new Set(this.machines.map(machine => machine.edificio));
      return Array.from(buildingSet);
    },
    filteredBuildings() {
      // Enhanced to ensure buildings are filtered based on the building, machine type, product, and price filters.
      return this.buildings.filter(building => {
        return building.machines.some(machine => this.matchesFilters(machine, building));
      });
    },
  },
  methods: {
    fetchMachines() {
      // Fetch machines and group them by building
      fetch('/maquinas.json')
        .then(response => response.json())
        .then(data => {
          this.machines = data;
          this.groupMachinesByBuilding();
        })
        .catch(error => console.error('Error:', error));
    },
    groupMachinesByBuilding() {
      // Group machines by building for easier filtering
      const buildingMap = {};
      this.machines.forEach(machine => {
        if (!buildingMap[machine.edificio]) {
          buildingMap[machine.edificio] = { name: machine.edificio, machines: [] };
        }
        buildingMap[machine.edificio].machines.push(machine);
      });
      this.buildings = Object.values(buildingMap);
    },
    matchesFilters(machine, building) {
      // Checks if machine matches all active filters
      const matchesType = !this.selectedMachineType || machine.type === this.selectedMachineType;
      const matchesBuilding = !this.selectedBuilding || building.name === this.selectedBuilding;
      const matchesProduct = !this.productFilter || machine.lista_productos.some(product =>
        product.toLowerCase().includes(this.productFilter.toLowerCase()));
      const matchesPrice = this.minPrice === null || machine.lista_precios.some(price => price >= this.minPrice);

      return matchesType && matchesBuilding && matchesProduct && matchesPrice;
    },
    filteredMachines(building) {
      // Return machines that match all filters within a building
      return building.machines.filter(machine => this.matchesFilters(machine, building));
    },
    getTableClass(type) {
      // Returns CSS class based on the machine type
      const typeToClassMap = {
        'MIXTA': 'mixta', 'CAFETERA': 'cafetera', 'BEBIDAS FRIAS': 'bebidas-frias', 'COMIDA SALUDABLE': 'comida-saludable'
      };
      return `table-${typeToClassMap[type] || type.toLowerCase()}`;
    },
  },
  created() {
    this.fetchMachines();
  }
};
</script>

  
  <style scoped>

    div.table-container {
  margin-top: 1em; /* Adds space between vending machine details */
}

details > summary {
  cursor: pointer;
  padding: 0.5em;
  margin-top: 0.5em;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2em;
}

/*
.myGood {
  padding: 0.5em;
  border: 1px solid #ddd;
  text-align: left;
}
*/

th, td {
  padding: 0.5em;
  border: 1px solid #ddd;
  text-align: center;
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


  