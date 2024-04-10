

<template>
    <div>
        <textarea v-model="incidentDetails" placeholder="Enter incident details..."></textarea>
        <button @click="addIncident">Add Incident</button>
        <button @click="getIncidents"> Mostrar Incidents </button>

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
       
        methods: {
            async addIncident() {
               
                    // Agrega el nuevo incidente a la lista de incidentes en el frontend
                    //this.incidents.push({ incidencia: this.incidentDetails });

                    // Envía los datos al backend
                    JSON.stringify(this.incidentDetails);
                    const response=await axios.post('http://localhost:3000/incidents', { incidencia: this.incidentDetails });

                    console.log(response.data);
                    // Limpia el campo de detalles del incidente después de enviar los datos
                    //this.incidentDetails = '';
                
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

