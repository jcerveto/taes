<template>
    <div class="incident-app">
      <div class="incident-form">
        <div v-if="building">
          <p>Building: {{ building }}</p>
          <p>Machine: {{ machine }}</p>
          <p>ID: {{ id }}</p>
        </div>
        <div v-else>
          AÑADIR UN FORMULARIO Q PERMITA SELECCIONAR ENTRE LOS EDIFICIOS, LAS MÁQUINAS Y LOS ID DE LAS MÁQUINAS
        </div>
        <textarea v-model="incidentDetails" placeholder="Enter incident details..."></textarea>
        <button @click="addIncident">Add Incident</button>
      </div>
      <div class="incident-list">
        <ul>
          Mostrando las incidencias de: {{ user }}
          <li v-for="incident in paginatedIncidents" :key="incident.id">
            Building: {{ incident.machineBuilding }}<br>
            Machine: {{  incident.machineName }}<br>
            ID: {{ incident.machineId }}<br>
            Text: {{ incident.text }}
          </li>
        </ul>
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
        user: ''
      };
    },
    computed: {
      totalPages() {
        return Math.ceil(this.incidents.length / this.pageSize);
      },
      paginatedIncidents() {
        const start = this.currentPage * this.pageSize;
        const end = start + this.pageSize;
        return this.incidents.slice(start, end);
      }
    },
    methods: {
      async addIncident() {
        if (this.incidentDetails.trim()) {
          try {
            const response = await axios.post('http://localhost:3000/incidents', {
              email: this.user,
              machineId: this.id,
              machineName: this.machine,
              machineBuilding: this.building,
              text: this.incidentDetails
            });
            if (response.data) {
              this.incidents.unshift(response.data);
              //this.incidentDetails = '';
            } else {
              throw new Error('No data received from the server');
            }
          } catch (error) {
            console.error('Failed to add incident: ', error);
            const errorMessage = error.response && error.response.data && error.response.data.error ? error.response.data.error : error.message;
            alert('Failed to add incident : ' + errorMessage + " email: " + this.email + "text: " + this.incidentDetails);
          }
        } else {
          alert('Please enter incident details.');
        }
      },
      async fetchIncidents() {
        try {
          const response = await axios.get('http://localhost:3000/incidents');
          this.incidents = response.data;
        } catch (error) {
          console.error('Error fetching incidents:', error);
          alert('Error fetching incidents: ' + (error.response.data.error || error.message));
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
      }
    },
    created() {
      // Parámetros de la URL
      this.building = this.$route.query.building || '';
      this.machine = this.$route.query.machine || '';
      this.id = this.$route.query.id || '';

      this.user = localStorage.getItem('email');

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
  }
  
  .incident-form textarea {
    width: 100%;
    height: 100px;
    margin-bottom: 10px;
  }
  
  .incident-form button {
    width: 100%;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .incident-list {
    width: 50%;
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
  </style>
  