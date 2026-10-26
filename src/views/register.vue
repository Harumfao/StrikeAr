<script setup>
    import '../assets/auth.css'
    import logo from '../assets/images/logo.png'
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    
    const username = ref('')
    const password = ref('')
    const router = useRouter()
    
    const handleLogin = () => {
        // Login logic here
        router.push('/dashboard')
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