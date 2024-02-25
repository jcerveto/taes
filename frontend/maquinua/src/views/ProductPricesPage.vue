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
                tipo
            }
        }

    };

</script>

<template>
    <h1>Product Prices</h1>
    <form>
        <label>Nombre del producto</label>
        <input type="text" class="form-control" v-model="nombre">
        <label>Precio máximo</label>
        <input type="number" class="form-control" v-model="precio">
        <label>Tipo</label>
        <select class="form-select" aria-label="Tipo" v-model="tipo">
            <option value="todos" selected>Todo</option>
            <option value="hot">Caliente</option>
            <option value="cold">Frío</option>
            <option value="solid">Sólido</option>
        </select>
        
    </form>
    <button @click="toggleIdioma()">es/cat</button>
    
    <div v-for="producto in csvData" :key="producto">
        <p v-if="(precio >= producto.total || precio == 0 || !precio) && (producto[idioma].toLowerCase().includes(nombre.toLowerCase())) 
            && (producto.type == tipo || tipo == 'todos')">
         {{producto[idioma]}} {{ producto.total }}€ {{ producto.type }}
        </p>
    </div>
    
</template>

<style scoped>




</style>