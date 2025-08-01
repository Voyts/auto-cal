<template>
  <div class="calendar-grid">
    <div class="weekdays">
      <div v-for="day in weekdays" :key="day" class="weekday">{{ day }}</div>
    </div>

    <div class="days-grid">
      <div
        v-for="day in calendarDays"
        :key="day.date.toISOString()"
        :class="[
          'day',
          {
            'other-month': !day.isCurrentMonth,
            today: day.isToday,
            'has-event': day.hasEvent,
            selected: day.isSelected,
            'past-day': day.isPastDay,
          },
        ]"
        @click="$emit('selectDay', day)"
      >
        <span class="day-number">{{ day.dayNumber }}</span>
        <div v-if="day.hasEvent" class="event-indicator"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'CalendarGrid',
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

defineProps<{
  calendarDays: CalendarDay[]
}>()

defineEmits<{
  selectDay: [day: CalendarDay]
}>()

const weekdays = ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
</script>

<style scoped>
.calendar-grid {
  flex: 1;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  flex-shrink: 0;
}

.weekday {
  padding: 0.75rem;
  text-align: center;
  font-weight: 600;
  font-size: 0.85rem;
}

.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: minmax(50px, 1fr);
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  gap: 0;
}

.day {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.05);
  min-height: 50px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  flex-shrink: 0;
  transform-origin: center;
}

.day:hover {
  background: rgba(102, 126, 234, 0.1);
}

.day.other-month {
  color: #ccc;
}

.day.today {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 600;
}

.day.has-event {
  background: rgba(255, 193, 7, 0.2);
}

.day.selected {
  background: rgba(102, 126, 234, 0.3);
  border: 2px solid #667eea;
}

.day.past-day {
  background: rgba(255, 71, 87, 0.1);
  color: #ff4757;
}

.day-number {
  font-size: 1rem;
  font-weight: 500;
  z-index: 2;
  position: relative;
}

.event-indicator {
  width: 6px;
  height: 6px;
  background: #ffc107;
  border-radius: 50%;
  position: absolute;
  bottom: 8px;
  z-index: 3;
}

.days-grid::-webkit-scrollbar {
  width: 6px;
}

.days-grid::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.days-grid::-webkit-scrollbar-thumb {
  background: rgba(102, 126, 234, 0.5);
  border-radius: 3px;
}

.days-grid::-webkit-scrollbar-thumb:hover {
  background: rgba(102, 126, 234, 0.7);
}

@media (max-width: 768px) {
  .day {
    min-height: 50px;
  }

  .day-number {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .day {
    min-height: 40px;
  }

  .day-number {
    font-size: 0.9rem;
  }

  .weekday {
    padding: 0.75rem 0.5rem;
    font-size: 0.8rem;
  }
}
</style>
