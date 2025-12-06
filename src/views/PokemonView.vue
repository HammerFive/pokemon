<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-4xl font-bold text-pokemon-black">Pokémon</h1>
      <div class="flex items-center space-x-4">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search Pokémon..."
          class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pokemon-blue"
          @keyup.enter="handleSearch"
        />
        <button
          @click="handleSearch"
          class="bg-pokemon-blue text-white px-4 py-2 rounded-lg hover:bg-pokemon-blue/80 transition-colors"
        >
          Search
        </button>
      </div>
    </div>

    <div class="flex justify-between items-center">
      <div class="flex space-x-2">
        <button
          v-for="limit in [20, 50, 100]"
          :key="limit"
          @click="changeLimit(limit)"
          :class="[
            'px-3 py-1 rounded transition-colors',
            currentLimit === limit
              ? 'bg-pokemon-blue text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          ]"
        >
          {{ limit }}
        </button>
      </div>
      <div class="text-gray-600">
        Showing {{ pokemonList.length }} of {{ pokemonStore.count }} Pokémon
      </div>
    </div>

    <div v-if="loading" class="text-center py-8">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-pokemon-blue"></div>
      <p class="mt-4 text-gray-600">Loading Pokémon...</p>
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

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div
        v-for="pokemon in pokemonList"
        :key="pokemon.id"
        class="pokemon-card cursor-pointer"
        @click="goToPokemonDetail(pokemon.id)"
      >
        <div class="relative">
          <img
            :src="pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default"
            :alt="pokemon.name"
            class="w-full h-48 object-contain bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg"
            loading="lazy"
          />
          <div class="absolute top-2 right-2 bg-pokemon-black text-white px-2 py-1 rounded-full text-sm font-bold">
            #{{ String(pokemon.id).padStart(3, '0') }}
          </div>
        </div>

        <div class="p-4">
          <h3 class="text-xl font-bold capitalize text-center mb-3">{{ pokemon.name }}</h3>

          <div class="flex justify-center space-x-2 mb-3">
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

          <div class="space-y-2">
            <div
              v-for="stat in getMainStats(pokemon.stats)"
              :key="stat.stat.name"
              class="flex items-center space-x-2"
            >
              <span class="text-sm font-medium w-16 capitalize">{{ stat.stat.name }}</span>
              <div class="stat-bar flex-1">
                <div
                  class="stat-fill"
                  :class="getStatColor(stat.base_stat)"
                  :style="{ width: `${(stat.base_stat / 255) * 100}%` }"
                ></div>
              </div>
              <span class="text-sm font-bold w-10 text-right">{{ stat.base_stat }}</span>
            </div>
          </div>

          <div class="mt-4 pt-3 border-t border-gray-200 flex justify-between text-sm text-gray-600">
            <div class="text-center">
              <div class="font-bold">{{ pokemon.height / 10 }}m</div>
              <div class="text-xs">Height</div>
            </div>
            <div class="text-center">
              <div class="font-bold">{{ pokemon.weight / 10 }}kg</div>
              <div class="text-xs">Weight</div>
            </div>
            <div class="text-center">
              <div class="font-bold">{{ pokemon.base_experience || 'N/A' }}</div>
              <div class="text-xs">Exp</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center space-x-4">
      <button
        @click="previousPage"
        :disabled="currentPage === 1"
        class="px-4 py-2 bg-pokemon-blue text-white rounded-lg hover:bg-pokemon-blue/80 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <span class="py-2 px-4">
        Page {{ currentPage }} of {{ Math.ceil(pokemonStore.count / currentLimit) }}
      </span>
      <button
        @click="nextPage"
        :disabled="currentPage >= Math.ceil(pokemonStore.count / currentLimit)"
        class="px-4 py-2 bg-pokemon-blue text-white rounded-lg hover:bg-pokemon-blue/80 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePokemonStore } from '@/stores/pokemon'
import { useTypeStore } from '@/stores/types'
import type { Pokemon } from '@/types'

const router = useRouter()
const pokemonStore = usePokemonStore()
const typeStore = useTypeStore()

const searchQuery = ref('')
const currentLimit = ref(20)
const currentPage = ref(1)

const pokemonList = computed(() => pokemonStore.pokemonList)
const loading = computed(() => pokemonStore.loading)
const error = computed(() => pokemonStore.error)

const getMainStats = (stats: Pokemon['stats']) => {
  return stats.slice(0, 4) // HP, Attack, Defense, Special Attack
}

const getStatColor = (value: number) => {
  if (value >= 150) return 'bg-pokemon-red'
  if (value >= 110) return 'bg-orange-500'
  if (value >= 80) return 'bg-pokemon-yellow'
  if (value >= 50) return 'bg-pokemon-grass'
  return 'bg-gray-400'
}

const loadPokemon = async () => {
  const offset = (currentPage.value - 1) * currentLimit.value
  await pokemonStore.fetchPokemonList(currentLimit.value, offset)
}

const changeLimit = (limit: number) => {
  currentLimit.value = limit
  currentPage.value = 1
  loadPokemon()
}

const handleSearch = async () => {
  if (!searchQuery.value.trim()) {
    loadPokemon()
    return
  }

  try {
    const results = await pokemonStore.searchPokemon(searchQuery.value)
    if (results.length > 0) {
      pokemonList.value = results
    } else {
      error.value = 'No Pokémon found'
    }
  } catch (err) {
    console.error('Search error:', err)
  }
}

const goToPokemonDetail = (id: number) => {
  router.push(`/pokemon/${id}`)
}

const nextPage = () => {
  if (currentPage.value < Math.ceil(pokemonStore.count / currentLimit.value)) {
    currentPage.value++
    loadPokemon()
  }
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    loadPokemon()
  }
}

onMounted(() => {
  loadPokemon()
})
</script>