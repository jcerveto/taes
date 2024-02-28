<script>
import { onMounted, ref} from 'vue';
import Papa from 'papaparse';
    export default{
        setup(){

            const csvPath= ref("/distribution.csv");
            const title="Teika's distribution";
            let csvHeaders = ref([]);
            const csvData = ref([]);
            const error = ref(null);
            

            const facultad = ref("");
            const tipo = ref("todos");



            onMounted(async () => {
                try {
                    const response = await fetch(csvPath.value);
                    const csv = await response.text();
                    parseFile(csv);
                    error.value = null;
                } catch (error) {
                    console.error('An error occurred:', error.message);
                    error.value = `An error occurred when loading: ${title}`;
                }
            })

            


            function parseFile(file) {
                Papa.parse(file, {
                    header: true,
                    dynamicTyping: true,
                    complete: (results) => {
                        csvHeaders.value = results.meta.fields;
                        csvData.value = results.data;
                        console.log(csvData.value);
                    },
                });
            }

            function cumpleCriterios(maquina) {
                return (this.facultad === '' || maquina.building.toLowerCase().includes(this.facultad.toLowerCase())) && 
                (this.tipo === 'todos' || 
                (this.tipo === 'hot' && maquina.hot > 0) || 
                (this.tipo === 'cold' && maquina.cold > 0) || 
                (this.tipo === 'healthy' && maquina.healthy > 0) || 
                (this.tipo === 'mixed' && maquina.mixed > 0));
            }


            return {
                csvData,
                facultad,
                tipo,
                cumpleCriterios
            }
        }

    };

</script>

<template>
    <h1>Machines Distribution</h1>
    <form class="form-inline">
        <div class="form-group">
          <label for="facultad">Facultad</label>
          <input type="text" id="facultad" class="form-control" v-model="facultad">
        </div>
        <div class="form-group">
          <label for="tipo">Tipo</label>
          <select id="tipo" class="form-select" v-model="tipo">
            <option value="todos" selected>Todo</option>
            <option value="hot">Caliente</option>
            <option value="cold">Frío</option>
            <option value="healthy">Saludable</option>
            <option value="mixed">Mixto</option>
          </select>
        </div>
        
      </form>
    
    <div v-for="maquina in csvData" :key="maquina" class="contenido">
        <div v-if="cumpleCriterios(maquina)" class="tarjeta">
          <div class="titulo"> {{ maquina.building }} </div>
          <div v-if="maquina.cold > 0"> Frías: {{ maquina.cold }} </div>
          <div v-if="maquina.healthy > 0"> Saludables:  {{ maquina.healthy }}</div>
          <div v-if="maquina.hot > 0"> Calientes:  {{ maquina.hot }} </div>
          <div v-if="maquina.mixed > 0"> Mixtas:  {{ maquina.mixed }}</div> 
          </div>
        
      </div>
</template>



<style scoped>
  
  .form-inline {  
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center; /* Añadir para centrar horizontalmente */
    
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
  
    .form-control {
      padding: 10px;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
  
    .form-select {
      padding: 10px;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
  
    button {
      margin-top: 15px;
      padding: 10px 20px;
      font-size: 16px;
      border: none;
      border-radius: 5px;
      background-color: #7fcaad;
      color: white;
      cursor: pointer;
    }
  
    button:hover {
      background-color: #5a917b;
    }

    .tarjeta {
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 10px;
        margin: 10px;
        width: 400px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        text-align: left;
      }
    
    .contenido{
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        justify-content: center; /* Añadir para centrar horizontalmente */
    }

    .titulo{
        font-weight: bold;
        margin-bottom: 10px;
        font-size: 20px;
    }
  </style>