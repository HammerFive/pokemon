import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import { i18n } from './i18n'
import { useThemeStore } from './stores/theme'
import { useLanguageStore } from './stores/language'
import App from './App.vue'
import './assets/css/main.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(i18n)

app.mount('#app')

// Initialize theme and language
const themeStore = useThemeStore()
const languageStore = useLanguageStore()

themeStore.initTheme()
languageStore.initLocale()

// Set i18n locale based on store
i18n.global.locale.value = languageStore.currentLocale