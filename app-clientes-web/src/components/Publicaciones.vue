<script>
import { ref, onMounted, nextTick } from 'vue'
import 'leaflet/dist/leaflet.css'
import { supabase } from '@/supabase';
</script>

<template>

<div v-for="publicacionesLista in publicaciones" :key="publicacionesLista.id_publication">
  <span>{{ publicacionesLista.usser.name }}</span>
  <span>{{ publicacionesLista.title }}</span>
  <span>{{ publicacionesLista.description }}</span>

</div>

</template>

<script setup>
const publicaciones = ref ([])

const obtenerPublicaciones = async () => {
  const {data,error} = await supabase
  .from('publication')
  .select('*,usser(name,foto)')
  .order('created_at',{ascending:true})
  if (error){
    console.error('Error al obtener las publicaciones:', error)
  } else {
    publicaciones.value = data
    console.log(data)}}

  onMounted(() => {
    nextTick(() => obtenerPublicaciones())

  })
</script>
