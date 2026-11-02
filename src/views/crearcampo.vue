<template>
  <HomeLayout active-tab="">
    <section class="create-field-page">
      <div class="create-field-card">
        <h1>Registrar nuevo campo</h1>
        <p>Completa los datos para agregar un campo a la comunidad.</p>

        <form class="form-campo" @submit.prevent="agregarCampo">
          <div>
            <label for="field-name">Nombre</label>
            <input id="field-name" v-model="nuevoCampo.name" type="text" required>
          </div>

          <div>
            <label for="field-address">Dirección</label>
            <input id="field-address" v-model="nuevoCampo.address" type="text" required>
          </div>

          <div>
            <label for="field-contact">Contacto</label>
            <input id="field-contact" v-model="nuevoCampo.contact" type="text" required>
          </div>

          <div>
            <label for="field-timetable">Horarios</label>
            <input id="field-timetable" v-model="nuevoCampo.timetable" type="text" required>
          </div>

          <button type="submit" class="btn-guardar">Cargar campo</button>
        </form>
      </div>
    </section>
  </HomeLayout>
</template>

<script setup>
import { ref } from 'vue'
import HomeLayout from '@/components/HomeLayout.vue'
import { supabase } from '@/supabase'

const user_id = '2ed6306f-a7d7-4387-934b-49b564f95db2'

const nuevoCampo = ref({
  name: '',
  address: '',
  contact: '',
  timetable: '',
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
        id_user: user_id,
      },
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
      timetable: '',
    }
  }
}
</script>
