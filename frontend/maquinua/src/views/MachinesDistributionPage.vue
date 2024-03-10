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
    };
  },
  async beforeMount() {
    await this.loadMarkersFromJson("maquinas.json");
    this.mapIsReady = true;
  },
  methods: {
    async loadMarkersFromJson(jsonFile) {
      try {
        const response = await fetch(jsonFile);
        const data = await response.json();

        this.markers = data.map((entry) => ({
          position: [entry.lat, entry.lon],
          popupContent: `<h3>${entry.popupContent.title}</h3><p>${entry.popupContent.description}</p>`,
        }));

        // Add markers to geojson for rendering on the map
        this.geojson.features = this.markers.map((marker, index) => ({
          type: "Feature",
          properties: { id: index },
          geometry: {
            type: "Point",
            coordinates: [marker.position[1], marker.position[0]],
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
