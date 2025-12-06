<template>
  <button
    @click="toggleLanguage"
    :title="t('language.switchTo', { language: nextLanguageName })"
    class="p-2 rounded-lg transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 font-medium"
  >
    <span class="text-lg">
      {{ currentLanguage === 'en' ? '🇺🇸' : '🇨🇳' }}
    </span>
    <span class="ml-1 hidden sm:inline">
      {{ nextLanguageName }}
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useLanguageStore } from '@/stores/language'
import { useI18n } from 'vue-i18n'

const languageStore = useLanguageStore()
const { t, locale } = useI18n()

const currentLanguage = computed(() => languageStore.currentLocale)
const nextLanguageName = computed(() => currentLanguage.value === 'en' ? '中文' : 'English')

const toggleLanguage = () => {
  const newLocale = currentLanguage.value === 'en' ? 'zh' : 'en'
  languageStore.setLocale(newLocale)
  locale.value = newLocale
}
</script>