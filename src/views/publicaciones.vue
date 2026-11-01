<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { supabase } from '@/supabase';
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

<template>

<div v-for="publicacionesLista in publicaciones" :key="publicacionesLista.id_publication">
  <h2>{{ publicacionesLista.usser.name }}</h2>
  <p><b>Título: </b>{{ publicacionesLista.title }}</p>
  <p><b>Equipamiento: </b>{{ publicacionesLista.description }}</p>
</div>

</template>