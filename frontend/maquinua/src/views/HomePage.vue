<template>
  <div>
    <h1>Machines Listing Page</h1>
    <router-link to="/" class="align-right-home">Go to Home</router-link>

    <!-- Filter container for the building selection -->
    <div class="filter-container">
      <select v-model="selectedBuilding" @change="buildingSelected" class="filter-dropdown">
        <option value="">None</option>
        <option v-for="building in buildingOptions" :key="building" :value="building">{{ building }}</option>
      </select>
      
      <!-- Machine title filter; appears when a building is selected -->
      <select v-if="selectedBuilding" v-model="selectedMachineTitle" @change="machineSelected" class="filter-dropdown">
        <option value="">None</option>
        <option v-for="machine in machinesInSelectedBuilding" :key="machine.id">
          {{ machine.popupContent.title }}
        </option>
      </select>

      <!-- Remaining filters; appear when a machine title is selected -->
      <div v-if="selectedMachine">
        <select v-model="selectedMachineType" class="filter-dropdown">
          <option value="">Todos los tipos</option>
          <option value="MIXTA">MIXTA</option>
          <option value="CAFETERA">CAFETERA</option>
          <option value="BEBIDAS FRIAS">BEBIDAS FRIAS</option>
          <option value="COMIDA SALUDABLE">COMIDA SALUDABLE</option>
        </select>
      </div>
    </div>
    

    <br>
    <!-- Details of the selected machine; appears when a machine title is selected -->
    <div v-if="selectedMachineDetails" class="machine-details">
      <h2>{{ selectedMachineDetails.popupContent.title }}</h2>
      <p>{{ selectedMachineDetails.popupContent.description }}</p>
      <!-- Table containing the products and prices of the selected machine -->
      <table :class="getTableClass(selectedMachineDetails.type)">
        <thead>
          <tr>
            <th class="productos-header">Producto</th>
            <th class="productos-header">Precio (€)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in selectedMachineDetails.lista_productos" :key="index">
            <td contenteditable="false" @blur="updateProductName(index, $event.target.innerText)">{{ product }}</td>
            <td contenteditable="false" @blur="updateProductPrice(index, $event.target.innerText)">{{ selectedMachineDetails.lista_precios[index].toFixed(2) }}</td>
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
      machines: [],
      buildings: [],
      selectedMachineType: '',
      selectedBuilding: '',
      productFilter: '',
      minPrice: null,
      maxPrice: null,
      selectedMachine: '', // Holds the title of the selected machine
      selectedMachineDetails: null, // Holds the full details of the selected machine
      selectedMachineTitle: '',
      newProductName: '',
      newProductPrice: '',
    };
  },
  computed: {
    buildingOptions() {
      return Array.from(new Set(this.machines.map(machine => machine.edificio)));
    },

    machinesInSelectedBuilding() {
      if (!this.selectedBuilding) {
        return [];
      }
      return this.machines.filter(machine => machine.edificio === this.selectedBuilding);
    },

    filteredBuildings() {
  
      if (this.selectedBuilding) {
        
        return this.buildings.filter(building => 
          building.name === this.selectedBuilding && this.filteredMachines(building).length > 0
        );
      } else {

        return this.buildings.filter(building => this.filteredMachines(building).length > 0);
      }
    },
  },
  methods: {
    fetchMachines() {
      // Fetch the machines from the JSON file
      fetch('/taes/maquinas.json')
        .then(response => response.json())
        .then(data => {
          this.machines = data;
          // After fetching, you might want to populate the buildings array or other initial setups
          this.buildings = this.buildingOptions; // This line is an example and may vary based on your logic
        })
        .catch(error => console.error('Error:', error));
    },
    groupMachinesByBuilding() {
      const buildingMap = {};
      this.machines.forEach(machine => {
        if (!buildingMap[machine.edificio]) {
          buildingMap[machine.edificio] = { name: machine.edificio, machines: [] };
        }
        buildingMap[machine.edificio].machines.push(machine);
      });
      this.buildings = Object.values(buildingMap);
    },
    machineSelected() {
    this.selectedMachineDetails = this.machines.find(machine => 
      machine.popupContent.title === this.selectedMachineTitle);
    },
    filteredMachines(building) {
      return building.machines.filter(machine => {
        const matchesType = !this.selectedMachineType || machine.type === this.selectedMachineType;
        const matchesProduct = !this.productFilter || machine.lista_productos.some(product =>
          product.toLowerCase().startsWith(this.productFilter.toLowerCase())); 
        const matchesMinPrice = !this.minPrice || machine.lista_precios.some(price => price >= this.minPrice);
        const matchesMaxPrice = !this.maxPrice || machine.lista_precios.some(price => price <= this.maxPrice);

        return matchesType && matchesProduct && matchesMinPrice && matchesMaxPrice;
      });
    },
    getTableClass(type) {
      const typeToClassMap = {
        'MIXTA': 'mixta',
        'CAFETERA': 'cafetera',
        'BEBIDAS FRIAS': 'bebidas-frias',
        'COMIDA SALUDABLE': 'comida-saludable'
      };
      return `table-${typeToClassMap[type] || type.toLowerCase()}`;
    },


    updateProductName(productIndex, newName) {
      // Update the product name locally
      this.selectedMachineDetails.lista_productos[productIndex] = newName;
      this.saveChanges();
    },

    updateProductPrice(productIndex, newPriceText) {
      const newPrice = parseFloat(newPriceText);
      if (!isNaN(newPrice)) {
        // Update the product price locally
        this.selectedMachineDetails.lista_precios[productIndex] = newPrice;
        this.saveChanges();
      }
    },

    saveChanges() {
      console.log('1');
  fetch('http://localhost:3000/api/update-machine', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(this.selectedMachineDetails),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Update successful:', data);
  })
  .catch(error => {
    console.error('Error updating machine:', error);
  });
},



  validatePrice(event) {
    const input = event.target.innerText;
    const validFormat = /^\d+(\.\d{0,2})?$/;
    if (!validFormat.test(input)) {
      event.target.innerText = input.slice(0, -1);
    }
   },

   addProduct() {
      if (!this.newProductName || !this.newProductPrice || this.newProductPrice <= 0) {
        alert('Please enter a valid product name and price greater than 0.');
        return;
      }
      this.selectedMachineDetails.lista_productos.push(this.newProductName);
      this.selectedMachineDetails.lista_precios.push(parseFloat(this.newProductPrice));
      this.saveChanges();  // Reuse saveChanges to push the update to the backend
      this.newProductName = '';
      this.newProductPrice = '';
    },

  },
  created() {
    this.fetchMachines();
  }

  

};
</script>

  
  <style scoped>

    div.table-container {
  margin-top: 1em; 
  margin-left: auto;
  margin-right: auto;
}

details > summary {
  cursor: pointer;
  padding: 0.5em;
  margin-top: 0.5em;
}

table {
  margin-left: auto;
  margin-right: auto;
  border-collapse: collapse;
  margin-bottom: 2em;
}



th, td {
  padding: 0.5em;
  border: 1px solid #ddd;
  text-align: center;
}


.table-mixta tr:nth-child(odd) {
  background-color: #CCCCCC;
}
.table-mixta tr:nth-child(even), .table-mixta .productos-header {
  background-color: #E6E6E6
}


.table-cafetera tr:nth-child(odd) {
  background-color: #CCCCCC;
}
.table-cafetera tr:nth-child(even), .table-cafetera .productos-header {
  background-color: #E6E6E6 
}


.table-bebidas-frias tr:nth-child(odd) {
  background-color: #CCCCCC; 
}
.table-bebidas-frias tr:nth-child(even), .table-bebidas-frias .productos-header {
  background-color: #E6E6E6
}


.table-comida-saludable tr:nth-child(odd) {
  background-color: #CCCCCC; 
}
.table-comida-saludable tr:nth-child(even), .table-comida-saludable .productos-header {
  background-color: #E6E6E6 
}


.productos-header th {
  text-align: center;
  font-weight: bold;
}


.filter-container {
  display: flex;
  gap: 15px;
  margin-bottom: 24px;
  justify-content: center;
  padding: 15px;
  border-radius: 12px;
  background: linear-gradient(145deg, #f8f8f8, #d6d6d6);
  box-shadow: 5px 5px 10px #bebebe,
              -5px -5px 10px #ffffff;
  transition: all 0.2s ease-in-out;
}

.filter-container:hover {
  background: linear-gradient(145deg, #e6e6e6, #c8c8c8);
  box-shadow: 5px 5px 15px #adadad,
              -5px -5px 15px #ffffff;
}

.filter-container select {
  padding: 8px 16px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  background-color: white;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  font-size: 1em;
  color: #444;
  outline: none;
  transition: border-color 0.3s ease;
}


.filter-container input {
  padding: 8px;
  border: 1px solid #cccccc;
  border-radius: 4px; 
  outline: none; 
}

.filter-container select:focus,
.filter-container select:hover {
  border-color: #888888;
}

.filter-container option {
  padding: 8px;
}


.filter-dropdown {
  padding: 10px 20px;
  border: 1px solid transparent;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: inset 2px 2px 5px #e6e6e6,
              inset -2px -2px 5px #ffffff;
  cursor: pointer;
  font-size: 1em;
  color: #444;
  outline: none;
  transition: border 0.3s, box-shadow 0.3s;
}

.filter-dropdown::-ms-expand {
  display: none; /* Hide the default dropdown arrow in IE */
}

.filter-dropdown option {
  padding: 8px;
  background-color: #ffffff; /* Default background */
  color: #333; /* Default text color */
}

.filter-dropdown option:hover {
  background-color: #f0f0f0;
}

.filter-dropdown:focus {
  box-shadow: inset 1px 1px 2px #bfbfbf, 
              inset -1px -1px 2px #ffffff;
}

.filter-container input:focus {
  border-color: #666666; 
}

.filter-dropdown:hover {
  border-color: #b3b3b3;
}


.allign-right-home {
  position: absolute;
  right: 0;
  top: 7.5%;
}

.input-container {
  position: relative;
  margin-bottom: 20px; 
}

.input-container input {
  width: 100%; 
  height: 157%;
}

.input-container label {
  position: absolute;
  top: -25px; 
  left: 0;
  transform: translateX(35%);
  font-size: 1.0em; 
  font-weight: bold;
}



</style>

