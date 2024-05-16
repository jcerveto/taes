<template>
  <div class="landing-page">
    <div class="content">
      <p class="textotop">Únete a la familia <span class="maquinUA">MaquinUA</span> y disfruta de todo lo que te ofrecen nuestras máquinas expendedoras</p>
      <button class="botontop" @click="redirigirregister">Únete</button>
    </div>
    <img class="imagen-desvanecida" src="../assets/LogoMaquinUA.jpg" alt="Logo MaquinUA">
  </div>

  <div class="mapa">
    <p class="text2">Usa nuestro mapa para encontrar máquinas expendedoras</p>
    <button class="button-map">
      <img class="imagenmapa" src="../assets/mapa.png" alt="Mapa">
    </button>
    <p class="text2">Utiliza todas las opciones disponibles</p>
  </div>

  <div class="center-container">
    <div class="container">
      <div class="column">
        <img class="img" src="../assets/lupa.png" alt="Buscar">
        <p>¿Qué máquina escojo?</p>
        <p class="texto">¿Estás indeciso sobre qué máquina expendedora elegir? Busca en nuestro mapa.</p>
        <button @click="redirigirmap">Ver Mapa</button>
      </div>
      <div class="column">
        <img class="img" src="../assets/exclamacion.png" alt="Error">
        <p>¿Error en la máquina?</p>
        <p class="texto">¿Has visto algún error en nuestras máquinas expendedoras? Infórmanos del problema.</p>
        <button @click="redirigirincid">Reportar Incidencia</button>
      </div>
      <div class="column">
        <img class="img" src="../assets/productos.png" alt="Productos">
        <p>¿Qué prefieres?</p>
        <p class="texto">¿Hay algún producto que te interese especialmente? Aquí encontrarás todos los disponibles.</p>
        <button @click="redirigirprod">Ver Productos</button>
      </div>
    </div>
  </div>

  <div class="midpage">
    <img class="maquina-ex" src="../assets/maquinaex.png" alt="Máquina Expendedora">
    <div class="row">
      <p class="textend">Contamos con las mejores marcas de máquinas expendedoras</p>
      <div class="marcas">
        <img class="marca" src="../assets/marca2.png" alt="Marca 2">
        <img class="marca" src="../assets/marca1.png" alt="Marca 1">
      </div>
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
      this.$router.push('/map');
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
  align-items: center;
  color: #fff;
  padding: 100px;
  background-image: url('../assets/universidad3.jpg');
  background-size: cover;
  background-position: center;
  position: relative;
}

.landing-page::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: -1;
}

.content {
  z-index: 1;
  max-width: 600px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.textotop {
  font-size: 36px;
  font-weight: bold;
  color: #000;
  margin-bottom: 20px;
}

.maquinUA {
  color: #7fcaad;
}

.botontop {
  padding: 15px 30px;
  font-size: 20px;
  color: #000;
  background-color: #7fcaad;
  border: none;
  border-radius: 30px;
  cursor: pointer;
}

.imagen-desvanecida {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  z-index: 1;
}

.mapa {
  text-align: center;
  background-color: #f2f4f4;
  padding: 20px;
  border-radius: 10px;
  margin: 40px 0;
}

.text2 {
  font-size: 24px;
  color: #000;
  margin-bottom: 20px;
}

.button-map {
  background: none;
  border: none;
  cursor: pointer;
}

.imagenmapa {
  width: 100%;
  max-width: 1000px;
  height: auto;
}

.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
}

.container {
  display: flex;
  justify-content: space-between;
  margin: 40px 0;
}

.column {
  background-color: #f2f4f4;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  flex: 1;
  margin: 0 10px;
}

.img {
  width: 40px;
  height: 40px;
  opacity: 0.7;
  margin-bottom: 10px;
}

.texto {
  font-size: 16px;
  color: #000;
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #7fcaad;
  border: none;
  border-radius: 30px;
  cursor: pointer;
}

.midpage {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 50px;
  background: linear-gradient(to right, #7fcaad, #4a90e2);
  border-radius: 10px;
  margin: 40px 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.midpage::before, .midpage::after {
  content: '';
  position: absolute;
  width: 200%;
  height: 200%;
  top: -50%;
  left: -50%;
  background: radial-gradient(circle at center, rgba(255, 255, 255, 0.1), transparent 70%);
  animation: rotation 10s infinite linear;
  z-index: -1;
}

.midpage::after {
  animation-delay: -5s;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.maquina-ex {
  width: 300px;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.maquina-ex:hover {
  transform: scale(1.05);
}

.row {
  flex: 1;
  text-align: center;
  color: #fff;
}

.textend {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.marcas {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.marca {
  width: 100px;
  height: auto;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
  transition: transform 0.3s ease;
}

.marca:hover {
  transform: translateY(-5px);
}

.footer {
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 20px;
  border-radius: 10px;
  margin-top: 40px;
}

@media screen and (max-width: 768px) {
  .landing-page {
    flex-direction: column;
    padding: 50px;
  }

  .content {
    text-align: center;
  }

  .imagen-desvanecida {
    display: none;
  }

  .container {
    flex-direction: column;
  }

  .column {
    margin: 20px 0;
  }

  .midpage {
    flex-direction: column;
  }

  .maquina-ex {
    margin-bottom: 20px;
  }

  .midpage img {
    margin-bottom: 20px;
  }
}

</style>
