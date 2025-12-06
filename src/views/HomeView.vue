<template>
  <div class="space-y-8">
    <div class="text-center">
      <h1 class="text-5xl font-bold text-pokemon-black mb-4 dark:text-white">
        {{ t('home.title') }}
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        {{ t('home.subtitle') }}
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
      <div class="pokemon-card p-6 text-center">
        <div class="text-4xl mb-4">🎮</div>
        <h3 class="text-xl font-semibold mb-2">{{ t('home.features.pokemon.title') }}</h3>
        <p class="text-gray-600 dark:text-gray-300 mb-4">{{ t('home.features.pokemon.description') }}</p>
        <RouterLink
          to="/pokemon"
          class="inline-block bg-pokemon-blue text-white px-4 py-2 rounded-lg hover:bg-pokemon-blue/80 transition-colors"
        >
          {{ t('home.features.pokemon.button') }}
        </RouterLink>
      </div>

      <div class="pokemon-card p-6 text-center">
        <div class="text-4xl mb-4">⚔️</div>
        <h3 class="text-xl font-semibold mb-2">{{ t('home.features.types.title') }}</h3>
        <p class="text-gray-600 dark:text-gray-300 mb-4">{{ t('home.features.types.description') }}</p>
        <RouterLink
          to="/types"
          class="inline-block bg-pokemon-grass text-white px-4 py-2 rounded-lg hover:bg-pokemon-grass/80 transition-colors"
        >
          {{ t('home.features.types.button') }}
        </RouterLink>
      </div>

      <div class="pokemon-card p-6 text-center">
        <div class="text-4xl mb-4">✨</div>
        <h3 class="text-xl font-semibold mb-2">{{ t('home.features.abilities.title') }}</h3>
        <p class="text-gray-600 dark:text-gray-300 mb-4">{{ t('home.features.abilities.description') }}</p>
        <RouterLink
          to="/abilities"
          class="inline-block bg-pokemon-psychic text-white px-4 py-2 rounded-lg hover:bg-pokemon-psychic/80 transition-colors"
        >
          {{ t('home.features.abilities.button') }}
        </RouterLink>
      </div>

      <div class="pokemon-card p-6 text-center">
        <div class="text-4xl mb-4">📊</div>
        <h3 class="text-xl font-semibold mb-2">{{ t('home.features.stats.title') }}</h3>
        <p class="text-gray-600 dark:text-gray-300 mb-4">{{ t('home.features.stats.description') }}</p>
        <RouterLink
          to="/pokemon"
          class="inline-block bg-pokemon-fire text-white px-4 py-2 rounded-lg hover:bg-pokemon-fire/80 transition-colors"
        >
          {{ t('home.features.stats.button') }}
        </RouterLink>
      </div>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mt-12">
      <h2 class="text-3xl font-bold text-center mb-6 dark:text-white">{{ t('home.quickStats.title') }}</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div>
          <div class="text-3xl font-bold text-pokemon-red">{{ totalPokemon }}</div>
          <div class="text-gray-600 dark:text-gray-300">{{ t('home.quickStats.totalPokemon') }}</div>
        </div>
        <div>
          <div class="text-3xl font-bold text-pokemon-grass">{{ totalTypes }}</div>
          <div class="text-gray-600 dark:text-gray-300">{{ t('home.quickStats.types') }}</div>
        </div>
        <div>
          <div class="text-3xl font-bold text-pokemon-water">{{ totalGenerations }}</div>
          <div class="text-gray-600 dark:text-gray-300">{{ t('home.quickStats.generations') }}</div>
        </div>
        <div>
          <div class="text-3xl font-bold text-pokemon-yellow">{{ totalAbilities }}</div>
          <div class="text-gray-600 dark:text-gray-300">{{ t('home.quickStats.abilities') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePokemonStore } from '@/stores/pokemon'
import { useI18n } from 'vue-i18n'

const pokemonStore = usePokemonStore()
const { t } = useI18n()

const totalPokemon = ref(0)
const totalTypes = ref(18)
const totalGenerations = ref(9)
const totalAbilities = ref(0)

onMounted(async () => {
  try {
    const count = await pokemonStore.fetchPokemonCount()
    totalPokemon.value = count
    totalAbilities.value = 368 // Approximate number of abilities
  } catch (error) {
    console.error('Failed to fetch Pokémon count:', error)
    totalPokemon.value = 1010 // Fallback to known count
  }
})
</script>