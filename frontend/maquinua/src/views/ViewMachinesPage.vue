<template>
    <div>
      <h1>View Machines</h1>
  
  
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
  
       
      </div>
  
      <!-- Details of the selected machine; appears when a machine title is selected -->
      <div v-if="selectedMachineDetails" class="machine-details">
        <h2>{{ selectedMachineDetails.popupContent.title }}</h2>
        <p>{{ selectedMachineDetails.popupContent.description }}</p>
        <!-- Table containing the products and prices of the selected machine -->
        <table :class="getTableClass(selectedMachineDetails.type)">
          <thead>
            <tr>
              <th class="productos-header" style="text-align: center;">ID</th>
              <th class="productos-header" style="text-align: center;">Producto</th>
              <th class="productos-header" style="text-align: center;">Precio (€)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in selectedMachineDetails.lista_productos" :key="index">
              <td style="text-align: center;">{{ computeProductId(index) }}</td>
              <td  @blur="updateProductName(index, $event.target.innerText)" class="editable-cell">
                <span v-if="isEditing" class="circle-editable">{{ product }}</span>
                <template v-else>{{ product }}</template>
              </td>
  
              <td @blur="updateProductPrice(index, $event.target.innerText)" class="editable-cell">
                <span v-if="isEditing" class="circle-editable">{{ selectedMachineDetails.lista_precios[index].toFixed(2) }}</span>
                <template v-else>{{ selectedMachineDetails.lista_precios[index].toFixed(2) }}</template>
              </td>
              
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
        lastProductId: 0,
        productIdToDelete: null,
        urlIsValid: false,
        isEditing: false, // To track the edit state
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
      showCreateTableButton() {
        // Only show the button if on the specific base URL without extra query parameters
        return this.$route.path === '/taes//viewMachines' && Object.keys(this.$route.query).length === 0;
      }
    },
    methods: {
      fetchMachines() {
      // Always return a promise from this method
      return fetch('/taes/maquinas.json')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          this.machines = data;
          this.buildings = this.buildingOptions;
          this.machines.sort((a, b) => a.id - b.id);
  
  
          const queryParams = new URLSearchParams(window.location.search);
          const machineId = parseInt(queryParams.get('id'), 10);
  
          // Check if the machine ID exists and calculate lastProductId accordingly
          const index = this.machines.findIndex(machine => machine.id === machineId);
          if (index !== -1) {
            // Machine exists, calculate lastProductId up to the index of the specified machine (exclusive)
            this.lastProductId = this.machines.slice(0, index).reduce((acc, machine) => acc + machine.lista_productos.length, 0);
          } else {
            // Machine does not exist or no ID was provided, calculate for all machines
            this.lastProductId = this.machines.reduce((acc, machine) => acc + machine.lista_productos.length, 0);
          }
          
          console.log('Machines loaded, last product ID:', this.lastProductId);
  
        })
        .catch(error => {
          console.error('Error fetching machines:', error);
          // Handle errors or set some defaults if necessary
        });
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
        const currentIndex = this.machines.indexOf(this.selectedMachineDetails);
        if (currentIndex > 0) {
          // Update the lastProductId to the ID of the last product of the previous machine
          this.lastProductId = this.machines.slice(0, currentIndex).reduce((acc, machine) => acc + machine.lista_productos.length, 0);
        } else {
          this.lastProductId = 0; // If it's the first machine, reset the counter
        }
        this.updateUrl();
      },
  
      updateUrl() {
        let url = '/viewMachines';
        const queryParams = [];
        if (this.selectedBuilding) {
          queryParams.push(`building=${encodeURIComponent(this.selectedBuilding)}`);
        }
        if (this.selectedMachineDetails) {
          const machineLeftPartTitle = encodeURIComponent(this.selectedMachineDetails.popupContent.title.split(' - ')[0]);
          queryParams.push(`machine=${machineLeftPartTitle}`);
          queryParams.push(`id=${this.selectedMachineDetails.id}`);
        }
        this.$router.push(`${url}${queryParams.length ? '?' + queryParams.join('&') : ''}`);
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
      computeProductId(index) {
        // Compute product ID for the current index, incrementing from the last saved global product ID
        return this.lastProductId + index + 1;
      },
  
      confirmDeleteProduct() {
        const productId = this.productIdToDelete;
        const startId = this.lastProductId + 1; // ID of the first product in the current machine list
        const endId = this.lastProductId + this.selectedMachineDetails.lista_productos.length; // ID of the last product in the current machine list
  
        if (productId == null || productId < startId || productId > endId) {
          alert(`Invalid Product ID. Please enter an ID between ${startId} and ${endId}.`);
          return;
        }
  
        const productIndex = productId - this.lastProductId - 1; // Calculate the array index of the product
        const productToDelete = this.selectedMachineDetails.lista_productos[productIndex];
  
        if (confirm(`Are you sure you want to delete the product with ID: ${productId} (${productToDelete}) of the machine: ${this.selectedMachineDetails.popupContent.title}?`)) {
          this.deleteProduct(productIndex);
        }
      },
  
      deleteProduct(index) {
        // Directly use the index calculated in confirmDeleteProduct
        if (index < 0 || index >= this.selectedMachineDetails.lista_productos.length) {
          alert('Invalid Product ID');
          return;
        }
        this.selectedMachineDetails.lista_productos.splice(index, 1);
        this.selectedMachineDetails.lista_precios.splice(index, 1);
        this.saveChanges();
        this.productIdToDelete = null; // Reset the input field after deletion
    },
  
  
    buildingSelected() {
      // This method will run when a building is selected
      // Make sure to update related properties and/or perform actions like fetching machines in the selected building
      this.selectedMachine = ''; // Reset selected machine when building changes
      this.selectedMachineDetails = null; // Reset machine details
      this.updateUrl(); // Update the URL based on the new state
    },
  
  
    parseUrlParams() {
        const query = new URLSearchParams(window.location.search);
        const building = query.get('building');
        const machineTitle = query.get('machine'); // May not use directly, but good for UI consistency
        const machineId = parseInt(query.get('id'), 10);
  
        if (building) {
          this.selectedBuilding = building;
          this.buildingSelected();
        }
        if (machineId && !isNaN(machineId)) {
          this.loadMachineDetailsById(machineId);
        } else if (machineTitle) {
          this.selectedMachineTitle = decodeURIComponent(machineTitle);
          this.machineSelected();
        }
      },
  
      loadMachineDetailsById(id) {
        const machine = this.machines.find(m => m.id === id);
        if (machine) {
            this.selectedMachineDetails = machine;
            this.selectedMachine = machine.popupContent.title.split(' - ')[0]; // For UI consistency
            this.updateUrl(); // Update URL to ensure it's consistent with current state
  
            // Assuming each machine's products have predefined IDs stored in an array, perhaps `productIDs`
            // This requires modifying your JSON structure or computing it on load
            this.productIDs = machine.productIDs || machine.lista_productos.map((item, index) => index + 1); // Fallback to index-based IDs if no specific IDs provided
        }
      },
  
      confirmDeleteMachine() {
        if (confirm(`Are you sure that you want to delete the machine: ${this.selectedMachineDetails.popupContent.title} with id: ${this.selectedMachineDetails.id}?`)) {
          this.deleteMachine();
        }
      },
  
      deleteMachine() {
        fetch(`http://localhost:3000/api/delete-machine/${this.selectedMachineDetails.id}`, {
          method: 'DELETE'
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(() => {
          alert('Machine deleted successfully');
          this.$router.push('/taes//viewMachines');
        })
        .catch(error => {
          console.error('Error deleting machine:', error);
        });
      },
  
      redirectToCreateNewMachine() {
        this.$router.push('/NewMachine');
      },
  
      toggleEdit() {
        this.isEditing = !this.isEditing; // Toggle the editing state
      },
  
  
    },
    
    created() {
    this.fetchMachines()
      .then(() => {
        this.parseUrlParams(); // Ensure this is called after machines are loaded
      })
      .catch(error => {
        console.error('Error during initialization:', error);
      });
  }
  
  };
  </script>
  
    
  <style scoped>
  /* General Page Layout Enhancements */
  body {
    font-family: 'Arial', sans-serif; /* Cleaner font for better readability */
  }
  
  h1 {
    text-align: center;
    color: #333; /* Dark gray for better visibility and contrast */
    margin-bottom: 20px;
  }
  
  /* Improved styling for navigation and positioning */
  .align-right-home {
    position: fixed;
    right: 20px;
    top: 20px;
    font-size: 1rem;
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border-radius: 8px;
    text-decoration: none;
  }
  
  .align-right-home:hover {
    background-color: #0056b3;
  }
  
  /* Enhanced Filter Container Styles */
  .filter-container {
    display: flex;
    gap: 20px;
    justify-content: center;
    padding: 20px;
    border-radius: 12px;
    background: linear-gradient(145deg, #f8f8f8, #d6d6d6);
    box-shadow: 5px 5px 15px #bebebe, -5px -5px 15px #ffffff;
    transition: all 0.3s ease-in-out;
  }
  
  .filter-container:hover {
    background: linear-gradient(145deg, #e6e6e6, #c8c8c8);
  }
  
  /* Styling for dropdowns and buttons within filters for a uniform appearance */
  .filter-container select{
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    background-color: #ffffff;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transition: all 0.3s ease-in-out;
  }
  
  .filter-container select:hover, .filter-container input:hover, .filter-container button:hover {
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }
  
  .add-product-section {
    align-items: center;
    border-radius: 12px;
    background-color: #f2f2f2; /* Subtle background to distinguish section */
    margin-top: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  
  /* Targeting the product price input specifically */
  .add-product-section input[type="number"] {
    width: 10%; /* Smaller width for price input, as it typically requires less space */
    padding: 10px 15px;
    margin: 5px;
    font-size: 1rem;
    border-radius: 8px;
    border: 2px solid #ccc;
    background-color: #E0FFFF;
    transition: border-color 0.3s ease-in-out;
  }
  
  /* Styling for the 'Confirm' button */
  .add-product-section button:nth-child(3) { /* Assumes it's the third child in the section */
    width: 10%; /* Moderate width for action buttons */
    padding: 10px 15px;
    margin: 5px;
    font-size: 1rem;
    border-radius: 8px;
    border: none;
    color: black;
    background-color: #00FFFF; /* Green for confirm/add button */
    transition: background-color 0.2s ease-in-out;
    cursor: pointer;
  }
  
  /* Styling for the 'Edit Product' or 'Cancel Edit' toggle button */
  .add-product-section button:nth-child(4) { /* Assumes it's the fourth child in the section */
    width: 10%; /* Slightly larger width for clarity in function */
    padding: 10px 15px;
    margin: 5px;
    font-size: 1rem;
    border-radius: 8px;
    border: none;
    color: black;
    background-color: #00BFFF; /* Red for cancel/edit toggle button */
    transition: background-color 0.2s, transform 0.1s;
    cursor: pointer;
  }
  
  .add-product-section input[type="text"]:hover,
  .add-product-section input[type="number"]:hover {
    border-color: #007bff; /* Bootstrap primary color for focus */
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.5);
  }
  
  
  .add-product-section button:hover {
    background-color: #0056b3;
    transform: scale(1.1);
  }
  
  .add-product-container {
    background-color: #f2f2f2;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  /* Additional styles for the Delete Product Section */
  .delete-product-section {
    align-items: center;
    border-radius: 12px;
    background-color: #f2f2f2; /* Subtle background to distinguish section */
    margin-top: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .delete-product-section input[type="number"] {
    width: 10%; /* Larger input for visibility */
    padding: 10px 15px;
    font-size: 1rem;
    border: 2px solid #ccc;
    border-radius: 8px;
    transition: border-color 0.3s, box-shadow 0.3s;
    background-color: #F08080;
  }
  
  
  .delete-product-section input[type="number"]:hover,
  .delete-product-section input[type="number"]:focus {
    border-color: #FF0800; /* Highlighting the input field */
    box-shadow: 0 0 8px rgba(255, 99, 71, 0.5);
  }
  
  
  
  
  .delete-product-section button {
    width: 10%;
    padding: 10px 20px;
    font-size: 1rem;
    border-radius: 8px;
    border: none;
    color: white;
    background-color: #dc3545; /* Initial color set to a lighter red */
    transition: background-color 0.2s, transform 0.1s;
    cursor: pointer;
  }
  
  .delete-product-section button:nth-child(2) {
    background-color: #FF2400; /* Standard delete button color */
  }
  
  .delete-product-section button:nth-child(3) {
    background-color: #E60026 /* Standard delete button color */
  }
  
  
  .delete-product-section button:hover {
    background-color: #a50000; /* Dark red on hover */
    transform: scale(1.1); /* Slight scale to indicate interactive element */
  }
  
  /* Detailed Machine View and Interaction */
  .machine-details {
    margin-top: 20px;
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  table {
    margin-left: auto;
    margin-right: auto;
    border-collapse: collapse;
    margin-bottom: 2em;
    width: 40%;
  }
  
  .editable-cell {
    text-align: center;
  }
  
  th, td {
    padding: 15px;
    border: 1px solid #ccc;
    text-align: left;
  }
  
  tr:nth-child(odd) {
    background-color: #CCCCCC; /* Darker grey for odd rows */
  }
  
  tr:nth-child(even) {
    background-color: #E6E6E6; /* Lighter grey for even rows */
  }
  
  .productos-header {
    background-color: #007bff;
    color: white;
  }
  
  /* Responsive Mobile-First Adjustments */
  @media (max-width: 768px) {
    .filter-container, .add-product-section, .delete-product-section {
      flex-direction: column;
    }
  
    .filter-container select, .filter-container input, .filter-container button {
      width: 100%;
      margin-top: 10px;
    }
  
    .add-product-section {
      flex-direction: column;
    }
  
    .add-product-section input,
    .add-product-section button {
      width: 100%; /* Ensures each element stretches to full width on mobile for better usability */
      margin-top: 10px;
    }
  
    .add-product-section button {
      margin-bottom: 10px;
    }
  
    .delete-product-section {
      flex-direction: column; /* Stack elements vertically on smaller screens */
      align-items: stretch;
    }
  
    .delete-product-section input,
    .delete-product-section button {
      width: 100%; /* Full width for inputs and buttons on small screens */
      margin-top: 10px;
    }
  
  }
  
  .circle-editable{
    border: 2px solid black;
    display: inline-block;
    background: white;
    text-align: center;
    border-radius: 25px;
    padding: 5px 10px;
  }
  
  .add-machine {
    align-items: center;
    border-radius: 12px;
    margin-top: 20px;
  }
  
  .add-machine button {
    width: 10%;
    padding: 10px 20px;
    font-size: 1rem;
    border-radius: 8px;
    border: none;
    color: white;
    background-color: #007bff; /* Initial color set to a lighter red */
    border-color: #007bff;
    transition: background-color 0.3s, border-color 0.3s;
    cursor: pointer;
  }
  
  .add-machine button:hover {
    background-color: #0056b3;
    border-color: #004085;
    transform: scale(1.1);
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.5);
  }
  
  </style>
  
  
    