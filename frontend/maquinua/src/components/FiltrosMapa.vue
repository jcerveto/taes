<script>

import Multiselect from 'vue-multiselect';
import json from '/public/maquinas.json';
import { onMounted, ref } from 'vue';

export default {
  setup() {
    
    const tipo = ref('');
    const producto = ref('');
    const selectedEdificio = ref({ edificio: '' });

    // Lista con los edificios
    const edificios = ref([]);

    onMounted(() => {
      getEdificios();
      selectedEdificio.value = edificios.value[0];
    });

    const buscar = () => {
      const queryParams = {
        tipo: tipo.value,
        producto: producto.value,
        edificio: selectedEdificio.value.edificio,
      };

      const query = new URLSearchParams(queryParams).toString();
      const url = `/?${query}`;
      window.location.href = url;
      
    };

    function getEdificios() {
      edificios.value.push({edificio: 'Cualquiera'})
      for (const maquina of Object.values(json)) {
        edificios.value.push({ edificio: maquina.edificio });
      }
    }

    return {
      tipo,
      producto,
      selectedEdificio,
      buscar,
      edificios,
    };
  },
  components: {
    Multiselect,
  },
};
</script>

<template>
  <div class="card">
    <form>
      <label for="tipo">Tipo de máquina</label>
      <select id="tipo" class="form-select" v-model="tipo">
        <option value="MIXTA" selected>Mixta</option>
        <option value="CAFETERA">Café</option>
        <option value="BEBIDAS FRIAS">Frío</option>
        <option value="COMIDA SALUDABLE">Saludable</option>
      </select>

      <label for="producto">Producto concreto</label>
      <input type="text" class="form-control" v-model="producto">

      <!-- Utilizando vue-multiselect para edificio -->
      <label for="edificio">Edificio</label>
      <multiselect
        v-model="selectedEdificio"
        :options="edificios"
        :close-on-select="true"
        label="edificio"
        track-by="edificio"
      ></multiselect>
      <br>
      
      

       

      <button style="margin-right:20px" class="btn custom-btn-color">Cancelar</button>
      <button @click.prevent="buscar()" class="btn custom-btn-color">Aplicar</button>
    </form>
  </div>
</template>



<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style scoped>

.card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
  padding: 20px;
  margin: 20px;
  width: 400px;
  margin-top: 80px;
  margin-left: 60px;
  text-align: left;
}

.form-select,
.form-control {
  width: 100%;
  margin-bottom: 10px;
}

.custom-btn-color {
  text-align: center;
  color: white;
  background-color: #7fcaad;
}

.custom-btn-color:hover {
  color: white;
  background-color: #5a917b;
}


.custom-multiselect .multiselect__input {
  visibility: hidden;
}








</style>
