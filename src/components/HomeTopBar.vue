<template>
  <header class="top-bar">
    <RouterLink class="brand" to="/" aria-label="StrikeAr, inicio">
      <img :src="logo" alt="StrikeAr" class="brand-logo">
      <span class="brand-target" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="7.5" />
          <circle cx="12" cy="12" r="2" />
          <path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3" />
        </svg>
      </span>
    </RouterLink>

    <form class="search-bar" role="search" @submit.prevent="emit('buscar', busqueda)">
      <input
        v-model="busqueda"
        type="search"
        placeholder="Buscar..."
        aria-label="Buscar campos"
      >
      <button type="submit" aria-label="Buscar">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="10.8" cy="10.8" r="6.8" />
          <path d="m16 16 5 5" />
        </svg>
      </button>
    </form>

    <RouterLink class="profile-button" to="/perfil" aria-label="Perfil de usuario">
      <span class="profile-avatar" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 21a7 7 0 0 1 14 0" />
        </svg>
      </span>
    </RouterLink>

    <button class="notification-button" type="button" aria-label="Notificaciones, 3 nuevas">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
      </svg>
      <span class="notification-badge">3</span>
    </button>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import logo from '@/assets/images/logo.png'

const emit = defineEmits(['buscar'])
const busqueda = ref('')
</script>
