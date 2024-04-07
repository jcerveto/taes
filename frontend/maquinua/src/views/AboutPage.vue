<template>
  <div class="about-section">
    <h1>Sobre nosotros</h1>
    <p>¡Hola! Nosotros somos MIUA y ofrecemos soluciones en forma de mapas interactivos para la Universidad de Alicante</p>
    <p>Presentamos ahora MaquinUA, un mapa interactivo en el que se muestra la ubicación exacta de todas las maquinas expendedoras de la UA</p>
  </div>

  <h2 style="text-align:center">Our Team</h2>

  <div class="card-group">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Jose Megia</h5>
        <p class="card-text">Mi compromiso con el diseño web y mi destreza en el desarrollo frontend son contribuciones esenciales para el equipo.</p>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Joan Cerveto</h5>
        <p class="card-text">Mi pasion por las redes y mis conocimientos en backend me convierten en una pieza fundamental</p>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Nicolas Martin</h5>
        <p class="card-text">Tengo una amplia variedad de conocimientos tanto en frontend como en backend. Puedo ayudar en todo tipo de tareas</p>
      </div>
    </div>
  </div>

  <div class="card-group">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Adrian Romero</h5>
        <p class="card-text">Me apasionan las bases de datos y las redes de intercomunicaciones. Mi pasion por el trabajo es inigualable.</p>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Carlos Guirao</h5>
        <p class="card-text">Me apasiona aprender cada vez más y poder aportar todo lo que puedo al equipo</p>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Daniel Ripoll</h5>
        <p class="card-text">Altos conocimientos en desarrollo backend y frontend. Me encanta aportar todo mi esfuerzo al equipo</p>
      </div>
    </div>
  </div>

  <div class="card-group">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title"></h5>
        <p class="card-text"></p>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Cristian Córdoba</h5>
        <p class="card-text">Me apasiona ayudar a mi equipo y aportar todos mis conocimientos en desarrollo web</p>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title"></h5>
        <p class="card-text"></p>
      </div>
    </div>
  </div>
  
</template>



<style>
body {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
}

html {
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: inherit;
}

.column {
  float: left;
  width: 33.3%;
  margin-bottom: 16px;
  padding: 0 8px;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin: 8px;
}

.about-section {
  padding: 50px;
  text-align: center;
  background-color: #474e5d;
  color: white;
}

.container {
  padding: 0 16px;
}

.container::after, .row::after {
  content: "";
  clear: both;
  display: table;
}

.title {
  color: grey;
}

.button {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 8px;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: 100%;
}

.button:hover {
  background-color: #555;
}

@media screen and (max-width: 650px) {
  .column {
    width: 100%;
    display: block;
  }
}
</style>