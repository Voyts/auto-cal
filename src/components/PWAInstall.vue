<template>
  <div v-if="showInstallPrompt" class="pwa-install">
    <div class="pwa-content">
      <div class="pwa-icon">📱</div>
      <div class="pwa-text">
        <h4>{{ locale.pwa.title }}</h4>
        <p>{{ locale.pwa.description }}</p>
      </div>
      <div class="pwa-actions">
        <button @click="installPWA" class="pwa-install-btn">
          {{ locale.pwa.install }}
        </button>
        <button @click="dismissPrompt" class="pwa-dismiss-btn">
          {{ locale.pwa.dismiss }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useLocale } from '../composables/useLocale'

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<{ outcome: 'accepted' | 'dismissed' }>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const { locale } = useLocale()

const showInstallPrompt = ref(false)
const deferredPrompt = ref<BeforeInstallPromptEvent | null>(null)

onMounted(() => {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt.value = e as BeforeInstallPromptEvent
    showInstallPrompt.value = true
  })
})

const installPWA = async () => {
  if (!deferredPrompt.value) return

  deferredPrompt.value.prompt()
  const { outcome } = await deferredPrompt.value.userChoice

  if (outcome === 'accepted') {
    showInstallPrompt.value = false
  }

  deferredPrompt.value = null
}

const dismissPrompt = () => {
  showInstallPrompt.value = false
}
</script>

<style scoped>
.pwa-install {
  position: fixed;
  bottom: 20px;
  left: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 1000;
}

.pwa-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.pwa-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.pwa-text {
  flex: 1;
}

.pwa-text h4 {
  margin: 0 0 0.25rem 0;
  color: #333;
  font-size: 1rem;
  font-weight: 600;
}

.pwa-text p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.pwa-actions {
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
}

.pwa-install-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pwa-install-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.pwa-dismiss-btn {
  background: rgba(0, 0, 0, 0.1);
  color: #666;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pwa-dismiss-btn:hover {
  background: rgba(0, 0, 0, 0.15);
}

@media (max-width: 768px) {
  .pwa-install {
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  .pwa-content {
    flex-direction: column;
    text-align: center;
  }

  .pwa-actions {
    width: 100%;
    justify-content: center;
  }
}
</style>
