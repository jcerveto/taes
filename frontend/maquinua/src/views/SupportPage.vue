<template>
   <div>
    <h1>Support Page</h1>
    <br>
    <router-link to="/" class="allign-right-home">Go to Home</router-link>
    <br>
    <div class="filter-container">

      <select v-model="selectedMachineType" class="filter-dropdown">
        <option value="">Todos los tipos</option>
        <option value="MIXTA">MIXTA</option>
        <option value="CAFETERA">CAFETERA</option>
        <option value="BEBIDAS FRIAS">BEBIDAS FRIAS</option>
        <option value="COMIDA SALUDABLE">COMIDA SALUDABLE</option>
      </select>

      <select v-model="selectedBuilding" class="filter-dropdown">
        <option value="">Todos los edificios</option>
        <option v-for="building in buildingOptions" :key="building" :value="building">{{ building }}</option>
      </select>
      <div class="input-container">
        <input type="text" v-model="productFilter" class="filter-input">
        <label for="productFilter">Producto concreto</label>
      </div>

      <div class="input-container">
        <input type="number" v-model.number="minPrice" step="0.10" min="0" class="filter-input">
        <label for="minPrice">Precio mínimo</label>
      </div>

      <div class="input-container">
        <input type="number" v-model.number="maxPrice" step="0.10" min="0" class="filter-input">
        <label for="maxPrice">Precio máximo</label>
      </div>

    </div>
    <br>
    

    <div v-for="(building, index) in filteredBuildings" :key="index">
      <details>
        <summary>{{ building.name }}</summary>
        <div v-for="machine in filteredMachines(building)" :key="machine.id">
          <details>
            <summary>{{ machine.popupContent.title }}</summary>
            <div class="table-container">
              <table :class="getTableClass(machine.type)" style="margin-left: auto; margin-right: auto; width: 80%;" >
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
                    <th> Nombre del producto</th>
                    <th> Precio del producto (€)</th>
                  </tr>
                  <tr v-for="(product, index) in machine.lista_productos" :key="index">
                    <td contenteditable="true" @blur="updateProductName(machine.id, index, $event.target.innerText)">{{ product }}</td>
                    <td contenteditable="true" @blur="updateProductPrice(machine.id, index, $event.target.innerText)" @input="validatePrice($event)">{{ machine.lista_precios[index].toFixed(2) }}</td>
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
      minPrice: null, 
      maxPrice: null, 
    };
  },
  computed: {
    buildingOptions() {
      const buildingSet = new Set(this.machines.map(machine => machine.edificio));
      return Array.from(buildingSet);
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
          buildingMap[machine.edificio] = { name: machine.edificio, machines: [] };
        }
        buildingMap[machine.edificio].machines.push(machine);
      });
      this.buildings = Object.values(buildingMap);
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


    updateProductName(machineId, productIndex, newName) {
    console.log(`Update product name for machine ${machineId}, product index ${productIndex}, new name: ${newName}`);
    
    },
    updateProductPrice(machineId, productIndex, newPrice) {
    const price = parseFloat(newPrice).toFixed(2);
    if (!isNaN(price)) {
      console.log(`Update product price for machine ${machineId}, product index ${productIndex}, new price: ${price}`);
    }
   },
  validatePrice(event) {
    const input = event.target.innerText;
    const validFormat = /^\d+(\.\d{0,2})?$/;
    if (!validFormat.test(input)) {
      event.target.innerText = input.slice(0, -1);
    }
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
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2em;
}



th, td {
  padding: 0.5em;
  border: 1px solid #ddd;
  text-align: center;
}


.table-mixta tr:nth-child(odd) {
  background-color: #FFD6DD; 
}
.table-mixta tr:nth-child(even), .table-mixta .productos-header {
  background-color: #FFC0CB; 
}


.table-cafetera tr:nth-child(odd) {
  background-color: #D2B48C; 
}
.table-cafetera tr:nth-child(even), .table-cafetera .productos-header {
  background-color: #E4CDA2; 
}


.table-bebidas-frias tr:nth-child(odd) {
  background-color: #ADD8E6; 
}
.table-bebidas-frias tr:nth-child(even), .table-bebidas-frias .productos-header {
  background-color: #BFEFFF; 
}


.table-comida-saludable tr:nth-child(odd) {
  background-color: #90EE90; 
}
.table-comida-saludable tr:nth-child(even), .table-comida-saludable .productos-header {
  background-color: #98FB98; 
}


.productos-header th {
  text-align: center;
  font-weight: bold;
}


.filter-container {
  display: flex;
  gap: 8px; 
  margin-bottom: 16px; 
  justify-content: center;
}

.filter-container select,
.filter-container input {
  padding: 8px;
  border: 1px solid #cccccc;
  border-radius: 4px; 
  outline: none; 
}

.filter-container select:focus,
.filter-container input:focus {
  border-color: #666666; 
}

.filter-container select {
  background-size: 12px; 
  cursor: pointer;
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


  