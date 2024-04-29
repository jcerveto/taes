 <template>
  <div class="landing-page">
    <div class="content">
      <p class="textotop">Se uno mas de la familia <span class="maquinUA">Maquin</span>UA y disfruta de todo lo que te ofrecen las maquinas expededoras</p>
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
     
      <div class="midpage">
        <img src=..\assets\maquinaex.png >
        
        <p class="textend">Contamos con las mejores marcas de maquinas expendedoras<br><span class="textdown"></span> </p>
        <img class="marca2" src=..\assets\marca2.png >
        <img class="marca1" src=..\assets\marca1.png >

      </div>
        <div class="footer">

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
  color: #fff; /* Color del texto */
  position:relative;
  padding: 100px;
    

}
.landing-page::before{
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('../assets/universidad3.jpg');
  opacity: 0.6;
  z-index: -1;
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
  color:white;
  cursor: pointer;
}
    .botontop {
     margin-left: 350px;
     margin-top: 80px;
    margin-right: 350px;
    font-size: 20px;
    padding: 15px 30px;
    color:black;
}
    .maquinUA{
    color: #7fcaad
    }
    .textotop {
    
    margin-right: 100px;
    margin-left: 15px;
    text-align: left;
    color: #000;
  font-size: 30px; /* Tamaño del texto */
  font-weight: bold; /* Texto en negrita */
  
}
    .imagen-desvanecida {
    width: 300px; /* Ajusta el tamaño de la imagen */
    height: 300px;
    verflow: hidden;
    margin-right: 100px;
    display: inline-block;
    border-radius: 9999999999px;
    
    
}

 
    .container {
   margin-top:10px;   
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
    .back{
    
    
    }
   .midpage{
    
   display:flex;
   justify-content: space-between;
   color: #fff; /* Color del texto */
   background-color:#F5F5F5;
    margin-right: 50px;
    margin-left: 50px;
    margin-top:50px;
    margin-down:50px;
   text-align: right;
}
     .textend {
    
    margin-top: 100px;
    margin-right: 250px;
    text-align: left;
    color: #000;
    font-size: 30px; /* Tamaño del texto */
    font-weight: bold; /* Texto en negrita */
  
}
     .textdown {
    
   
    font-size: 20px; /* Tamaño del texto */
    font-weight: normal; /* Texto en negrita */
  
}
    .marca1{
     width: 100px; /* Este será el ancho de tu div */
    height: 100px;
    position: absolute; /* Esto hará que tu imagen se posicione de manera absoluta */
    top: 1130px; /* Esto moverá tu imagen 50px desde la parte superior del contenedor */
    left: 700px; /* Esto moverá tu imagen 100px desde la izquierda del contenedor */
    }
    .marca2{
     width: 100px; /* Este será el ancho de tu div */
    height: 100px;
    position: absolute; /* Esto hará que tu imagen se posicione de manera absoluta */
    top: 1130px; /* Esto moverá tu imagen 50px desde la parte superior del contenedor */
    left: 1050px; /* Esto moverá tu imagen 100px desde la izquierda del contenedor */
    }
    .footer{
    padding:50px;
    }
 

</style>







