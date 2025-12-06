<template>
  <div v-if="loading" class="text-center py-8">
    <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-pokemon-blue"></div>
    <p class="mt-4 text-gray-600">Loading Pokémon details...</p>
  </div>

  <div v-else-if="error" class="text-center py-8">
    <p class="text-red-600">{{ error }}</p>
    <button
      @click="loadPokemon"
      class="mt-4 bg-pokemon-blue text-white px-4 py-2 rounded-lg hover:bg-pokemon-blue/80 transition-colors"
    >
      Try Again
    </button>
  </div>

  <div v-else-if="pokemon" class="space-y-6">
    <div class="flex items-center space-x-4 mb-6">
      <button
        @click="goBack"
        class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
      >
        ← Back
      </button>
      <h1 class="text-4xl font-bold capitalize text-pokemon-black">{{ pokemon.name }}</h1>
      <div class="bg-pokemon-black text-white px-3 py-1 rounded-full text-lg font-bold">
        #{{ String(pokemon.id).padStart(3, '0') }}
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div class="space-y-6">
        <div class="pokemon-card p-6">
          <img
            :src="pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default"
            :alt="pokemon.name"
            class="w-full h-80 object-contain bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4"
          />

          <div class="flex justify-center space-x-4">
            <img
              :src="pokemon.sprites.front_default"
              :alt="`${pokemon.name} front`"
              class="w-24 h-24 object-contain bg-gray-100 rounded"
            />
            <img
              :src="pokemon.sprites.back_default"
              :alt="`${pokemon.name} back`"
              class="w-24 h-24 object-contain bg-gray-100 rounded"
            />
            <img
              :src="pokemon.sprites.front_shiny"
              :alt="`${pokemon.name} shiny front`"
              class="w-24 h-24 object-contain bg-gray-100 rounded"
            />
            <img
              :src="pokemon.sprites.back_shiny"
              :alt="`${pokemon.name} shiny back`"
              class="w-24 h-24 object-contain bg-gray-100 rounded"
            />
          </div>
        </div>

        <div class="pokemon-card p-6">
          <h2 class="text-2xl font-bold mb-4">Information</h2>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <span class="font-semibold">Height:</span> {{ pokemon.height / 10 }}m
            </div>
            <div>
              <span class="font-semibold">Weight:</span> {{ pokemon.weight / 10 }}kg
            </div>
            <div>
              <span class="font-semibold">Base Experience:</span> {{ pokemon.base_experience || 'N/A' }}
            </div>
            <div>
              <span class="font-semibold">Generation:</span> {{ species?.generation.name.toUpperCase() || 'N/A' }}
            </div>
          </div>

          <div class="mt-4">
            <span class="font-semibold">Types:</span>
            <div class="flex space-x-2 mt-2">
              <span
                v-for="type in pokemon.types"
                :key="type.type.name"
                :class="[
                  'pokemon-type-badge',
                  typeStore.getTypeColor(type.type.name)
                ]"
              >
                {{ type.type.name }}
              </span>
            </div>
          </div>

          <div v-if="species" class="mt-4">
            <span class="font-semibold">Habitat:</span> {{ species.habitat?.name || 'Unknown' }}
          </div>

          <div v-if="species" class="mt-4">
            <span class="font-semibold">Growth Rate:</span> {{ species.growth_rate.name.replace('-', ' ') }}
          </div>

          <div v-if="species" class="mt-4">
            <span class="font-semibold">Legendary:</span>
            <span :class="species.is_legendary ? 'text-pokemon-red' : 'text-gray-600'">
              {{ species.is_legendary ? 'Yes' : 'No' }}
            </span>
          </div>

          <div v-if="species" class="mt-4">
            <span class="font-semibold">Mythical:</span>
            <span :class="species.is_mythical ? 'text-pokemon-red' : 'text-gray-600'">
              {{ species.is_mythical ? 'Yes' : 'No' }}
            </span>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <div class="pokemon-card p-6">
          <h2 class="text-2xl font-bold mb-4">Base Stats</h2>
          <div class="space-y-3">
            <div
              v-for="stat in pokemon.stats"
              :key="stat.stat.name"
              class="flex items-center space-x-3"
            >
              <span class="text-sm font-medium w-24 capitalize">{{ formatStatName(stat.stat.name) }}</span>
              <span class="text-sm font-bold w-8 text-right">{{ stat.base_stat }}</span>
              <div class="stat-bar flex-1">
                <div
                  class="stat-fill"
                  :class="getStatColor(stat.base_stat)"
                  :style="{ width: `${(stat.base_stat / 255) * 100}%` }"
                ></div>
              </div>
            </div>
          </div>
          <div class="mt-4 pt-4 border-t border-gray-200">
            <div class="flex justify-between">
              <span class="font-semibold">Total Stats:</span>
              <span class="font-bold">{{ getTotalStats(pokemon.stats) }}</span>
            </div>
          </div>
        </div>

        <div class="pokemon-card p-6">
          <h2 class="text-2xl font-bold mb-4">Abilities</h2>
          <div class="space-y-2">
            <div
              v-for="ability in pokemon.abilities"
              :key="ability.ability.name"
              class="flex items-center justify-between p-2 bg-gray-50 rounded"
            >
              <span class="capitalize font-medium">{{ ability.ability.name.replace('-', ' ') }}</span>
              <span
                v-if="ability.is_hidden"
                class="text-xs bg-pokemon-yellow text-pokemon-black px-2 py-1 rounded-full font-semibold"
              >
                Hidden
              </span>
            </div>
          </div>
        </div>

        <div class="pokemon-card p-6">
          <h2 class="text-2xl font-bold mb-4">Description</h2>
          <p class="text-gray-700 leading-relaxed">
            {{ getDescription(species) }}
          </p>
        </div>

        <div class="pokemon-card p-6">
          <h2 class="text-2xl font-bold mb-4">Evolution Chain</h2>
          <div class="text-center text-gray-500">
            <p>Evolution chain feature coming soon!</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePokemonStore } from '@/stores/pokemon'
import { useTypeStore } from '@/stores/types'
import type { Pokemon, PokemonSpecies } from '@/types'

const route = useRoute()
const router = useRouter()
const pokemonStore = usePokemonStore()
const typeStore = useTypeStore()

const pokemon = computed(() => pokemonStore.currentPokemon)
const species = computed(() => pokemonStore.currentSpecies)
const loading = computed(() => pokemonStore.loading)
const error = computed(() => pokemonStore.error)

const formatStatName = (name: string) => {
  const names: Record<string, string> = {
    'hp': 'HP',
    'attack': 'Attack',
    'defense': 'Defense',
    'special-attack': 'Sp. Atk',
    'special-defense': 'Sp. Def',
    'speed': 'Speed'
  }
  return names[name] || name.replace('-', ' ')
}

const getStatColor = (value: number) => {
  if (value >= 150) return 'bg-pokemon-red'
  if (value >= 110) return 'bg-orange-500'
  if (value >= 80) return 'bg-pokemon-yellow'
  if (value >= 50) return 'bg-pokemon-grass'
  return 'bg-gray-400'
}

const getTotalStats = (stats: Pokemon['stats']) => {
  return stats.reduce((total, stat) => total + stat.base_stat, 0)
}

const getDescription = (species: PokemonSpecies | null) => {
  if (!species) return 'No description available.'

  const englishEntry = species.flavor_text_entries.find(
    entry => entry.language.name === 'en'
  )

  return englishEntry
    ? englishEntry.flavor_text.replace(/\n|\f/g, ' ')
    : 'No description available.'
}

const loadPokemon = async () => {
  const id = route.params.id
  if (id) {
    try {
      await pokemonStore.fetchPokemonByNameOrId(id as string)
    } catch (err) {
      console.error('Failed to load Pokémon:', err)
    }
  }
}

const goBack = () => {
  router.push('/pokemon')
}

onMounted(() => {
  loadPokemon()
})
</script>