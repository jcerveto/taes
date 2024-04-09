

<template>
    <div>
        <textarea v-model="incidentDetails" placeholder="Enter incident details..."></textarea>
        <button @click="addIncident">Add Incident</button>

        <ul>
            <li>{{ this.incidents }}</li>
        </ul>

    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                incidentDetails: '',
                
            };
        },
        created() {
            this.getIncidents();
        },
        methods: {
            async addIncident() {
                try {
                    // Agrega el nuevo incidente a la lista de incidentes en el frontend
                    this.incidents.push({ incidencia: this.incidentDetails });

                    // Envía los datos al backend
                    await axios.post('http://localhost:3000/incidents', { incidencia: this.incidentDetails });

                    // Limpia el campo de detalles del incidente después de enviar los datos
                    this.incidentDetails = '';
                } catch (error) {
                    console.error('Error adding incident:', error);
                }
            },
            async getIncidents() {
               try {
                    //Obtiene los incidentes desde el backend
                   const response = await axios.get('http://localhost:3000/incidents');
                   this.incidents = response.data;
                } catch (error) {
                    console.error('Error fetching incidents:', error);
                }
            }
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
    }
</style>

