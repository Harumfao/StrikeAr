<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useGeolocation } from '../composables/useGeolocation'
import { supabase } from '../supabase'

const campos = ref([])
const errorCarga = ref('')
const contenedorMapa = ref(null)
const { coordenadas, errorGeoloc, cargando, obtenerUbicacion } = useGeolocation()

let mapa
let marcadorUbicacion
let marcadoresCampos = []

const crearPopupCampo = (nombre) => {
  const contenido = document.createElement('span')
  contenido.textContent = nombre || 'Campo'
  return contenido
}

const renderizarCampos = () => {
  if (!mapa) return

  marcadoresCampos.forEach((marcador) => mapa.removeLayer(marcador))
  marcadoresCampos = campos.value.flatMap((campo) => {
    const latitud = Number(campo.latitude)
    const longitud = Number(campo.longitude)
    if (!Number.isFinite(latitud) || !Number.isFinite(longitud)) return []

    const marcador = L.marker([latitud, longitud])
      .bindPopup(crearPopupCampo(campo.name))
      .addTo(mapa)
    return [marcador]
  })
}

const obtenerCampos = async () => {
  if (!supabase) {
    errorCarga.value = 'Configura VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY para cargar los campos.'
    return
  }

  errorCarga.value = ''

  try {
    const { data, error } = await supabase
      .from('field')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      throw error
    }

    campos.value = data ?? []
    renderizarCampos()
  } catch (error) {
    console.error('Error al obtener campos:', error)
    errorCarga.value = 'No se pudieron cargar los campos. Revisá la conexión con Supabase.'
  }
}

watch(coordenadas, (ubicacion) => {
  if (ubicacion.latitud === null || ubicacion.longitud === null || !mapa) return

  const posicion = [ubicacion.latitud, ubicacion.longitud]
  mapa.setView(posicion, 15)

  if (marcadorUbicacion) {
    marcadorUbicacion.setLatLng(posicion)
  } else {
    marcadorUbicacion = L.marker(posicion).addTo(mapa)
  }

  marcadorUbicacion.bindPopup('Tu ubicación').openPopup()
}, { deep: true })

onMounted(() => {
  mapa = L.map(contenedorMapa.value).setView([-34.6037, -58.3816], 12)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap',
  }).addTo(mapa)

  obtenerCampos()
})

onBeforeUnmount(() => {
  mapa?.remove()
})
</script>

<template>
  <div class="modulo-mapa">
    <header class="mapa-header">
      <h2 id="mapa-title">Mapa y geolocalización</h2>
      <button type="button" class="btn-geo" :disabled="cargando" @click="obtenerUbicacion">
        {{ cargando ? 'Localizando...' : 'Mi ubicación' }}
      </button>
    </header>

    <p v-if="errorGeoloc" class="alerta-error" role="alert">{{ errorGeoloc }}</p>
    <p v-if="errorCarga" class="alerta-error" role="alert">{{ errorCarga }}</p>

    <div v-if="coordenadas.latitud !== null" class="info-coordenadas">
      <span>Lat: {{ coordenadas.latitud.toFixed(4) }} | Lng: {{ coordenadas.longitud.toFixed(4) }}</span>
      <small>Precisión: ±{{ Math.round(coordenadas.precision) }} m</small>
    </div>

    <div ref="contenedorMapa" class="canvas-mapa" aria-label="Mapa de campos deportivos"></div>
  </div>
</template>

<style scoped>
.mapa-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.mapa-header h2 {
  margin: 0;
}

.canvas-mapa {
  z-index: 1;
  width: 100%;
  height: 350px;
  border: 1px solid #444;
  border-radius: 0.75rem;
}

.btn-geo {
  min-height: 2.5rem;
  padding: 0.5rem 1rem;
  border: 0;
  border-radius: 0.5rem;
  background: #facc15;
  color: #000;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}

.btn-geo:disabled {
  cursor: wait;
  opacity: 0.7;
}

.alerta-error {
  color: #ffb4a9;
}

.info-coordenadas {
  display: grid;
  gap: 0.25rem;
  margin-bottom: 0.75rem;
}

.info-coordenadas small {
  color: #b8b8b8;
}
</style>
