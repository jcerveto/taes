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
            <p>·Que maquina escojo?</p>
         <p class="texto">Estás indeciso en que maquina expendedora elegir? Busca en nuestro mapa</p>
         <button @click="redirigirmap">Mapa</button>
             </div>
        <div class="column">
         <img class="img" src=..\assets\exclamacion.png >
            <p>·Error en la maquina?</p>
         <p class="texto">Has visto algun error en nuestras maquinas expendedoras? Informanos del error </p>
         <button @click="redirigirincid">Incidencia</button>
        </div>
        <div class="column">
         <img class="img" src=..\assets\lupa.png >
            <p>·Que prefieres?</p>
         <p class="texto">Hay algun producto que te interese en especial? Aqui encontraras todos los que hay</p>
         <button @click="redirigirprod">Productos</button>
         </div>
      </div>
     
      <div class="midpage">
        <img src=..\assets\maquinaex.png >
        <div class="row">
            <p class="textend">Contamos con las mejores marcas de maquinas expendedoras<br><span class="textdown"></span> </p>
            <div class="marcas">
                <img class="marca2" src=..\assets\marca2.png >
                <img class="marca1" src=..\assets\marca1.png >
            </div>
        </div>    
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
  flex:1;
  display: flex;
  justify-content: space-between;
  color: #fff; /* Color del texto */
  position:relative;
  padding: 100px;
    

}
.landing-page::before{
    display: flex;
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
  font-size: 30px; /* Tama�o del texto */
  font-weight: bold; /* Texto en negrita */
  
}
    .imagen-desvanecida {
    width: 300px; /* Ajusta el tama�o de la imagen */
    height: 300px;
    verflow: hidden;
   
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
  font-size: 20px; /* Tama�o del texto */
  font-weight: bold; /* Texto en negrita */
  color: #000; /* Color del texto */
}
    .texto{
   font-size: 16px;
  font-weight: normal;
  color: #000000; /* Este es el color negro, pero puedes cambiarlo a lo que prefieras */
}
    .img{
    width: 40px; /* Ajusta el tama�o de la imagen */
    height: 40px;
    opacity: 0.3;
}
    .back{
    
    
    }
   .midpage{
    overflow: hidden;
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
   
    text-align: left;
    color: #000;
    font-size: 30px; /* Tama�o del texto */
    font-weight: bold; /* Texto en negrita */
  
}
     .textdown {
    
   
    font-size: 20px; /* Tama�o del texto */
    font-weight: normal; /* Texto en negrita */
  
}
    .row {
    display: flex;
    flex-direction: row;
}

    .marcas {
        display: flex;
        margin-left: 15%;
    }

    .marca1, .marca2{
    width: 100px; /* Este ser� el ancho de tu div */
    height: 100px;
     margin-left: 10%;
    
    }
    .footer{
    padding:50px;
}
    @media screen and (max-width: 1400px) {
    .imagen-desvanecida {
    display: none;
  }
    }
    @media screen and (max-width: 600px) {
    .imagen-desvanecida {
    display: none;
  }
  .landing-page {
    flex-direction: column;
    padding: 50px;
  }
  .content {
    align-items: center;
  }
  .container {
    flex-direction: column;
  }
  .column {
    margin-bottom: 20px;
  }
  .midpage {
    flex-direction: column;
    align-items: center;
  }
  .textend {
    margin-right: 0;
    text-align: center;
  }
     .marca1, .marca2 {
    width: 50px; /* Reducimos el tama�o de las im�genes en pantallas peque�as */
    height: 50px;
   }
}
 

</style>







