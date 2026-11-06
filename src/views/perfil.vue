<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import HomeLayout from '@/components/HomeLayout.vue'
import { supabase } from '@/supabase'

const router = useRouter()
const perfil = ref(null)

const obtenerPerfil = async () => {
  if (!supabase) {
    console.warn('Supabase no está configurado; no se puede cargar el perfil.')
    return
  }

  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    const userId = user.id

    const { data, error } = await supabase
      .from('usser')
      .select('name, biography, equipment')
      .eq('id_user', userId)
      .maybeSingle()

    if (error) throw error

    if (data) {
      perfil.value = data
    } else {
      console.log('El usuario no tiene un perfil creado en la tabla usser.')
    }

  } catch (error) {
    console.error('Error al obtener el perfil:', error.message)
  }
}

onMounted(obtenerPerfil)
</script>

<template>
  <HomeLayout active-tab="">
    <section class="profile-page">
      <article v-if="perfil" class="profile-card">
        <div class="profile-card-avatar" aria-hidden="true">
          {{ perfil.name?.charAt(0)?.toLocaleUpperCase() || '?' }}
        </div>
        <h1>{{ perfil.name }}</h1>
        <div class="profile-detail">
          <h2>Biografía</h2>
          <p>{{ perfil.biography || 'Todavía no hay una biografía.' }}</p>
        </div>
        <div class="profile-detail">
          <h2>Equipamiento</h2>
          <p>{{ perfil.equipment || 'Sin equipamiento informado.' }}</p>
        </div>
      </article>
      <p v-else class="profile-loading" role="status">Cargando perfil...</p>
    </section>
  </HomeLayout>
</template>

<style scoped>
.profile-page {
  display: grid;
  min-height: 100%;
  place-items: start center;
  padding: clamp(24px, 6vw, 56px) 18px;
  background:
    radial-gradient(ellipse at 50% 0, rgb(55 198 239 / 9%), transparent 50%),
    #10151b;
  color: #f5f8fb;
}

.profile-card {
  display: grid;
  width: min(100%, 620px);
  gap: 20px;
  padding: clamp(22px, 5vw, 36px);
  border: 1px solid rgb(255 255 255 / 9%);
  border-radius: 20px;
  background: #171f26;
  box-shadow: 0 18px 50px rgb(0 0 0 / 28%);
}

.profile-card-avatar {
  display: grid;
  width: 76px;
  height: 76px;
  place-items: center;
  border: 2px solid #42cdf5;
  border-radius: 50%;
  background: #20333e;
  color: #8de4ff;
  font-size: 30px;
  font-weight: 750;
}

.profile-card h1 {
  margin: -8px 0 0;
  font-size: clamp(1.5rem, 5vw, 2rem);
}

.profile-detail {
  padding-top: 16px;
  border-top: 1px solid rgb(255 255 255 / 9%);
}

.profile-detail h2 {
  margin: 0 0 8px;
  color: #8de4ff;
  font-size: 0.9rem;
}

.profile-detail p,
.profile-loading {
  margin: 0;
  color: #c1cbd2;
  font-size: 0.95rem;
  line-height: 1.6;
  overflow-wrap: anywhere;
}

.profile-loading {
  padding: 14px 18px;
  border: 1px solid rgb(255 255 255 / 9%);
  border-radius: 12px;
  background: #171f26;
}
</style>