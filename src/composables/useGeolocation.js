import { onUnmounted, ref } from 'vue'

export function useGeolocation() {
  const coordenadas = ref({ latitud: null, longitud: null, precision: null })
  const errorGeoloc = ref('')
  const cargando = ref(false)
  let watchId = null

  const obtenerUbicacion = () => {
    if (!('geolocation' in navigator)) {
      errorGeoloc.value = 'La geolocalización no está disponible en este navegador.'
      return
    }

    cargando.value = true
    errorGeoloc.value = ''
    navigator.geolocation.getCurrentPosition(
      (posicion) => {
        coordenadas.value = {
          latitud: posicion.coords.latitude,
          longitud: posicion.coords.longitude,
          precision: posicion.coords.accuracy,
        }
        cargando.value = false
      },
      (error) => {
        errorGeoloc.value = `No se pudo obtener la ubicación (${error.code}): ${error.message}`
        cargando.value = false
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    )
  }

  const detenerRastreo = () => {
    if (watchId !== null && 'geolocation' in navigator) {
      navigator.geolocation.clearWatch(watchId)
      watchId = null
    }
  }

  onUnmounted(detenerRastreo)

  return { coordenadas, errorGeoloc, cargando, obtenerUbicacion, detenerRastreo }
}
