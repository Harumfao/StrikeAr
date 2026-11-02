<script setup>
import HomeLayout from '@/components/HomeLayout.vue'
import Publicaciones from '@/components/Publicaciones.vue'
</script>

<template>
  <HomeLayout active-tab="comunidad">
    <main class="publications-page">
      <header class="publications-header">
        <h1>Comunidad</h1>
        <p>Descubrí las novedades y propuestas de la comunidad StrikeAr.</p>
      </header>
      <Publicaciones />
    </main>
  </HomeLayout>
</template>

<style scoped>
.publications-page {
  width: min(100% - 2rem, 72rem);
  min-height: 100%;
  margin: 0 auto;
  padding: clamp(1.25rem, 4vw, 2rem) 0 3rem;
  color: #f5f8fb;
}

.publications-header {
  margin-bottom: clamp(1.25rem, 4vw, 2rem);
}

.publications-header h1,
.publications-header p {
  margin: 0;
}

.publications-header h1 {
  font-size: clamp(1.5rem, 5vw, 2rem);
}

.publications-header p {
  margin-top: 0.5rem;
  color: #aebac3;
  font-size: clamp(0.82rem, 2.5vw, 0.95rem);
  line-height: 1.5;
}

@media (max-width: 420px) {
  .publications-page {
    width: calc(100% - 1.5rem);
  }
}
</style>
