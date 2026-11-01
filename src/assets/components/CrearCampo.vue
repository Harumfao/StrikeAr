<script>
import { ref, onMounted, nextTick } from 'vue'
import { supabase } from '@/supabase';
</script>

<template>

<div>
    <form @submit.prevent="agregarTarea" class="form-tarea">
      <input 
        v-model="nuevoTitulo" 
        type="text" 
        placeholder="Escribe una nueva tarea..."
        required
      />
      <button type="submit">Agregar</button>
    </form>
</div>

</template>

<script setup>
const tareas = ref([])
const nuevoTitulo = ref('')

const agregarTarea = async () => {
  if (!nuevoTitulo.value.trim()) return

  const { data, error } = await supabase
    .from('campo')
    .insert([{ name: nuevoTitulo.value.trim(), completada: false }])
    .select()

  if (error) {
    console.error('Error al insertar:', error)
  } else if (data) {
    tareas.value.unshift(data[0])
    nuevoTitulo.value = ''
  }
}

  onMounted(() => {
    nextTick(() => obtenerPublicaciones())

  })
</script>
