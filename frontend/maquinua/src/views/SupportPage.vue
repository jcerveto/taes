<template>
  <div>
    <h1>Support Page</h1>
    <!-- Dropdown filter for machine type -->
    <select v-model="selectedMachineType">
      <option value="">All Types</option>
      <option value="MIXTA">MIXTA</option>
      <option value="CAFETERA">CAFETERA</option>
      <option value="BEBIDAS FRIAS">BEBIDAS FRIAS</option>
      <option value="COMIDA SALUDABLE">COMIDA SALUDABLE</option>
    </select>
    <!-- Dropdown filter for building -->
    <select v-model="selectedBuilding">
      <option value="">All Buildings</option>
      <option v-for="building in buildingOptions" :key="building" :value="building">{{ building }}</option>
    </select>
    <router-link to="/">Go to Home</router-link>

    <!-- Creating a details element for each filtered building -->
    <div v-for="(building, index) in filteredBuildings" :key="index">
      <details>
        <summary>{{ building.name }}</summary>
        <div v-for="machine in building.machines" :key="machine.id">
          <details v-if="matchesFilters(machine)">
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
                  <!-- Looping through each product and price pair -->
                  <tr v-for="(product, index) in machine.lista_productos" :key="product">
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
      selectedMachineType: '', // Holds the selected machine type
      selectedBuilding: '', // Holds the selected building
    };
  },
  computed: {
    buildingOptions() {
      // Compute unique building names for the dropdown
      const buildingSet = new Set(this.machines.map(machine => machine.edificio));
      return Array.from(buildingSet);
    },
    filteredBuildings() {
      // Filter buildings to match both selected machine type and selected building
      return this.buildings.filter(building => 
        (!this.selectedMachineType || building.machines.some(machine => machine.type === this.selectedMachineType)) &&
        (!this.selectedBuilding || building.name === this.selectedBuilding)
      );
    },
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
          this.groupMachinesByBuilding();
        })
        .catch(error => console.error('Error:', error));
    },
    groupMachinesByBuilding() {
      const buildingMap = {};
      this.machines.forEach(machine => {
        if (!buildingMap[machine.edificio]) {
          buildingMap[machine.edificio] = {
            name: machine.edificio,
            machines: []
          };
        }
        buildingMap[machine.edificio].machines.push(machine);
      });
      this.buildings = Object.values(buildingMap);
    },
    matchesFilters(machine) {
      return (!this.selectedMachineType || machine.type === this.selectedMachineType) &&
             (!this.selectedBuilding || machine.edificio === this.selectedBuilding);
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


  