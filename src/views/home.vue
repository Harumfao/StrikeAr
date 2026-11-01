<script setup>
import { RouterLink } from 'vue-router'
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <div class="home-container">
    <header class="home-header">
      <h1>StrikeAr</h1>
      <p>Conectamos a quienes buscan y ofrecen espacios para disfrutar del deporte. Explorá el mapa para encontrar campos cerca tuyo y visitá las publicaciones de la comunidad.</p>
      <RouterLink class="publicaciones-link" to="/post">Ver publicaciones</RouterLink>
    </header>

    <TheWelcome />
  </div>
</template>

<style scoped>
.home-container {
  width: min(100% - 2rem, 72rem);
  margin: 0 auto;
  padding: 2rem 0 3rem;
}

.home-header {
  margin-bottom: 2rem;
}

.home-header h1 {
  margin: 0 0 0.5rem;
}

.home-header p {
  max-width: 48rem;
  margin: 0 0 1rem;
  color: #b8b8b8;
  line-height: 1.6;
}

.publicaciones-link {
  display: inline-block;
  color: #facc15;
  text-underline-offset: 0.2em;
}
</style>


<script setup>
const campos = ref([])

const { coordenadas, errorGeoloc, cargando, obtenerUbicacion } = useGeolocation()

const contenedorMapa = ref(null)
let  marcadoresCampos = []


let mapa = null; let marcador = null

const inicializarMapa = (lat, lng) => {
  if (mapa) mapa.remove()
  mapa = L.map(contenedorMapa.value).setView([lat, lng], 15)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19, attribution: '© OpenStreetMap'
  }).addTo(mapa)

  marcador = L.marker([lat, lng]).addTo(mapa)
    .bindPopup('<b>Tu ubicación</b>').openPopup()
}


const obtenerCampos = async () => {
  const {data,error} = await supabase 
  .from('field')
  .select('*')
  .order('created_at',{ascending: false})
  if(error){
    console.error('Error al obtener campos:', error)
  } else {
    campos.value = data
    console.log(data)
    renderizarCampos()
  }
}

const renderizarCampos = () => {
  if(!mapa)return

  marcadoresCampos.forEach(m=> mapa.removeLayer(m))
  marcadoresCampos = []
  
  campos.value.forEach(field => {
    if (field.latitude && field.longitude){
      const marker = L.marker([field.latitude, field.longitude]).addTo(mapa).bindPopup(`<b>${field.name}<b`)
        
        marcadoresCampos.push(marker)
      }
    })
  }
  
  
  
  onMounted(() => {
    // Coordenadas por defecto (Obelisco, Buenos Aires)
    nextTick(() => inicializarMapa(-34.6037, -58.3816))
    obtenerCampos()
  })
</script>
