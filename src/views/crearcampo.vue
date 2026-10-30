<script>
import { ref, onMounted, nextTick } from 'vue'
import { supabase } from '@/supabase'
</script>

<template>
  <div>
    <h3>Registrar Nuevo Campo</h3>
    
    <form @submit.prevent="agregarCampo" class="form-campo">
      <div>
        <label>Nombre:</label>
        <input v-model="nuevoCampo.name" type="text" required />
      </div>

      <div>
        <label>Dirección:</label>
        <input v-model="nuevoCampo.address" type="text" required />
      </div>

      <div>
        <label>Contacto:</label>
        <input v-model="nuevoCampo.contact" type="text" required />
      </div>

      <div>
        <label>Horarios:</label>
        <input v-model="nuevoCampo.timetable" type="text" required />
      </div>

      <button type="submit" class="btn-guardar">Cargar Campo</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const user_id = "2ed6306f-a7d7-4387-934b-49b564f95db2"

const nuevoCampo = ref({
  name: '',
  address: '',
  contact: '',
  timetable: ''
})

const agregarCampo = async () => {
  const { data, error } = await supabase
    .from('field')
    .insert([
      { 
        name: nuevoCampo.value.name.trim(),
        address: nuevoCampo.value.address.trim(),
        contact: nuevoCampo.value.contact.trim(),
        timetable: nuevoCampo.value.timetable.trim(),
        id_user: user_id
      }
    ])
    .select()

  if (error) {
    console.error('Error al cargar el campo:', error)
  } else {
    console.log('Campo cargado con éxito', data)
    
    nuevoCampo.value = {
      name: '',
      address: '',
      contact: '',
      timetable: ''
    }
  }
}
</script>
