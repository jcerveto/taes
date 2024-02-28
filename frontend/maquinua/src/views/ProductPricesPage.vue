<script>
    import { onMounted, ref} from 'vue';
    import Papa from 'papaparse';
    export default{
        setup(){

            const csvPath= ref("/prices.csv");
            const title="Prices";
            let csvHeaders = ref([]);
            const csvData = ref([]);
            const error = ref(null);
            const idioma = ref("name_es");

            const precio = ref(null);
            const nombre = ref("");
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

            function toggleIdioma(){
                if (idioma.value == "name_es"){
                    idioma.value = "name_ca";
                    console.log("hola")
                }
                else {
                    idioma.value = "name_es";
                    console.log("adios")
                }
            }

            function cumpleCriterios(producto) {
              return (this.precio >= producto.total || this.precio == 0 || !this.precio) && 
              (producto[this.idioma].toLowerCase().includes(this.nombre.toLowerCase())) && 
              (this.tipo === 'todos' || producto.type === this.tipo);
            }


            function parseFile(file) {
                Papa.parse(file, {
                    header: true,
                    dynamicTyping: true,
                    complete: (results) => {
                        csvHeaders.value = results.meta.fields;
                        csvData.value = results.data;
                        //console.log(csvData.value);
                    },
                });
            }


            return {
                csvData,
                idioma,
                toggleIdioma,
                precio,
                nombre,
                tipo,
                cumpleCriterios
            }
        }

    };

</script>

<template>
    <div>
        
      <h1>Product Prices <button  @click="toggleIdioma()">es/cat</button></h1>
      <form class="form-inline">
        <div class="form-group">
          <label for="nombre">Nombre del producto</label>
          <input type="text" id="nombre" class="form-control" v-model="nombre">
        </div>
        <div class="form-group">
          <label for="precio">Precio máximo</label>
          <input type="number" id="precio" class="form-control" v-model="precio">
        </div>
        <div class="form-group">
          <label for="tipo">Tipo</label>
          <select id="tipo" class="form-select" v-model="tipo">
            <option value="todos" selected>Todo</option>
            <option value="hot">Caliente</option>
            <option value="cold">Frío</option>
            <option value="solid">Sólido</option>
          </select>
        </div>
        
      </form>
      
      
      
      <div v-for="producto in csvData" :key="producto" class="contenido">
        <div v-if="cumpleCriterios(producto)" class="tarjeta">
          {{ producto[idioma] }}
          <div style="">Tipo: {{ producto.type }} </div> 
          <div class="precios">{{ producto.total }}€</div>
        </div>
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

    .precios{
        font-weight: bold;
        margin-top: 10px;
        font-size: 20px;
    }
  </style>