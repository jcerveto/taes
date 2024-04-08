<template>
    <div>
      <h1>Support Page</h1>
      <router-link to="/">Go to Home</router-link>
  
      <!-- Creating a details element for each building -->
      <div v-for="(building, index) in buildings" :key="index">
        <details>
          <summary>{{ building.name }}</summary>
          <ul>
            <!-- Listing each machine in the building -->
            <li v-for="machine in building.machines" :key="machine.id">
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
                      <tr>
                        <th>Nombre del producto</th>
                        <td>{{ machine.lista_productos.join(', ') }}</td>
                      </tr>
                      <tr>
                        <th>Precio del producto</th>
                        <td>{{ machine.lista_precios.join(', ') }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </details>
            </li>
          </ul>
        </details>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        machines: [],
        buildings: []
      };
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
      getTableClass(type) {
        // ... existing method ...
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


  