<template>
  <div class="incident-app">
    <div class="incident-list">
      <h3>Incidencias que deben ser atendidas</h3>

      <div v-if="incidents.length > 0">
        <div class="incident-card" v-for="incident in paginatedIncidents" :key="incident.id">
          <div class="card-header">
            <p>Building: {{ incident.machineBuilding }}</p>
            <p>Machine: {{ incident.machineName }}</p>
            <p>ID: {{ incident.machineId }}</p>
            <button type="button" class="btn btn-warning" @click="solveIncident(incident)">Solucionar</button>
          </div>
          <div>
            
          </div>
          <div class="card-body">
            <p>{{ incident.text }}</p>
          </div>

          <div>
            <button type="button" class="btn btn-danger" @click="closeIncident(incident)">Cerrar incidencia</button>
          </div>

        </div>
      </div>
      <div v-else>
        <p>No incidents to show.</p>
      </div>
      
      <div class="pagination">
        <button @click="previousPage" :disabled="currentPage <= 0">Previous</button>
        <span>Page {{ currentPage + 1 }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage >= totalPages - 1">Next</button>
      </div>
    </div>
  </div>
</template>


<script>

import axios from 'axios';
import { useRoute } from 'vue-router';

export default {
  data() {
    return {
      incidentDetails: '',
      incidents: [],
      currentPage: 0,
      pageSize: 10,
      building: '',
      machine: '',
      id: '',
      user: '',
      machines: [],
      buildings: [],
      selectedMachineType: '',
      selectedBuilding: '',
      selectedMachine: '', // Holds the title of the selected machine
      selectedMachineDetails: null, // Holds the full details of the selected machine
      selectedMachineTitle: '',
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.incidents.length / this.pageSize);
    },
    activeIncidents() {
      return this.incidents.filter(incident => incident.status !== 'closed');
    },
    paginatedIncidents() {
      const start = this.currentPage * this.pageSize;
      return this.activeIncidents.slice(start, start + this.pageSize);
    },
    buildingOptions() {
      return [...new Set(this.machines.map(machine => machine.edificio))];
    },
    machinesInSelectedBuilding() {
      if (!this.selectedBuilding) {
        return [];
      }
      return this.machines.filter(machine => machine.edificio === this.selectedBuilding);
    },
  },
  methods: {
    async addIncident() {
      if (!this.incidentDetails.trim()) {
        alert('Please enter incident details.');
        return;
      }
      try {
        const response = await axios.post('http://localhost:3000/incidents', {
          email: this.user,
          machineId: this.id,
          machineName: this.machine,
          machineBuilding: this.building,
          text: this.incidentDetails
        });
        this.incidents.unshift(response.data);
        this.incidentDetails = ''; // Clear the textarea after submission
      } catch (error) {
        console.error('Failed to add incident:', error);
        alert('Failed to add incident: ' + (error.response && error.response.data ? error.response.data.error : error.message));
      }
    },
    refreshPage() {
      window.location.reload(); // Reloads the current page
    },
    async fetchIncidents() {
      try {
        const response = await axios.get('http://localhost:3000/incidents');
        this.incidents = response.data;
      } catch (error) {
        console.error('Error fetching incidents:', error);
        alert('Error fetching incidents: ' + (error.response && error.response.data ? error.response.data.error : error.message));
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages - 1) {
        this.currentPage++;
      }
    },
    previousPage() {
      if (this.currentPage > 0) {
        this.currentPage--;
      }
    },
    fetchMachines() {
      fetch('/taes/maquinas.json')
        .then(response => response.json())
        .then(data => {
          this.machines = data;
          this.buildings = [...new Set(data.map(machine => machine.edificio))]; // Populate buildings
        })
        .catch(error => console.error('Error fetching machines:', error));
    },
    machineSelected() {
      this.selectedMachineDetails = this.machines.find(machine =>
        machine.popupContent.title === this.selectedMachineTitle);
      if (this.selectedMachineDetails) {
        this.building = this.selectedMachineDetails.edificio;
        this.machine = this.selectedMachineDetails.popupContent.title;
        this.id = this.selectedMachineDetails.id;
      }
    },
    solveIncident(incident) {
      const url = `support?building=${incident.machineBuilding}&machine=${encodeURIComponent(incident.machineName)}&id=${incident.machineId}`;
      // Redirect to the support page with the incident details
      window.location.href = url;
    },
    async closeIncident(incident) {
      try {
        const response = await axios.put(`http://localhost:3000/incidents`, {
          id: incident.id,
          email: incident.email,
          machineId: incident.machineId,
          machineName: incident.machineName,
          machineBuilding: incident.machineBuilding,
          text: incident.text,
          status: 'closed',
        }, {
          withCredentials: true
        });
        if (response.data && response.data.status === 'closed') {
          incident.status = 'closed';  // Confirma que el backend realmente ha cerrado la incidencia
          console.log('Incident closed:', response.data);
        } else {
          throw new Error('Backend did not confirm the incident closure.');
        }
      } catch (error) {
        console.error('Error closing incident:', error);
        alert('Failed to close incident: ' + (error.response && error.response.data ? error.response.data.error : error.message));
      }
    },


  },
  created() {
    this.user = localStorage.getItem('email') || 'guest';
    const route = useRoute();
    this.building = route.query.building || '';
    this.machine = route.query.machine || '';
    this.id = route.query.id || '';
    this.fetchMachines();
    this.fetchIncidents();
  }
};
</script>
    
    
  
<style scoped>
.incident-app {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
}

.incident-form {
  width: 50%;
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  border-radius: 8px;
  background-color: #f9f9f9;
}

.incident-form p {
  font-size: 18px; /* Increased font size */
  font-weight: bold; /* Making text bold */
  color: #333; /* Dark grey color for better readability */
  margin: 5px 0; /* Slight spacing between lines */
}

.incident-form textarea {
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
}

/* General button styling */
.incident-form button {
  padding: 10px;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  margin-right: 10px; /* Adds space between buttons */
  width: calc(50% - 12px); /* Adjusts width taking into account margin-right */
}

.center-button {
    display: flex;
    justify-content: center;
}

.add-incident-btn {
  background-color: #4CAF50; /* Green */
}

.refresh-btn {
  background-color: #007BFF; /* Blue */
}

.incident-list {
  width: 50%;
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  border-radius: 8px;
  background-color: #f9f9f9;
  padding: 20px;
  margin-top: 20px;
}

.incident-list ul {
  list-style: none;
  padding: 0;
}

.incident-list li {
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  border-radius: 8px;
  background-color: #ffffff;
  position: relative; /* Needed for box-shadow */
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination button {
  padding: 5px 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.pagination button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.pagination span {
  margin: 0 10px;
  font-weight: bold;
}

.incident-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  background-color: #fff;
  padding: 10px;
}

.card-header {
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  margin-bottom: 10px;
}

.card-header p {
  margin: 5px 0;
}

.card-body {
  padding-top: 10px;
}

.green-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  padding: 8px 16px;
}

.blue-btn {
  background-color: #007BFF;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  padding: 8px 16px;
}

.card-footer {
  display: flex;
  justify-content: flex-end;
}

.status-circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 10px;
}

.open {
  background-color: red;
}

.close {
  background-color: green;
}
</style>

  
  
  
    