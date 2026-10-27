<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import '../assets/auth.css'
  import logo from '../assets/images/logo.png'

  const username = ref('')
  const password = ref('')
  const router = useRouter()

  const handleLogin = () => {
    // Login logic here
    router.push('/dashboard')
  }
</script>

<template>
  <div class="login-container">
    <img class="auth-logo" :src="logo" alt="Logo de StrikeAr" />
    <h1>Iniciar sesión</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">Correo electronico</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Confirmar</button>
    </form>

    <a href="/register">=Aun no tienes cuenta? Regístrate aquí</a>
  </div>
</template>