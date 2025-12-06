import { defineStore } from 'pinia'
import { ref } from 'vue'

export type Locale = 'en' | 'zh'

export const useLanguageStore = defineStore('language', () => {
  const currentLocale = ref<Locale>('en')

  const initLocale = () => {
    // Check for saved language preference or default to English
    const savedLocale = localStorage.getItem('language') as Locale
    if (savedLocale && (savedLocale === 'en' || savedLocale === 'zh')) {
      currentLocale.value = savedLocale
    } else {
      // Check browser language preference
      const browserLang = navigator.language.toLowerCase()
      if (browserLang.startsWith('zh')) {
        currentLocale.value = 'zh'
      } else {
        currentLocale.value = 'en'
      }
    }
  }

  const setLocale = (locale: Locale) => {
    currentLocale.value = locale
    localStorage.setItem('language', locale)
  }

  const toggleLocale = () => {
    setLocale(currentLocale.value === 'en' ? 'zh' : 'en')
  }

  return {
    currentLocale,
    initLocale,
    setLocale,
    toggleLocale
  }
})