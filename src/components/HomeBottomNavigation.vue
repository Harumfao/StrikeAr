<template>
  <nav class="bottom-bar" aria-label="Navegación principal">
    <button
      v-for="item in items"
      :key="item.id"
      class="nav-item"
      :class="[
        { 'is-active': modelValue === item.id },
        { 'nav-item-explore': item.id === 'explorar' },
      ]"
      type="button"
      :aria-current="modelValue === item.id ? 'page' : undefined"
      @click="seleccionarPestana(item.id)"
    >
      <span v-if="item.badge || item.id === 'explorar'" class="nav-icon-wrap">
        <span v-if="item.id === 'explorar'" class="explore-orb">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m4 6 5-2 6 2 5-2v14l-5 2-6-2-5 2V6Z" />
            <path d="M9 4v14M15 6v14" />
          </svg>
        </span>
        <svg v-else viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.7 8.7 0 0 1-3.4-.7L4 20l1.5-3.8A7.2 7.2 0 0 1 4 11.5 7.5 7.5 0 0 1 12 4a7.5 7.5 0 0 1 8 7.5Z" />
        </svg>
        <span v-if="item.badge" class="nav-badge">{{ item.badge }}</span>
      </span>

      <svg v-else-if="item.id === 'favoritos'" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.8 8.8c0 5.2-8.8 10-8.8 10s-8.8-4.8-8.8-10a4.8 4.8 0 0 1 8.8-2.6 4.8 4.8 0 0 1 8.8 2.6Z" />
      </svg>
      <svg v-else-if="item.id === 'comunidad'" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="9" cy="8" r="3" />
        <path d="M3 20v-1a6 6 0 0 1 12 0v1M16 5.2a3 3 0 0 1 0 5.7M18 14a5 5 0 0 1 3 4.6V20" />
      </svg>
      <svg v-else viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 10v10h16V10M3 10l2-6h14l2 6a3 3 0 0 1-5 2 3 3 0 0 1-5 0 3 3 0 0 1-5 0 3 3 0 0 1-3-2Z" />
        <path d="M9 20v-5h6v5" />
      </svg>

      <span>{{ item.label }}</span>
    </button>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'

defineProps({
  modelValue: {
    type: String,
    default: 'explorar',
  },
})

const emit = defineEmits(['update:modelValue'])
const router = useRouter()

const seleccionarPestana = (pestana) => {
  emit('update:modelValue', pestana)
  if (pestana === 'comunidad') {
    router.push({ name: 'post' })
  }
}

const items = [
  { id: 'favoritos', label: 'Favoritos' },
  { id: 'chats', label: 'Chats', badge: '3' },
  { id: 'explorar', label: 'Explorar' },
  { id: 'comunidad', label: 'Comunidad' },
  { id: 'tienda', label: 'Tienda' },
]
</script>
