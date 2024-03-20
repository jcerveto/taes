<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default{
    setup(){
        const router = useRouter();
        const tipo = ref('');
        const producto = ref('');
        const edificio = ref('');

        const buscar = () => {
            const queryParams = {
                tipo: tipo.value,
                producto: producto.value,
                edificio: edificio.value,
            };

            const query = new URLSearchParams(queryParams).toString();
            const url = `/?${query}`;

            router.push(url);
        }





        return{
            tipo,
            producto,
            edificio,
            buscar

        }
    }



};


</script>



<template>
    <div class="card">
      <form>
        <label for="tipo">Tipo de máquina</label>
        <select  id="tipo" class="form-select" v-model="tipo">
          <option value="MIXTA" selected>Mixta</option>
          <option value="CAFETERA">Café</option>
          <option value="BEBIDAS FRÍAS">Frío</option>
          <option value="COMIDA SALUDABLE">Saludable</option>
        </select>
        <label for="producto">Producto concreto</label>
        <input type="text" class="form-control">
        <label for="edificio">Edificio</label>
        <input type="text" class="form-control">
        
        <button style="margin-right:20px" class="btn custom-btn-color">Cancelar</button>
        <button @click="buscar()" class="btn custom-btn-color">Aplicar</button>
    
        
      </form>
    </div>
  </template>
  
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

  
  </style>
  