<script>
import { ref, onMounted, nextTick } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useGeolocation } from '../composables/useGeolocation'
</script>

<template>
  <div class="modulo-mapa">
    <header class="mapa-header">
      <h2>Mapa & Geolocalización</h2>
      <button @click="obtenerUbicacion" class="btn-geo" :disabled="cargando">
        {{ cargando ? 'Localizando...' : '📍 Mi Ubicación' }}
      </button>
    </header>

    <p v-if="errorGeoloc" class="alerta-error">{{ errorGeoloc }}</p>

    <div v-if="coordenadas.latitud" class="info-coordenadas">
      <span>Lat: {{ coordenadas.latitud.toFixed(4) }} | Lng: {{ coordenadas.longitud.toFixed(4) }}</span>
      <small>Precisión: ±{{ Math.round(coordenadas.precision) }} m</small>
    </div>

    <!-- Contenedor Leaflet con altura explícita -->
    <div ref="contenedorMapa" class="canvas-mapa"></div>
  </div>
</template>

<style scoped>
.canvas-mapa { width: 100%; height: 350px; border-radius: 10px; border: 1px solid #262626; z-index: 1; }
.btn-geo { background: #facc15; color: #000; border: none; padding: 8px 16px; border-radius: 6px; font-weight: 700; cursor: pointer; }
</style>


<script setup>

const { coordenadas, errorGeoloc, cargando, obtenerUbicacion } = useGeolocation()
const contenedorMapa = ref(null)
let mapa = null; let marcador = null

const inicializarMapa = (lat, lng) => {
  if (mapa) mapa.remove()
  mapa = L.map(contenedorMapa.value).setView([lat, lng], 15)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19, attribution: '© OpenStreetMap'
  }).addTo(mapa)

  marcador = L.marker([lat, lng]).addTo(mapa)
    .bindPopup('<b>Ubicación actual</b>').openPopup()
}

onMounted(() => {
  // Coordenadas por defecto (Obelisco, Buenos Aires)
  nextTick(() => inicializarMapa(-34.6037, -58.3816))
})
</script>
