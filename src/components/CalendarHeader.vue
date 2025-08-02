<template>
  <div class="calendar-header">
    <button @click="$emit('previous')" class="nav-button">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path d="m15 18-6-6 6-6" />
      </svg>
    </button>

    <h2 class="month-year">{{ monthYear }}</h2>

    <button @click="$emit('next')" class="nav-button">
      <svg
        width="24"
        height="24"
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
  justify-content: center;
  gap: 1.5rem;
  flex: 1;
  padding: 1.5rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.nav-button {
  background: rgba(255, 255, 255, 0.15);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.nav-button:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.nav-button svg {
  width: 20px;
  height: 20px;
}

.month-year {
  font-size: 1.6rem;
  font-weight: 600;
  color: white;
  margin: 0;
  text-align: center;
  min-width: 200px;
}

@media (max-width: 768px) {
  .calendar-header {
    gap: 1rem;
    padding: 1rem 1.5rem;
  }

  .month-year {
    font-size: 1.3rem;
    min-width: 160px;
  }

  .nav-button {
    width: 40px;
    height: 40px;
  }
}
</style>
