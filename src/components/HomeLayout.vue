<template>
  <div class="app-shell">
    <HomeTopBar @buscar="emit('buscar', $event)" />
    <main class="app-content">
      <slot />
    </main>
    <HomeBottomNavigation
      :model-value="activeTab"
      @update:model-value="emit('update:activeTab', $event)"
    />
  </div>
</template>

<script setup>
import HomeTopBar from './HomeTopBar.vue'
import HomeBottomNavigation from './HomeBottomNavigation.vue'
import '@/assets/home.css'

defineProps({
  activeTab: {
    type: String,
    default: 'explorar',
  },
})

const emit = defineEmits(['buscar', 'update:activeTab'])
</script>
