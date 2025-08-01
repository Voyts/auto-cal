<template>
  <div class="event-section">
    <h3>Події</h3>
    <div class="event-form">
      <input v-model="newEventTitle" type="text" placeholder="Назва події" class="event-input" />
      <input v-model="newEventDate" type="date" class="event-input" />
      <button @click="addEvent" class="add-event-btn">Додати подію</button>
    </div>

    <div class="events-list">
      <div v-for="event in events" :key="event.id" class="event-item">
        <div class="event-info">
          <span class="event-title">{{ event.title }}</span>
          <span class="event-date">{{ formatEventDate(event.date) }}</span>
        </div>
        <button @click="$emit('removeEvent', event.id)" class="remove-event-btn">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'EventSection',
})

interface Event {
  id: string
  title: string
  date: string
}

defineProps<{
  events: Event[]
}>()

const emit = defineEmits<{
  addEvent: [event: Event]
  removeEvent: [eventId: string]
}>()

const newEventTitle = ref('')
const newEventDate = ref('')

const addEvent = () => {
  if (newEventTitle.value.trim() && newEventDate.value) {
    const event: Event = {
      id: Date.now().toString(),
      title: newEventTitle.value.trim(),
      date: newEventDate.value,
    }
    emit('addEvent', event)
    newEventTitle.value = ''
    newEventDate.value = ''
  }
}

const formatEventDate = (dateString: string) => {
  const date = new Date(dateString)
  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()

  const months = [
    'січня',
    'лютого',
    'березня',
    'квітня',
    'травня',
    'червня',
    'липня',
    'серпня',
    'вересня',
    'жовтня',
    'листопада',
    'грудня',
  ]

  return `${day} ${months[month]} ${year}`
}
</script>

<style scoped>
.event-section {
  width: 350px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  flex-shrink: 0;
}

.event-section h3 {
  margin: 0 0 1.5rem 0;
  color: #333;
  font-size: 1.3rem;
  font-weight: 600;
}

.event-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.event-input {
  padding: 0.75rem 1rem;
  border: 2px solid #e1e5e9;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
}

.event-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.add-event-btn {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-event-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.events-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.event-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: rgba(102, 126, 234, 0.05);
  border-radius: 12px;
  border-left: 4px solid #667eea;
}

.event-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
}

.event-title {
  font-weight: 600;
  color: #333;
}

.event-date {
  font-size: 0.9rem;
  color: #666;
}

.remove-event-btn {
  background: none;
  border: none;
  color: #ff4757;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.remove-event-btn:hover {
  background: rgba(255, 71, 87, 0.1);
  transform: scale(1.1);
}

/* Tablet styles */
@media (max-width: 1024px) {
  .event-section {
    width: 100%;
    max-height: none;
    overflow: visible;
  }
}

/* Mobile styles */
@media (max-width: 768px) {
  .event-section {
    padding: 1.5rem;
    max-height: none;
    overflow: visible;
    flex-shrink: 1;
  }

  .event-form {
    gap: 0.75rem;
  }

  .event-input {
    padding: 0.5rem 0.75rem;
    font-size: 0.9rem;
  }

  .add-event-btn {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
}

/* Small mobile styles */
@media (max-width: 480px) {
  .event-section {
    padding: 1rem;
  }
}
</style>
