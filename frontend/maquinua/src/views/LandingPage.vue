<template>
  <div class="landing-page">
    <div class="content">
      <p class="textotop">Mi texto encima del botón</p>
      <button @click="redirigir">Haz clic aquí</button>
      
    </div>
    <img class="imagen-desvanecida" src=..\assets\LogoMaquinUA.jpg alt="Mi imagen">
  </div>
</template>
<script>
   export default {
  methods: {
    redirigir() {
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
.landing-page {
  display: flex;
  justify-content: space-between;
  background-color: #555; /* Cambia este valor al color que prefieras */
  color: #fff; /* Color del texto */
  padding: 20px;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
    .textotop {
  font-size: 20px; /* Tamaño del texto */
  font-weight: bold; /* Texto en negrita */
  color: #fff; /* Color del texto */
}
    .imagen-desvanecida {
  width: 300px; /* Ajusta el tamaño de la imagen */
  height: auto;
 overflow: hidden;
   clip-path: ellipse(50% 70% at 50% 50%);
  
}



</style>







