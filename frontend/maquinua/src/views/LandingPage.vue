 <template>
  <div class="landing-page">
    <div class="content">
      <p class="textotop">Unete a la familia <span class="maquinUA">MaquinUA</span> y disfruta de todo lo que te ofrecen las maquinas expededoras</p>
      <button class="botontop" @click="redirigirregister">Unete</button>
      
        

    </div>
    <img class="imagen-desvanecida" src=..\assets\LogoMaquinUA.jpg alt="Mi imagen">
  </div>
     <div class="container">
        <div class="column">
            <img class="img" src=..\assets\lupa.png >
            <p>¿Que maquina escojo?</p>
         <p class="texto">Estás indeciso en que maquina expendedora elegir? busca en nuestro mapa</p>
         <button @click="redirigirmap">Mapa</button>
             </div>
        <div class="column">
         <img class="img" src=..\assets\exclamacion.png >
            <p>¿Error en la maquina?</p>
         <p class="texto">Has visto algun error en nuestras maquinas expendedoras? informanos del error </p>
         <button @click="redirigirincid">Incidencia</button>
        </div>
        <div class="column">
         <img class="img" src=..\assets\lupa.png >
            <p>¿Que prefieres?</p>
         <p class="texto">Hay algun producto que te interese en especial? aqui encontraras todos los que hay</p>
         <button @click="redirigirprod">Productos</button>
         </div>
      </div>
</template>
<script>
    
   export default {
  methods: {
    redirigirregister() {
      this.$router.push('/register');
    },
    redirigirmap() {
      this.$router.push('/');
    },
    redirigirincid() {
      this.$router.push('/incidents');
    },
     redirigirprod() {
      this.$router.push('/products');
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
  border: black;
  border-radius: 30px;
  background-color: #7fcaad;
  color: white;
  cursor: pointer;
}
    .botontop {
     margin-left: 350px;
     margin-top: 50px;
    margin-right: 350px;
    font-size: 20px;
    padding: 15px 30px;
}
    .maquinUA{
    color: #7fcaad
    }
    .textotop {
    margin-top: 30px;
    margin-right: 100px;
    margin-left: 15px;
    text-align: left;
  font-size: 30px; /* Tamaño del texto */
  font-weight: bold; /* Texto en negrita */
  
}
    .imagen-desvanecida {
    width: 300px; /* Ajusta el tamaño de la imagen */
    height: 300px;
    verflow: hidden;
    margin-right: 300px;
    display: inline-block;
    border-radius: 9999999999px;
    
    
}
   .imagen-desvanecida::after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-shadow: inset 0 0 0 10px rgba(0, 0, 0, 0.5);
}
    .container {
  display: flex;
  justify-content: space-between;
}

    .column {
  flex: 1;
  padding: 10px;
  box-sizing: border-box;
  font-size: 20px; /* Tamaño del texto */
  font-weight: bold; /* Texto en negrita */
  color: #000; /* Color del texto */
}
    .texto{
   font-size: 16px;
  font-weight: normal;
  color: #000000; /* Este es el color negro, pero puedes cambiarlo a lo que prefieras */
}
    .img{
    width: 40px; /* Ajusta el tamaño de la imagen */
    height: 40px;
    opacity: 0.3;
}


</style>







