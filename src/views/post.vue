<script setup>
import { RouterLink } from 'vue-router'
import Publicaciones from '../components/Publicaciones.vue'
</script>

<template>
  <main class="post-container">
    <header class="post-header">
      <div>
        <h1>Publicaciones</h1>
        <p>Descubrí las novedades y propuestas de la comunidad StrikeAr.</p>
      </div>
      <RouterLink to="/">Volver al inicio</RouterLink>
    </header>

    <Publicaciones />
  </main>
</template>

<style scoped>
.post-container {
  width: min(100% - 2rem, 72rem);
  margin: 0 auto;
  padding: 2rem 0 3rem;
}

.post-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2rem;
}

.post-header h1,
.post-header p {
  margin: 0;
}

.post-header p {
  margin-top: 0.5rem;
  color: #b8b8b8;
}

.post-header a {
  color: #facc15;
  text-underline-offset: 0.2em;
}
</style>
