<template>
    <div>
        <div>
            <textarea v-model="incidentDetails" placeholder="Enter incident details..."></textarea>
            <button @click="addIncident">Add Incident</button>
        </div>
        <ul>
            <li v-for="incident in paginatedIncidents" :key="incident.id">
                {{ incident.text }}
            </li>
        </ul>
        <div>
            <button @click="previousPage" :disabled="currentPage <= 0">Previous</button>
            Page {{ currentPage + 1 }} of {{ totalPages }}
            <button @click="nextPage" :disabled="currentPage >= totalPages - 1">Next</button>
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
            pageSize: 10, // Number of incidents per page
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
                        email: 'test@example.com',  // Asumiendo que el email está hardcodeado por ahora
                        text: this.incidentDetails
                    });
                    if (response.data) {
                        this.incidents.unshift(response.data);  // Añade el nuevo incidente a la lista local
                        this.incidentDetails = '';  // Limpia el área de texto
                    } else {
                        throw new Error('No data received from the server');
                    }
                } catch (error) {
                    console.error('Failed to add incident:', error);
                    // Asegúrate de verificar si error.response y error.response.data existen antes de intentar acceder a error.response.data.error
                    const errorMessage = error.response && error.response.data && error.response.data.error ? error.response.data.error : error.message;
                    alert('Failed to add incident: ' + errorMessage);
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
        this.fetchIncidents();
    }
};
</script>

<style scoped>
textarea {
    width: 100%;
    height: 100px;
    margin-bottom: 10px;
}
button {
    cursor: pointer;
    margin: 5px;
}
ul {
    list-style: none;
    padding: 0;
}
li {
    margin-bottom: 5px;
    background-color: #f4f4f4;
    padding: 10px;
    border-radius: 5px;
}
</style>
