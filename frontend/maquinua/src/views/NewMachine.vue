<template>
  <div>
    <h1>New Machine Creation</h1>
    <router-link to="/taes/support" class="align-right-home">Back to Support</router-link>

    <form @submit.prevent="createMachine">
      <input v-model="newMachine.edificio" placeholder="Building of the machine" required>
      <input v-model="newMachine.popupContent.title" placeholder="Title of the machine" required>
      <input v-model="newMachine.popupContent.description" placeholder="Description of the machine" required>
      <input v-model.number="newMachine.lat" type="number" placeholder="Latitude" required :step="0.000001" min="-90" max="90">
      <input v-model.number="newMachine.lon" type="number" placeholder="Longitude" required :step="0.000001" min="-180" max="180">
      
      <button type="submit">OK</button>
      <button @click="cancel">Cancel</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      newMachine: {
        lat: 0,
        lon: 0,
        edificio: '',
        popupContent: {
          title: '',
          description: ''
        },
        type: '', // Initially empty, can be set later if necessary
        lista_productos: [],
        lista_precios: []
      }
    };
  },
  methods: {
    createMachine() {
      if (!this.validateInputs()) {
        alert("All fields must be filled with valid values.");
        return;
      }

      axios.post('http://localhost:8080/api/add-machine', this.newMachine)
        .then(response => {
          console.log("Response from server:", response.data);
          this.$router.push('/taes/support');
          alert("Machine successfully created!");
        })
        .catch(error => {
          console.error("Failed to create machine:", error);
          alert("Failed to create machine: " + error.message);
        });
    },
    cancel() {
      this.$router.push('/taes/support');
    },
    validateInputs() {
      // Ensure no empty fields and valid coordinates
      return this.newMachine.edificio.trim() && this.newMachine.popupContent.title.trim() &&
             this.newMachine.popupContent.description.trim() && !isNaN(this.newMachine.lat) &&
             !isNaN(this.newMachine.lon) && this.newMachine.lat >= -90 && this.newMachine.lat <= 90 &&
             this.newMachine.lon >= -180 && this.newMachine.lon <= 180;
    }
  }
}
</script>
