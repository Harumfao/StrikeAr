<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { supabase } from '@/supabase';
  import '../assets/auth.css'
  import logo from '../assets/images/logo.png'

  const email = ref('')
  const password = ref('')
  
  const loading = ref (false)
  const errorMessage = ref ('')

  const router = useRouter()

  const handleLogin = async () => {
    loading.value = true
    errorMessage.value = ''

    try{
    const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })
  if (error) throw error
      if (!data.session) {
        throw new Error('No se pudo iniciar sesión.')
      }
      
      router.push('/home')
    
    } catch (error) {
      console.error("Error de login:", error.message)
      if (error.message.includes('Invalid login credentials')) {
        errorMessage.value = 'Correo o contraseña incorrectos.'
      } else {
        errorMessage.value = error.message
      }
    } finally {
      loading.value = false
    }
  }

</script>

<template>
  <div class="login-container">
    <img class="auth-logo" :src="logo" alt="Logo de StrikeAr" />
    <h1>Iniciar sesión</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Correo electronico</label>
        <input type="text" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit" :disabled="loading">
        {{ loading ? 'Iniciando sesión...' : 'Confirmar' }}
      </button>
      <p v-if="errorMessage" class="error" style="color: red; margin-top: 10px;">
        {{ errorMessage }}
      </p>
    </form>

    <a href="/register">¿Aun no tienes cuenta? Regístrate aquí</a>
  </div>
</template>