<template>
  <div>
    <h1>Mapa de la Universidad de Alicante</h1>
    <div id="map"></div>
  </div>
</template>

<script>

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Importa la imagen del marcador
import miMarcadorIcon from './mi_marcador.png';

export default {
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      const uaCoordinates = [38.384, -0.513];
      const map = L.map('map').setView(uaCoordinates, 19);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map);

      // Uso un marcador llamado mi_marcador.png
      L.marker(uaCoordinates, {
        icon: L.icon({
          iconUrl: miMarcadorIcon,
          iconSize: [15, 35],
          iconAnchor: [22, 94],
          popupAnchor: [-3, -76],
        }),
      }).addTo(map).bindPopup('Universidad de Alicante').openPopup();
    },
  },
};
</script>

<style>
#map {
  height: 600px;
}
</style>

