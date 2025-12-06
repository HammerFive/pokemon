<template>
  <div id="app" class="min-h-screen">
    <header class="bg-pokemon-red text-white shadow-lg">
      <div class="container mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-pokemon-yellow rounded-full flex items-center justify-center">
              <span class="text-pokemon-black font-bold text-xl">Pk</span>
            </div>
            <h1 class="text-3xl font-bold">Pokémon Features</h1>
          </div>
          <nav class="hidden md:flex space-x-6">
            <RouterLink
              to="/"
              class="hover:text-pokemon-yellow transition-colors"
              active-class="text-pokemon-yellow"
            >
              {{ t('nav.home') }}
            </RouterLink>
            <RouterLink
              to="/pokemon"
              class="hover:text-pokemon-yellow transition-colors"
              active-class="text-pokemon-yellow"
            >
              {{ t('nav.pokemon') }}
            </RouterLink>
            <RouterLink
              to="/types"
              class="hover:text-pokemon-yellow transition-colors"
              active-class="text-pokemon-yellow"
            >
              {{ t('nav.types') }}
            </RouterLink>
            <RouterLink
              to="/abilities"
              class="hover:text-pokemon-yellow transition-colors"
              active-class="text-pokemon-yellow"
            >
              {{ t('nav.abilities') }}
            </RouterLink>
          </nav>
          <div class="flex items-center space-x-2">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </div>
        <!-- Mobile navigation -->
        <nav class="md:hidden flex space-x-4 mt-4 justify-center">
          <RouterLink
            to="/"
            class="hover:text-pokemon-yellow transition-colors text-sm"
            active-class="text-pokemon-yellow"
          >
            {{ t('nav.home') }}
          </RouterLink>
          <RouterLink
            to="/pokemon"
            class="hover:text-pokemon-yellow transition-colors text-sm"
            active-class="text-pokemon-yellow"
          >
            {{ t('nav.pokemon') }}
          </RouterLink>
          <RouterLink
            to="/types"
            class="hover:text-pokemon-yellow transition-colors text-sm"
            active-class="text-pokemon-yellow"
          >
            {{ t('nav.types') }}
          </RouterLink>
          <RouterLink
            to="/abilities"
            class="hover:text-pokemon-yellow transition-colors text-sm"
            active-class="text-pokemon-yellow"
          >
            {{ t('nav.abilities') }}
          </RouterLink>
        </nav>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8">
      <RouterView />
    </main>

    <footer class="bg-pokemon-black text-white py-6 mt-auto">
      <div class="container mx-auto px-4 text-center">
        <p>&copy; 2025 Pokémon Features. Not affiliated with The Pokémon Company.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useI18n } from 'vue-i18n'
import ThemeToggle from '@/components/ThemeToggle.vue'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'

const { t } = useI18n()
</script>