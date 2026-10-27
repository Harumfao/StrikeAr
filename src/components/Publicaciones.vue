<script setup>
import { onMounted, ref } from 'vue'
import { supabase } from '../supabase'

const publicaciones = ref([])
const cargando = ref(false)
const errorCarga = ref('')

const obtenerPublicaciones = async () => {
  if (!supabase) {
    errorCarga.value = 'Configura VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY para cargar publicaciones.'
    return
  }

  cargando.value = true
  errorCarga.value = ''

  try {
    const { data, error } = await supabase
      .from('publication')
      .select('*,usser(name,foto)')
      .order('created_at', { ascending: true })

    if (error) {
      throw error
    }

    publicaciones.value = data ?? []
  } catch (error) {
    console.error('Error al obtener las publicaciones:', error)
    errorCarga.value = 'No se pudieron cargar las publicaciones. Revisá la conexión con Supabase.'
  } finally {
    cargando.value = false
  }
}

onMounted(obtenerPublicaciones)
</script>

<template>
  <div class="publicaciones">
    <p v-if="cargando" role="status">Cargando publicaciones...</p>
    <p v-else-if="errorCarga" class="error" role="alert">{{ errorCarga }}</p>
    <p v-else-if="publicaciones.length === 0">Todavía no hay publicaciones.</p>

    <article
      v-for="publicacion in publicaciones"
      :key="publicacion.id_publication"
      class="publicacion"
    >
      <h3>{{ publicacion.title }}</h3>
      <p>{{ publicacion.description }}</p>
      <small v-if="publicacion.usser?.name">Por {{ publicacion.usser.name }}</small>
    </article>
  </div>
</template>

<style scoped>
.publicaciones {
  display: grid;
  gap: 1rem;
}

.publicacion {
  padding: 1rem;
  border: 1px solid #444;
  border-radius: 0.75rem;
  background: #171717;
}

.publicacion h3,
.publicacion p {
  margin: 0 0 0.5rem;
}

.publicacion small {
  color: #b8b8b8;
}

.error {
  color: #ffb4a9;
}
</style>
