<script setup>
    import '../assets/auth.css'
    import logo from '../assets/images/logo.png'
    import { ref } from 'vue'
    import { supabase } from '@/supabase';
    import { useRouter } from 'vue-router'
    
    const username = ref('')
    const password = ref('')
    const email = ref('')

    const loading = ref (false)
    const errorMessage = ref ('')

    const router = useRouter()
    
    const handleRegister = async () => {
        loading.value = true
        errorMessage.value = ''

        try {
          const {data,error} = await supabase.auth.signUp({
            email: email.value.trim(),
            password: password.value,
            options:{
              data: {
                username: username.value
              }
            }
          })
          if (error) throw error

          if (data.session){
            await supabase.from('usser').insert([
              {id_user: data.user.id, name: username.value}
            ])
            router.push('/home')
          } else {
            errorMessage.value = 'No se pudo iniciar sesión automáticamente, por favor loguéate.'
          }
        } catch (error){
          errorMessage.value = error.message
        } finally {
          loading.value = false
        }
    }
</script>

<template>
  <div class="register-container">
    <img class="auth-logo" :src="logo" alt="Logo de StrikeAr" />
    <h1>Registrarse</h1>
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="username">Nombre de usuario:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Confirmar</button>
    </form>
  </div>
</template>

<style scoped>
</style>