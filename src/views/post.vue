<script setup>
import { useRouter } from 'vue-router'
import HomeLayout from '@/components/HomeLayout.vue'
import Publicaciones from '../components/Publicaciones.vue'

const router = useRouter()

const volverAAnterior = () => {
  if (window.history.state?.back) {
    router.back()
    return
  }

  router.replace({ name: 'comunidad' })
}
</script>

<template>
  <HomeLayout active-tab="comunidad">
    <main class="post-container">
      <header class="post-header">
        <div class="post-heading">
          <button
            class="post-back-button"
            type="button"
            aria-label="Volver a la pestaña anterior"
            @click="volverAAnterior"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m15 18-6-6 6-6M9 12h12" />
            </svg>
          </button>
          <div>
            <h1>Comunidad</h1>
            <p>Descubrí las novedades y propuestas de la comunidad StrikeAr.</p>
          </div>
        </div>
      </header>

      <Publicaciones />
    </main>
  </HomeLayout>
</template>

<style scoped>
.post-container {
  width: min(100% - 2rem, 72rem);
  min-height: 100%;
  margin: 0 auto;
  padding: clamp(1.25rem, 4vw, 2rem) 0 3rem;
}

.post-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: clamp(1.25rem, 4vw, 2rem);
}

.post-heading {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 0.9rem;
}

.post-heading h1,
.post-heading p {
  margin: 0;
}

.post-heading h1 {
  color: #f5f8fb;
  font-size: clamp(1.5rem, 5vw, 2rem);
}

.post-heading p {
  margin-top: 0.45rem;
  color: #aebac3;
  font-size: clamp(0.82rem, 2.5vw, 0.95rem);
  line-height: 1.5;
}

.post-back-button {
  display: grid;
  width: 42px;
  height: 42px;
  flex: 0 0 42px;
  place-items: center;
  border: 1px solid #35434c;
  border-radius: 50%;
  background: #171f26;
  color: #8de4ff;
  cursor: pointer;
}

.post-back-button:hover {
  border-color: #42cdf5;
  background: #202c34;
}

.post-back-button:focus-visible {
  outline: 2px solid #64ddff;
  outline-offset: 3px;
}

.post-back-button svg {
  width: 21px;
  height: 21px;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.8;
}

@media (max-width: 420px) {
  .post-container {
    width: calc(100% - 1.5rem);
  }

  .post-heading {
    gap: 0.65rem;
  }

  .post-back-button {
    width: 38px;
    height: 38px;
    flex-basis: 38px;
  }
}
</style>
