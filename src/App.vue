<script setup lang="ts">
import Calendar from './components/Calendar.vue'
</script>

<template>
  <Calendar />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  overflow: hidden;
}

body {
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    sans-serif;
  background: #f5f5f5;
}

#app {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

@media (max-width: 768px) {
  html,
  body {
    height: auto;
    min-height: 100vh;
    overflow: visible;
  }

  #app {
    height: auto;
    min-height: 100vh;
    overflow: visible;
  }
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: rgba(102, 126, 234, 0.5);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(102, 126, 234, 0.7);
}
</style>
