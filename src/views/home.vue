<script setup>
import { RouterLink } from 'vue-router'
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <div class="home-container">
    <header class="home-header">
      <h1>StrikeAr</h1>
      <p>Conectamos a quienes buscan y ofrecen espacios para disfrutar del deporte. Explorá el mapa para encontrar campos cerca tuyo y visitá las publicaciones de la comunidad.</p>
      <RouterLink class="publicaciones-link" to="/post">Ver publicaciones</RouterLink>
    </header>

    <TheWelcome />
  </div>
</template>

<style scoped>
.home-container {
  width: min(100% - 2rem, 72rem);
  margin: 0 auto;
  padding: 2rem 0 3rem;
}

.home-header {
  margin-bottom: 2rem;
}

.home-header h1 {
  margin: 0 0 0.5rem;
}

.home-header p {
  max-width: 48rem;
  margin: 0 0 1rem;
  color: #b8b8b8;
  line-height: 1.6;
}

.publicaciones-link {
  display: inline-block;
  color: #facc15;
  text-underline-offset: 0.2em;
}
</style>
