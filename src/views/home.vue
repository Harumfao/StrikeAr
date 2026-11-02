<template>
  <HomeLayout v-model:active-tab="pestanaActiva" @buscar="buscarCampo">
    <section class="map-area" aria-label="Mapa de Buenos Aires">
      <div ref="contenedorMapa" class="canvas-mapa"></div>

      <div class="map-actions">
        <p v-if="errorGeoloc" class="map-alert" role="alert">{{ errorGeoloc }}</p>
        <p v-if="errorBusqueda" class="map-alert" role="status">{{ errorBusqueda }}</p>
        <div v-if="coordenadas.latitud" class="coordinate-card">
          <span>
            {{ coordenadas.latitud.toFixed(4) }}, {{ coordenadas.longitud.toFixed(4) }}
          </span>
          <small>Precisión ±{{ Math.round(coordenadas.precision) }} m</small>
        </div>
        <button
          class="location-button"
          type="button"
          :disabled="cargando"
          :aria-label="cargando ? 'Obteniendo ubicación' : 'Mostrar mi ubicación'"
          @click="obtenerUbicacion"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="7" />
            <circle cx="12" cy="12" r="2" />
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
          </svg>
          <span>{{ cargando ? 'Localizando...' : 'Mi ubicación' }}</span>
        </button>
      </div>
    </section>
  </HomeLayout>
</template>

<script setup>
import { onBeforeUnmount, onMounted, nextTick, ref, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import HomeLayout from '@/components/HomeLayout.vue'
import { useGeolocation } from '../composables/useGeolocation'
import { supabase } from '@/supabase'

const campos = ref([])
const errorBusqueda = ref('')
const pestanaActiva = ref('explorar')
const { coordenadas, errorGeoloc, cargando, obtenerUbicacion } = useGeolocation()

const contenedorMapa = ref(null)
let marcadoresCampos = []
let mapa = null
let marcador = null

const inicializarMapa = (lat, lng) => {
  if (!contenedorMapa.value) return
  mapa?.remove()

  mapa = L.map(contenedorMapa.value, { zoomControl: false }).setView([lat, lng], 13)

  L.control.zoom({ position: 'bottomright' }).addTo(mapa)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap',
  }).addTo(mapa)

  const popup = document.createElement('b')
  popup.textContent = 'Obelisco de Buenos Aires'
  marcador = L.marker([lat, lng]).addTo(mapa).bindPopup(popup)
}

const obtenerCampos = async () => {
  if (!supabase) {
    console.warn('Supabase no está configurado; se mostrará el mapa sin campos.')
    return
  }

  const { data, error } = await supabase
    .from('field')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error al obtener campos:', error)
    return
  }

  campos.value = data ?? []
  renderizarCampos()
}

const renderizarCampos = () => {
  if (!mapa) return

  marcadoresCampos.forEach(({ marker: fieldMarker }) => mapa.removeLayer(fieldMarker))
  marcadoresCampos = []

  campos.value.forEach((field) => {
    if (field.latitude != null && field.longitude != null) {
      const popup = document.createElement('b')
      popup.textContent = String(field.name ?? 'Campo')
      const fieldMarker = L.marker([field.latitude, field.longitude])
        .addTo(mapa)
        .bindPopup(popup)
      marcadoresCampos.push({ field, marker: fieldMarker })
    }
  })
}

const buscarCampo = (texto) => {
  const consulta = String(texto ?? '').trim().toLocaleLowerCase()
  errorBusqueda.value = ''
  if (!consulta) return

  const campo = campos.value.find((item) =>
    String(item.name ?? '').toLocaleLowerCase().includes(consulta),
  )

  if (!campo || campo.latitude == null || campo.longitude == null) {
    errorBusqueda.value = 'No encontramos un campo con ese nombre.'
    return
  }

  mapa?.flyTo([campo.latitude, campo.longitude], 16, { duration: 0.8 })
  marcadoresCampos.find((item) => item.field === campo)?.marker.openPopup()
}

const actualizarUbicacionEnMapa = () => {
  const { latitud, longitud } = coordenadas.value
  if (!mapa || latitud == null || longitud == null) return

  const posicion = [latitud, longitud]
  const popup = document.createElement('b')
  popup.textContent = 'Tu ubicación'
  if (marcador) {
    marcador.setLatLng(posicion).setPopupContent(popup)
  } else {
    marcador = L.marker(posicion).addTo(mapa).bindPopup(popup)
  }
  mapa.flyTo(posicion, 15, { duration: 0.8 })
  marcador.openPopup()
}

onMounted(() => {
  nextTick(() => {
    inicializarMapa(-34.6037, -58.3816)
    obtenerCampos()
  })
})

onBeforeUnmount(() => {
  mapa?.remove()
  mapa = null
})

watch(coordenadas, actualizarUbicacionEnMapa)
</script>
