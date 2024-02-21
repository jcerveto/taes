// Configuración del mapa
var map = L.map('map').setView([38.3848, -0.5135], 15); // Coordenadas centradas en la Universidad de Alicante y nivel de zoom

// Capa del mapa base (puedes cambiar el proveedor de mapas según tus preferencias)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Añade marcador en la ubicación de la Universidad de Alicante
var uaMarker = L.marker([38.3848, -0.5135]).addTo(map)
  .bindPopup('Universidad de Alicante')
  .openPopup();

// Añade más marcadores (puedes repetir este bloque para añadir más)
var otroMarcador = L.marker([38.386, -0.510])
  .addTo(map)
  .bindPopup('Esta es la entrada');

// Otro marcador con contenido personalizado
var marcadorPersonalizado = L.marker([38.385, -0.515])
  .addTo(map)
  .bindPopup('<b>Es un sitio bonito</b><br> Las vistas son muy buenas.');

  //para sacar los campos de los formularios
const formulario = document.getElementById("formulario");
formulario.addEventListener("submit",(evento) => {
    evento.preventDefault();
    const data= new FormData(evento.target);
    const dataObject = Object.fromEntries(data.entries());

    console.log(dataObject);
    alert(dataObject.caja_texto);
})
//Para eventos al hacer click
const boton = document.getElementById("boton");
const texto = document.getElementById("caja_texto");
boton.addEventListener("click", (evento) => {
    alert(texto.value);
})

