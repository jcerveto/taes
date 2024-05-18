<template>
  <div class="container mt-5">
      <h1 class="mb-4">{{  $t("nueva_maquina") }}</h1>
    <form @submit="submitForm" class="needs-validation" novalidate>
      <div class="mb-3">
          <label for="edificio" class="form-label">{{  $t("edificio") }}:</label>
        <input type="text" class="form-control" id="edificio" v-model="machine.edificio" required>
      </div>
      <div class="mb-3">
          <label for="title" class="form-label">{{  $t("titulo") }}:</label>
        <input type="text" class="form-control" id="title" v-model="machine.popupContent.title" required>
      </div>
      <div class="mb-3">
          <label for="description" class="form-label">{{  $t("descripcion") }}:</label>
        <input type="text" class="form-control" id="description" v-model="machine.popupContent.description" required>
      </div>
      <div class="mb-3">
          <label for="lat" class="form-label">{{  $t("latitud") }}:</label>
        <input type="number" class="form-control" id="lat" step="0.000001" v-model.number="machine.lat" required>
      </div>
      <div class="mb-3">
          <label for="lon" class="form-label">{{  $t("longitud") }}:</label>
        <input type="number" class="form-control" id="lon" step="0.000001" v-model.number="machine.lon" required>
      </div>
      <button type="submit" class="btn btn-primary">{{  $t("add_maquina") }}</button>
    </form>
    <router-link to="/support" class="btn btn-link align-right-home">{{  $t("volver_soporte") }}</router-link>
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
    submitForm(event) {
      event.preventDefault(); // Always prevent the default to manage submissions manually.
      this.clearCustomValidity(); // Clear previous custom validations.

      if (!event.target.checkValidity() || !this.validateLatLon()) {
        event.target.reportValidity();
        event.target.classList.add('was-validated'); // This will trigger the HTML5 validation
        return;
      }

      this.postData();
    },
    validateLatLon() {
      let valid = true;
      const latInput = document.getElementById('lat');
      const lonInput = document.getElementById('lon');

      if (this.machine.lat < -90 || this.machine.lat > 90) {
        latInput.setCustomValidity('Latitude must be between -90 and 90.');
        valid = false;
      } else {
        latInput.setCustomValidity('');
      }

      if (this.machine.lon < -180 || this.machine.lon > 180) {
        lonInput.setCustomValidity('Longitude must be between -180 and 180.');
        valid = false;
      } else {
        lonInput.setCustomValidity('');
      }
      latInput.reportValidity();
      lonInput.reportValidity();
      return valid;
    },
    clearCustomValidity() {
      document.getElementById('lat').setCustomValidity('');
      document.getElementById('lon').setCustomValidity('');
    },
    async postData() {
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
  boxShadow: 0 4px 8px rgba(0,0,0,0.1);
}
</style>

