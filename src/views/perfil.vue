<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { supabase } from '@/supabase';

const perfil = ref(null)
const user_id = "2ed6306f-a7d7-4387-934b-49b564f95db2"

const obtenerPerfil = async () => {
  const { data, error } = await supabase
    .from('usser')
    .select('name, biography, equipment')
    .eq('id_user', user_id)
    .single()

  if (error) {
    console.error('Error al obtener el perfil:', error)
  } else {
    perfil.value = data
    console.log("Perfil guardado:", perfil.value)
  }
}

onMounted(() => {
  nextTick(() => obtenerPerfil())
})
</script>

<template>
  <div class="tarjeta-perfil" v-if="perfil">
    <h2>{{ perfil.name }}</h2>
    <p><b>Biografía:</b> {{ perfil.biography }}</p>
    <p><b>Equipamiento:</b> {{ perfil.equipment }}</p>
  </div>
  <div v-else>
    <p>Cargando perfil...</p>
  </div>
</template>