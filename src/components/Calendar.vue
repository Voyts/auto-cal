<template>
  <div class="calendar-container" @click="handleContainerClick">
    <CalendarHeader :month-year="currentMonthYear" @previous="previousMonth" @next="nextMonth" />

    <div class="calendar-main">
      <CalendarGrid :calendar-days="calendarDays" @select-day="selectDay" />

      <EventSection :events="events" @add-event="addEvent" @remove-event="removeEvent" />
    </div>

    <div class="locale-section">
      <button @click="toggleLocale" class="locale-toggle">
        {{ currentLocale === 'uk' ? '🇺🇸 Switch to English' : '🇺🇦 Перемкнути на українську' }}
      </button>
    </div>

    <PWAInstall />
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
import PWAInstall from './PWAInstall.vue'
import { useLocale } from '../composables/useLocale'

defineOptions({
  name: 'CalendarComponent',
})

interface CalendarDay {
  date: Date
  dayNumber: number
  isCurrentMonth: boolean
  isToday: boolean
  hasEvent: boolean
  hasStartEvent: boolean
  hasEndEvent: boolean
  dayColors: string[]
  dayEvents: Array<Event & { type: 'start' | 'end' | 'middle' }>
  isSelected: boolean
  isPastDay: boolean
}

interface Event {
  id: string
  title: string
  date: string
  startDate?: string
  color: string
}

const { locale, initLocale, toggleLocale, currentLocale } = useLocale()

const currentDate = ref(new Date())
const selectedDate = ref<Date | null>(null)
const events = ref<Event[]>([])

const currentMonthYear = computed(() => {
  const month = currentDate.value.getMonth()
  const year = currentDate.value.getFullYear()
  return `${locale.value.months[month]} ${year}`
})

const calendarDays = computed(() => {
  const start = startOfWeek(startOfMonth(currentDate.value), { weekStartsOn: 1 })
  const end = endOfWeek(endOfMonth(currentDate.value), { weekStartsOn: 1 })
  const today = startOfDay(new Date())

  return eachDayOfInterval({ start, end }).map((date) => {
    const isPast = isBefore(startOfDay(date), today)

    const dayEvents: Array<Event & { type: 'start' | 'end' | 'middle' }> = []

    events.value.forEach((event) => {
      const eventDate = new Date(event.date)
      const startDate = event.startDate ? new Date(event.startDate) : null

      if (startDate && isSameDay(date, startDate)) {
        dayEvents.push({ ...event, type: 'start' })
      }

      if (isSameDay(date, eventDate)) {
        dayEvents.push({ ...event, type: 'end' })
      }

      if (startDate && isBefore(startDate, date) && isBefore(date, eventDate) && !isToday(date)) {
        dayEvents.push({ ...event, type: 'middle' })
      }
    })

    const hasStartEvent = dayEvents.some((event) => event.type === 'start')
    const hasEndEvent = dayEvents.some((event) => event.type === 'end')
    const hasEvent = dayEvents.length > 0

    const dayColors = [...new Set(dayEvents.map((event) => event.color))]

    return {
      date,
      dayNumber: date.getDate(),
      isCurrentMonth: isSameMonth(date, currentDate.value),
      isToday: isToday(date),
      hasEvent,
      hasStartEvent,
      hasEndEvent,
      dayColors,
      dayEvents,
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
  initLocale()
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

.locale-section {
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: flex-end;
}

.locale-toggle {
  background: rgba(255, 255, 255, 0.15);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  backdrop-filter: blur(10px);
}

.locale-toggle:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
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

  .locale-section {
    padding: 1rem;
  }

  .locale-toggle {
    font-size: 0.8rem;
    padding: 6px 12px;
  }
}

@media (max-width: 480px) {
  .calendar-main {
    padding: 0.5rem;
  }
}
</style>
