<template>
  <div :class="{ 'dark-mode': darkMode }">
    <br>
    <h1 :style="{ color: darkMode ? 'white' : '' }">Product Prices</h1>
    <br>
    <form class="form-inline">
      <div class="form-group">
        <label for="nombre">Nombre del producto</label>
        <input type="text" id="nombre" class="form-control" v-model="nombre">
      </div>
      <div class="form-group" >
        <label for="edificio">Edificio</label>
        <multiselect
          v-model="selectedEdificio"
          :options="edificios"
          :close-on-select="true"
          label="edificio"
          track-by="edificio"
          ></multiselect>
        
      </div>
      <div class="form-group">
        <label for="precio">Precio máximo</label>
        <input type="number" id="precio" class="form-control" v-model="precio">
      </div>
      <div class="form-group">
        <label for="tipo">Tipo</label>
        <select id="tipo" class="form-select" v-model="tipo">
          <option value="todos" selected>Todo</option>
          <option value="CAFETERA">cafetera</option>
          <option value="BEBIDAS FRIAS">bebidas frías</option>
          <option value="MIXTA">mixta</option>
        </select>
      </div>
    </form>

    <div v-for="(producto, index) in productos" :key="index" class="contenido">
      <div v-if="cumpleCriterios(producto)" class="tarjeta">
        <div class="nombre">{{ producto.nombre }}</div>
        <div >Máquina {{ producto.tipo_maquina.toLowerCase() }} 
        </div>
        <div>{{ formatEdificios(producto.edificio_maquina) }}</div>
        
        <div class="info">
          <div class="precios">{{ producto.precio }}€</div>
          <button @click="buscar(producto.nombre)" class="btn custom-btn-color">buscar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import { ref, onMounted } from 'vue';
import Papa from 'papaparse';
import json from '/public/maquinas.json';
import { useRouter } from "vue-router";

export default {
  setup() {
    const csvPath = ref("/taes/prices.csv");
    const title = "Prices";
    const csvData = ref([]);
    const error = ref(null);
    const idioma = ref("name_es");
    const precio = ref(null);
    const nombre = ref("");
    const tipo = ref("todos");
    const darkMode = ref(false);
    const productos = ref([]);
    const mostrarTodosEdificios = ref(false);
    const selectedEdificio = ref({ edificio: '' });
    const edificios = ref([]);
    const router = useRouter();

    onMounted(async () => {
      
      try {
        getProductos()
        getEdificios()
        selectedEdificio.value = null
        const response = await fetch(csvPath.value);
        const csv = await response.text();
        parseFile(csv);
        error.value = null;
      } catch (error) {
        console.error('An error occurred:', error.message);
        error.value = `An error occurred when loading: ${title}`;
      }
    });

    function getEdificios() {
      
      for (const maquina of Object.values(json)) {
        if (edificios.value.filter(e => e.edificio === maquina.edificio).length === 0) {
          edificios.value.push({ edificio: maquina.edificio });
        }
      }
      console.log(edificios.value)
    }

    function toggleIdioma() {
      idioma.value = idioma.value === "name_es" ? "name_ca" : "name_es";
    }

    function formatEdificios(edificios) {
      if (mostrarTodosEdificios.value) {
        return edificios.map(edificio => edificio.replace(/^\[|\]$/g, '')).join(', ');
      } else {
        if (edificios.length <= 3) {
          return edificios.map(edificio => edificio.replace(/^\[|\]$/g, '')).join(', ');
        } else {
          const primerosCinco = edificios.slice(0, 3).map(edificio => edificio.replace(/^\[|\]$/g, '')).join(', ');
          return `${primerosCinco}, ...`;
        }
      }
    }

    function cumpleCriterios(producto) {
      console.log(producto.edificio_maquina)
      return (
        (precio.value >= producto.precio || precio.value == 0 || !precio.value) &&
        producto.nombre.toLowerCase().includes(nombre.value.toLowerCase()) &&
        (tipo.value === 'todos' || producto.tipo_maquina === tipo.value) &&
        (!selectedEdificio.value || (producto.edificio_maquina).includes(selectedEdificio.value.edificio) || selectedEdificio.value.edificio == '')


      );
    }

    const buscar = (productoSeleccionado) => {
      const edificioSeleccionado = ref('')
      if (selectedEdificio.value){
        edificioSeleccionado.value = selectedEdificio.value.edificio;
      }
      if (tipo.value == 'todos'){
        tipo.value= '';
      }
      
      const queryParams = {
        tipo: tipo.value,
        producto: productoSeleccionado,
        edificio: edificioSeleccionado.value,
      };

      const query = new URLSearchParams(queryParams).toString();
      const url = `/?${query}`;
      router.push(url);
      
    };

    function parseFile(file) {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          csvData.value = results.data;
        },
      });
    }

    function getProductos() {
      for (const maquina of json) {
        for (let i = 0; i < maquina.lista_productos.length; i++) {
          const nombreProducto = maquina.lista_productos[i];
          const indexProductoExistente = productos.value.findIndex(producto => producto.nombre === nombreProducto);
          if (indexProductoExistente !== -1) {
            productos.value[indexProductoExistente].id_maquina.push(maquina.id);
            productos.value[indexProductoExistente].edificio_maquina.push(maquina.edificio);
          } else {
            const producto = {
              nombre: nombreProducto,
              precio: maquina.lista_precios[i],
              id_maquina: [maquina.id],
              tipo_maquina: maquina.type,
              edificio_maquina: [maquina.edificio]
            };
            productos.value.push(producto);
          }
        }
      }
    }


    return {
      csvData,
      idioma,
      toggleIdioma,
      precio,
      nombre,
      tipo,
      cumpleCriterios,
      darkMode,
      productos,
      formatEdificios,
      mostrarTodosEdificios,
      selectedEdificio,
      edificios,
      buscar
    };
  },
  components: {
    Multiselect,
  },
};
</script>

<style scoped>
.dark-mode {
  background-color: #222;
  color: white;
}

/* Aplica el color blanco al texto dentro de los elementos en modo oscuro */
.dark-mode * {
  color: white;
}

/* Establece el color del texto predeterminado para los botones */
.dark-mode button {
  color: white;
}

.form-inline {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
}

.form-group {
  margin-bottom: 15px;
  margin-left: 5vh;
}

.form-group label {
  text-align: left;
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}



button {
  border: none;
  border-radius: 5px;
  background-color: #7fcaad;
  color: white;
  cursor: pointer;
  
 
}

button:hover {
  background-color: #5a917b;
  color: white;
}

.tarjeta {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
  display: flex;
  flex-direction: column;
}

.contenido {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
}

.precios {
  font-weight: bold;
  margin-top: 10px;
  font-size: 20px;
}
.nombre{
  font-size: 20px;
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


.button-container {
  display: flex;
  justify-content: flex-end;
}

.info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}
</style>

