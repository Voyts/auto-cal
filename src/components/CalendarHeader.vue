<template>
  <div class="calendar-header">
    <button @click="$emit('previous')" class="nav-button">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path d="m15 18-6-6 6-6" />
      </svg>
    </button>
    <h2 class="month-title">{{ monthYear }}</h2>
    <button @click="$emit('next')" class="nav-button">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'CalendarHeader',
})

defineProps<{
  monthYear: string
}>()

defineEmits<{
  previous: []
  next: []
}>()
</script>

<style scoped>
.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
}

.nav-button {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 12px;
  padding: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
}

.nav-button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.month-title {
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  text-transform: capitalize;
}

@media (max-width: 1024px) {
  .calendar-header {
    padding: 1rem 1.5rem;
  }

  .month-title {
    font-size: 1.3rem;
  }
}

@media (max-width: 768px) {
  .calendar-header {
    padding: 1rem;
  }

  .month-title {
    font-size: 1.2rem;
  }

  .nav-button {
    padding: 0.5rem;
  }
}

@media (max-width: 480px) {
  .calendar-header {
    padding: 0.75rem;
  }

  .month-title {
    font-size: 1.1rem;
  }
}
</style>
