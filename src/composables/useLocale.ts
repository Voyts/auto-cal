import { ref, computed } from 'vue'
import { locales, type Locale } from '../locales'

const currentLocale = ref<Locale>('uk')

export function useLocale() {
  const locale = computed(() => locales[currentLocale.value])

  const setLocale = (newLocale: Locale) => {
    currentLocale.value = newLocale
    localStorage.setItem('calendar-locale', newLocale)
  }

  const toggleLocale = () => {
    const newLocale = currentLocale.value === 'uk' ? 'en' : 'uk'
    setLocale(newLocale)
  }

  const initLocale = () => {
    const savedLocale = localStorage.getItem('calendar-locale') as Locale
    if (savedLocale && (savedLocale === 'uk' || savedLocale === 'en')) {
      currentLocale.value = savedLocale
    }
  }

  return {
    locale,
    currentLocale: computed(() => currentLocale.value),
    setLocale,
    toggleLocale,
    initLocale,
  }
}
