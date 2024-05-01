<template>
  <div>
    <h1>New Machine Creation</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="edificio">Building:</label>
        <input id="edificio" v-model="machine.edificio" required>
      </div>
      <div>
        <label for="title">Title:</label>
        <input id="title" v-model="machine.popupContent.title" required>
      </div>
      <div>
        <label for="description">Description:</label>
        <input id="description" v-model="machine.popupContent.description" required>
      </div>
      <div>
        <label for="lat">Latitude:</label>
        <input id="lat" type="number" step="0.000001" v-model.number="machine.lat" required>
      </div>
      <div>
        <label for="lon">Longitude:</label>
        <input id="lon" type="number" step="0.000001" v-model.number="machine.lon" required>
      </div>
      <button type="submit">Add Machine</button>
    </form>
    <router-link to="/support" class="align-right-home">Back to Support</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      machine: {
        edificio: '',
        popupContent: {
          title: '',
          description: ''
        },
        lat: null,
        lon: null,
        type: '',
        lista_productos: [],
        lista_precios: []
      }
    };
  },
  methods: {
    async submitForm() {
      if (!this.machine.lat || !this.machine.lon || isNaN(this.machine.lat) || isNaN(this.machine.lon)) {
        alert('Latitude and Longitude must be valid decimal numbers.');
        return;
      }
      try {
        const response = await fetch('http://localhost:3000/api/NewMachine', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.machine)
        });
        if (!response.ok) throw new Error('Failed to add machine');
        alert('Machine added successfully!');
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    }
  }
};
</script>

<style scoped>
.align-right-home {
  float: right;
}
</style>
