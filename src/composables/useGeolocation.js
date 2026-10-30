import { ref, onUnmounted } from 'vue'

export function useGeolocation() {
  const coordenadas = ref({ latitud: null, longitud: null, precision: null })
  const errorGeoloc = ref(null); const cargando = ref(false)
  let watchId = null

  const obtenerUbicacion = () => {
    if (!('geolocation' in navigator)) {
      errorGeoloc.value = 'Geolocalización no soportada.'; return
    }
    cargando.value = true; errorGeoloc.value = null
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        coordenadas.value = { latitud: pos.coords.latitude, longitud: pos.coords.longitude, precision: pos.coords.accuracy }
        cargando.value = false
      },
      (err) => { errorGeoloc.value = `Error (${err.code}): ${err.message}`; cargando.value = false },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    )
  }

  const detenerRastreo = () => { if (watchId !== null) navigator.geolocation.clearWatch(watchId) }
  onUnmounted(() => detenerRastreo())
  return { coordenadas, errorGeoloc, cargando, obtenerUbicacion, detenerRastreo }
}
