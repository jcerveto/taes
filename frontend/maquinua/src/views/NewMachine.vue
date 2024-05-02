<template>
  <div class="container mt-5">
    <h1 class="mb-4">New Machine Creation</h1>
    <form @submit.prevent="submitForm" class="needs-validation" novalidate>
      <div class="mb-3" :class="{'has-error': formErrors.edificio}">
        <label for="edificio" class="form-label">Building:</label>
        <input type="text" class="form-control" id="edificio" v-model="machine.edificio" required>
        <div v-if="formErrors.edificio" class="invalid-feedback">Building is required.</div>
      </div>
      <div class="mb-3" :class="{'has-error': formErrors.title}">
        <label for="title" class="form-label">Title:</label>
        <input type="text" class="form-control" id="title" v-model="machine.popupContent.title" required>
        <div v-if="formErrors.title" class="invalid-feedback">Title is required.</div>
      </div>
      <div class="mb-3" :class="{'has-error': formErrors.description}">
        <label for="description" class="form-label">Description:</label>
        <input type="text" class="form-control" id="description" v-model="machine.popupContent.description" required>
        <div v-if="formErrors.description" class="invalid-feedback">Description is required.</div>
      </div>
      <div class="mb-3" :class="{'has-error': formErrors.lat}">
        <label for="lat" class="form-label">Latitude:</label>
        <input type="number" class="form-control" id="lat" step="0.000001" v-model.number="machine.lat" required>
        <div v-if="formErrors.lat" class="invalid-feedback">Latitude must be between -90 and 90.</div>
      </div>
      <div class="mb-3" :class="{'has-error': formErrors.lon}">
        <label for="lon" class="form-label">Longitude:</label>
        <input type="number" class="form-control" id="lon" step="0.000001" v-model.number="machine.lon" required>
        <div v-if="formErrors.lon" class="invalid-feedback">Longitude must be between -180 and 180.</div>
      </div>
      <button type="submit" class="btn btn-primary">Add Machine</button>
    </form>
    <router-link to="/support" class="btn btn-link align-right-home">Back to Support</router-link>
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
      },
      formErrors: {
        edificio: false,
        title: false,
        description: false,
        lat: false,
        lon: false
      }
    };
  },
  methods: {
    validateInput() {
      if (!this.machine.edificio) {
        alert('Please fill out this field: Building');
        return false;
      }
      if (!this.machine.popupContent.title) {
        alert('Please fill out this field: Title');
        return false;
      }
      if (!this.machine.popupContent.description) {
        alert('Please fill out this field: Description');
        return false;
      }
      if (this.machine.lat === null || isNaN(this.machine.lat) || this.machine.lat < -90 || this.machine.lat > 90) {
        alert('Latitude must be a valid number between -90 and 90.');
        return false;
      }
      if (this.machine.lon === null || isNaN(this.machine.lon) || this.machine.lon < -180 || this.machine.lon > 180) {
        alert('Longitude must be a valid number between -180 and 180.');
        return false;
      }
      return true; // All validations passed
    },
    async submitForm() {
      if (this.validateInput()) {
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
  }
};
</script>

<style scoped>
.align-right-home {
  float: right;
}

.container {
  max-width: 400px; /* Adjust the width as necessary */
  margin: auto; /* Centers the container */
}

input {
  transition: border-color 0.3s, box-shadow 0.3s;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  padding: 0.375rem 0.75rem;
}

input:hover {
  border-color: #80bdff;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.5);
}

input:focus {
  outline: none;
  border-color: #0056b3;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

button {
  background-color: #007bff;
  border-color: #007bff;
  color: white;
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  transition: background-color 0.3s, border-color 0.3s;
}

button:hover {
  background-color: #0056b3;
  border-color: #004085;
  transform: scale(1.1);
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.5);
}

form {
  margin-top: 20px;
  background: #f8f9fa;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

</style>
