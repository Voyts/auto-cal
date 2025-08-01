<template>
  <div class="calendar-container" @click="handleContainerClick">
    <CalendarHeader :month-year="currentMonthYear" @previous="previousMonth" @next="nextMonth" />

    <div class="calendar-main">
      <CalendarGrid :calendar-days="calendarDays" @select-day="selectDay" />

      <EventSection :events="events" @add-event="addEvent" @remove-event="removeEvent" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  isSameDay,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  isBefore,
  startOfDay,
} from 'date-fns'
import CalendarHeader from './CalendarHeader.vue'
import CalendarGrid from './CalendarGrid.vue'
import EventSection from './EventSection.vue'

defineOptions({
  name: 'CalendarComponent',
})

interface CalendarDay {
  date: Date
  dayNumber: number
  isCurrentMonth: boolean
  isToday: boolean
  hasEvent: boolean
  isSelected: boolean
  isPastDay: boolean
}

interface Event {
  id: string
  title: string
  date: string
}

const currentDate = ref(new Date())
const selectedDate = ref<Date | null>(null)
const events = ref<Event[]>([])

const currentMonthYear = computed(() => {
  const month = currentDate.value.getMonth()
  const year = currentDate.value.getFullYear()

  const months = [
    'Січень',
    'Лютий',
    'Березень',
    'Квітень',
    'Травень',
    'Червень',
    'Липень',
    'Серпень',
    'Вересень',
    'Жовтень',
    'Листопад',
    'Грудень',
  ]

  return `${months[month]} ${year}`
})

const calendarDays = computed(() => {
  const start = startOfWeek(startOfMonth(currentDate.value), { weekStartsOn: 1 })
  const end = endOfWeek(endOfMonth(currentDate.value), { weekStartsOn: 1 })
  const today = startOfDay(new Date())

  return eachDayOfInterval({ start, end }).map((date) => {
    const isPast = isBefore(startOfDay(date), today)
    return {
      date,
      dayNumber: date.getDate(),
      isCurrentMonth: isSameMonth(date, currentDate.value),
      isToday: isToday(date),
      hasEvent: events.value.some((event) => isSameDay(date, new Date(event.date))),
      isSelected: selectedDate.value ? isSameDay(date, selectedDate.value) : false,
      isPastDay: isPast,
    }
  })
})

const previousMonth = () => {
  currentDate.value = subMonths(currentDate.value, 1)
}

const nextMonth = () => {
  currentDate.value = addMonths(currentDate.value, 1)
}

const selectDay = (day: CalendarDay) => {
  selectedDate.value = day.date
}

const addEvent = (event: Event) => {
  events.value.push(event)
}

const removeEvent = (eventId: string) => {
  events.value = events.value.filter((event) => event.id !== eventId)
}

const handleContainerClick = (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    selectedDate.value = null
  }
}

onMounted(() => {
  const savedEvents = localStorage.getItem('calendar-events')
  if (savedEvents) {
    events.value = JSON.parse(savedEvents)
  }
})

watch(
  events,
  (newEvents) => {
    localStorage.setItem('calendar-events', JSON.stringify(newEvents))
  },
  { deep: true },
)
</script>

<style scoped>
.calendar-container {
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.calendar-main {
  flex: 1;
  display: flex;
  gap: 2rem;
  padding: 2rem;
  overflow: hidden;
}

@media (max-width: 1024px) {
  .calendar-main {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
}

@media (max-width: 768px) {
  .calendar-container {
    height: auto;
    min-height: 100vh;
    overflow: visible;
  }

  .calendar-main {
    padding: 1rem;
    gap: 1rem;
    overflow: visible;
    flex: none;
  }
}

@media (max-width: 480px) {
  .calendar-main {
    padding: 0.5rem;
  }
}
</style>
