<template>
  <div class="mapaweb">
    <l-map :useGlobalLeaflet="false" :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution" />
      <l-geo-json :geojson="geojson" :options="geojsonOptions" />
      <l-marker v-for="(marker, index) in markers" :key="index" :lat-lng="marker.position">
        <l-popup :content="marker.popupContent" />
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LGeoJson, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import { circleMarker } from "leaflet/dist/leaflet-src.esm";
import { useUserStore } from "@/stores/user-store-setup";

export default {
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
    LMarker,
    LPopup,
  },
  data() {
    return {
      center: [38.3841, -0.5132],
      zoom: 17,
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
      geojson: {
        type: "FeatureCollection",
        features: [],
      },
      geojsonOptions: {
        pointToLayer: (feature, latLng) => circleMarker(latLng, { radius: 8 }),
      },
      markers: [],
      isAdmin: false,
    };
  },
  async beforeMount() {
    this.isAdmin = await useUserStore().isAdmin();
    await this.loadMarkersFromJson("maquinas.json");
    this.mapIsReady = true;
  },
  methods: {
    async loadMarkersFromJson(jsonFile) {
      try {
        const response = await fetch(jsonFile);
        const data = await response.json();

        

        // Obtener el valor de los parámetros "tipo", "edificio" y "producto" de la URL
        const urlParams = new URLSearchParams(window.location.search);
        const tipo = urlParams.get('tipo');
        const edificio = urlParams.get('edificio');
        const producto = urlParams.get('producto');

        // Filtrar los datos para obtener solo los marcadores que cumplan con los criterios especificados en la URL
        let filteredMarkers = data;
        if (tipo) {
          filteredMarkers = filteredMarkers.filter(marker => marker.type === tipo);
        }
        if (edificio) {
          filteredMarkers = filteredMarkers.filter(marker => marker.edificio === edificio);
        }
        if (producto) {
          filteredMarkers = filteredMarkers.filter(marker => marker.lista_productos.includes(producto));
        }

        this.markers = filteredMarkers.map((entry) => {
          const titleLeftPart = entry.popupContent.title.split(' - ')[0];
          const url = `support?building=${entry.edificio}&machine=${encodeURIComponent(titleLeftPart)}&id=${entry.id}`;
          const incidentUrl = `incidents?building=${entry.edificio}&machine=${encodeURIComponent(titleLeftPart)}&id=${entry.id}`;

          const admin = `<h3><a href="${url}" target="_blank">${entry.popupContent.title}</a></h3>`;
          const user = `<h3>${entry.popupContent.title}</h3>`;
          
          let text = user;
          if (this.isAdmin === true) {
            text = admin;
          }

          return {
            position: [entry.lat, entry.lon],
            popupContent: text+
                            `<p>${entry.popupContent.description}</p>
                            <button type="button" class="btn btn-danger" onclick="window.location.href='${incidentUrl}'">Incidencia</button>`
          };
        });


        // Agregar marcadores filtrados al geojson para renderizar en el mapa
        this.geojson.features = filteredMarkers.map((marker, index) => ({
          type: "Feature",
          properties: { id: index },
          geometry: {
            type: "Point",
            coordinates: [marker.lon, marker.lat], // Cambiar el orden a [lon, lat]
          },
        }));
      } catch (error) {
        console.error("Error loading markers from JSON:", error);
      }
    },
  },
};
</script>

<style>
  .mapaweb{
    width:100%;
    height:calc(100vh - 106px);;
  }
</style>