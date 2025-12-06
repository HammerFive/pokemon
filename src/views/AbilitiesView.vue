<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-4xl font-bold text-pokemon-black">Pokémon Abilities</h1>
      <div class="flex items-center space-x-4">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search abilities..."
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
        Showing {{ abilities.length }} of {{ abilityStore.count }} abilities
      </div>
    </div>

    <div v-if="loading" class="text-center py-8">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-pokemon-blue"></div>
      <p class="mt-4 text-gray-600">Loading abilities...</p>
    </div>

    <div v-else-if="error" class="text-center py-8">
      <p class="text-red-600">{{ error }}</p>
      <button
        @click="loadAbilities"
        class="mt-4 bg-pokemon-blue text-white px-4 py-2 rounded-lg hover:bg-pokemon-blue/80 transition-colors"
      >
        Try Again
      </button>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="ability in abilities"
        :key="ability.id"
        class="pokemon-card p-6 hover:scale-105 transition-transform"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-bold capitalize">{{ ability.name.replace('-', ' ') }}</h3>
          <div class="bg-pokemon-black text-white px-2 py-1 rounded-full text-sm font-bold">
            #{{ ability.id }}
          </div>
        </div>

        <p class="text-gray-700 mb-4">
          {{ getShortEffect(ability) }}
        </p>

        <div class="space-y-2 mb-4">
          <div class="flex items-center space-x-2">
            <span class="font-semibold">Generation:</span>
            <span class="capitalize">{{ ability.generation.name.replace('-', ' ') }}</span>
          </div>
          <div class="flex items-center space-x-2">
            <span class="font-semibold">Main Series:</span>
            <span :class="ability.is_main_series ? 'text-green-600' : 'text-red-600'">
              {{ ability.is_main_series ? 'Yes' : 'No' }}
            </span>
          </div>
        </div>

        <div class="mb-4">
          <h4 class="font-semibold mb-2">Used by {{ ability.pokemon.length }} Pokémon:</h4>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="(pokemon, index) in ability.pokemon.slice(0, 6)"
              :key="pokemon.pokemon.name"
              class="px-2 py-1 bg-gray-100 rounded text-sm capitalize"
            >
              {{ pokemon.pokemon.name }}
              <span v-if="pokemon.is_hidden" class="text-xs text-purple-600">(H)</span>
            </span>
            <span
              v-if="ability.pokemon.length > 6"
              class="px-2 py-1 bg-gray-200 rounded text-sm"
            >
              +{{ ability.pokemon.length - 6 }} more
            </span>
          </div>
        </div>

        <button
          @click="selectAbility(ability)"
          class="w-full bg-pokemon-blue text-white px-4 py-2 rounded-lg hover:bg-pokemon-blue/80 transition-colors"
        >
          View Details
        </button>
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
        Page {{ currentPage }} of {{ Math.ceil(abilityStore.count / currentLimit) }}
      </span>
      <button
        @click="nextPage"
        :disabled="currentPage >= Math.ceil(abilityStore.count / currentLimit)"
        class="px-4 py-2 bg-pokemon-blue text-white rounded-lg hover:bg-pokemon-blue/80 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>

    <!-- Ability Detail Modal -->
    <div
      v-if="selectedAbility"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click="closeModal"
    >
      <div
        class="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6"
        @click.stop
      >
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-3xl font-bold capitalize">{{ selectedAbility.name.replace('-', ' ') }}</h2>
          <button
            @click="closeModal"
            class="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-3">Effect</h3>
            <p class="text-gray-700 leading-relaxed">
              {{ getFullEffect(selectedAbility) }}
            </p>
          </div>

          <div>
            <h3 class="text-xl font-semibold mb-3">Short Effect</h3>
            <p class="text-gray-700">
              {{ getShortEffect(selectedAbility) }}
            </p>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <span class="font-semibold">Generation:</span>
              <span class="ml-2 capitalize">{{ selectedAbility.generation.name.replace('-', ' ') }}</span>
            </div>
            <div>
              <span class="font-semibold">Main Series:</span>
              <span class="ml-2" :class="selectedAbility.is_main_series ? 'text-green-600' : 'text-red-600'">
                {{ selectedAbility.is_main_series ? 'Yes' : 'No' }}
              </span>
            </div>
          </div>

          <div>
            <h3 class="text-xl font-semibold mb-3">Pokémon with this Ability ({{ selectedAbility.pokemon.length }})</h3>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-60 overflow-y-auto">
              <div
                v-for="pokemon in selectedAbility.pokemon"
                :key="pokemon.pokemon.name"
                class="flex items-center justify-between p-2 bg-gray-50 rounded"
              >
                <span class="capitalize">{{ pokemon.pokemon.name }}</span>
                <span
                  v-if="pokemon.is_hidden"
                  class="text-xs bg-pokemon-yellow text-pokemon-black px-2 py-1 rounded-full font-semibold"
                >
                  Hidden
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-xl font-semibold mb-3">Flavor Text</h3>
            <div class="space-y-2 max-h-40 overflow-y-auto">
              <div
                v-for="flavor in getEnglishFlavorText(selectedAbility)"
                :key="flavor.flavor_text"
                class="p-3 bg-gray-50 rounded"
              >
                <p class="text-gray-700">{{ flavor.flavor_text }}</p>
                <p class="text-sm text-gray-500 mt-1 capitalize">
                  {{ flavor.version.name.replace('-', ' ') }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAbilityStore } from '@/stores/abilities'
import type { Ability } from '@/types'

const abilityStore = useAbilityStore()

const searchQuery = ref('')
const currentLimit = ref(20)
const currentPage = ref(1)
const selectedAbility = ref<Ability | null>(null)

const abilities = computed(() => abilityStore.abilities)
const loading = computed(() => abilityStore.loading)
const error = computed(() => abilityStore.error)

const getShortEffect = (ability: Ability) => {
  const shortEffect = ability.effect_entries.find(
    entry => entry.language.name === 'en'
  )?.short_effect

  return shortEffect || 'No short effect available.'
}

const getFullEffect = (ability: Ability) => {
  const fullEffect = ability.effect_entries.find(
    entry => entry.language.name === 'en'
  )?.effect

  return fullEffect || 'No effect description available.'
}

const getEnglishFlavorText = (ability: Ability) => {
  return ability.flavor_text_entries.filter(
    entry => entry.language.name === 'en'
  )
}

const loadAbilities = async () => {
  const offset = (currentPage.value - 1) * currentLimit.value
  await abilityStore.fetchAbilityList(currentLimit.value, offset)
}

const changeLimit = (limit: number) => {
  currentLimit.value = limit
  currentPage.value = 1
  loadAbilities()
}

const handleSearch = async () => {
  if (!searchQuery.value.trim()) {
    loadAbilities()
    return
  }

  try {
    const results = await abilityStore.searchAbilities(searchQuery.value)
    if (results.length > 0) {
      abilities.value = results
    } else {
      error.value = 'No abilities found'
    }
  } catch (err) {
    console.error('Search error:', err)
  }
}

const selectAbility = (ability: Ability) => {
  selectedAbility.value = ability
}

const closeModal = () => {
  selectedAbility.value = null
}

const nextPage = () => {
  if (currentPage.value < Math.ceil(abilityStore.count / currentLimit.value)) {
    currentPage.value++
    loadAbilities()
  }
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    loadAbilities()
  }
}

onMounted(() => {
  loadAbilities()
})
</script>