<template>
  <div class="space-y-6">
    <h1 class="text-4xl font-bold text-pokemon-black">Pokémon Types</h1>

    <div v-if="loading" class="text-center py-8">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-pokemon-blue"></div>
      <p class="mt-4 text-gray-600">Loading types...</p>
    </div>

    <div v-else-if="error" class="text-center py-8">
      <p class="text-red-600">{{ error }}</p>
      <button
        @click="loadTypes"
        class="mt-4 bg-pokemon-blue text-white px-4 py-2 rounded-lg hover:bg-pokemon-blue/80 transition-colors"
      >
        Try Again
      </button>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="type in types"
        :key="type.id"
        class="pokemon-card p-6 cursor-pointer hover:scale-105 transition-transform"
        @click="selectType(type)"
      >
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-2xl font-bold capitalize">{{ type.name }}</h2>
          <div
            :class="[
              'w-12 h-12 rounded-full',
              typeStore.getTypeColor(type.name)
            ]"
          ></div>
        </div>

        <div class="space-y-3">
          <div v-if="type.damage_relations.double_damage_to.length > 0">
            <h3 class="font-semibold text-green-600">Strong Against:</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="target in type.damage_relations.double_damage_to"
                :key="target.name"
                :class="[
                  'px-2 py-1 rounded text-white text-sm',
                  typeStore.getTypeColor(target.name)
                ]"
              >
                {{ target.name }}
              </span>
            </div>
          </div>

          <div v-if="type.damage_relations.half_damage_to.length > 0">
            <h3 class="font-semibold text-yellow-600">Weak Against:</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="target in type.damage_relations.half_damage_to"
                :key="target.name"
                :class="[
                  'px-2 py-1 rounded text-white text-sm',
                  typeStore.getTypeColor(target.name)
                ]"
              >
                {{ target.name }}
              </span>
            </div>
          </div>

          <div v-if="type.damage_relations.no_damage_to.length > 0">
            <h3 class="font-semibold text-gray-600">No Effect On:</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="target in type.damage_relations.no_damage_to"
                :key="target.name"
                :class="[
                  'px-2 py-1 rounded text-white text-sm',
                  typeStore.getTypeColor(target.name)
                ]"
              >
                {{ target.name }}
              </span>
            </div>
          </div>
        </div>

        <div class="mt-4 pt-4 border-t border-gray-200">
          <div class="flex justify-between text-sm text-gray-600">
            <span>{{ type.pokemon.length }} Pokémon</span>
            <span>{{ type.moves.length }} Moves</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Type Detail Modal -->
    <div
      v-if="selectedType"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click="closeModal"
    >
      <div
        class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
        @click.stop
      >
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-3xl font-bold capitalize">{{ selectedType.name }}</h2>
          <button
            @click="closeModal"
            class="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <div class="space-y-6">
          <div>
            <h3 class="text-xl font-semibold mb-3 text-green-600">Strong Against (2x Damage)</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="target in selectedType.damage_relations.double_damage_to"
                :key="target.name"
                :class="[
                  'px-3 py-2 rounded text-white font-medium',
                  typeStore.getTypeColor(target.name)
                ]"
              >
                {{ target.name }}
              </span>
            </div>
          </div>

          <div>
            <h3 class="text-xl font-semibold mb-3 text-yellow-600">Not Very Effective (0.5x Damage)</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="target in selectedType.damage_relations.half_damage_to"
                :key="target.name"
                :class="[
                  'px-3 py-2 rounded text-white font-medium',
                  typeStore.getTypeColor(target.name)
                ]"
              >
                {{ target.name }}
              </span>
            </div>
          </div>

          <div>
            <h3 class="text-xl font-semibold mb-3 text-gray-600">No Effect (0x Damage)</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="target in selectedType.damage_relations.no_damage_to"
                :key="target.name"
                :class="[
                  'px-3 py-2 rounded text-white font-medium',
                  typeStore.getTypeColor(target.name)
                ]"
              >
                {{ target.name }}
              </span>
            </div>
          </div>

          <div>
            <h3 class="text-xl font-semibold mb-3 text-red-600">Vulnerable To (2x Damage)</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="source in selectedType.damage_relations.double_damage_from"
                :key="source.name"
                :class="[
                  'px-3 py-2 rounded text-white font-medium',
                  typeStore.getTypeColor(source.name)
                ]"
              >
                {{ source.name }}
              </span>
            </div>
          </div>

          <div>
            <h3 class="text-xl font-semibold mb-3 text-blue-600">Resistant To (0.5x Damage)</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="source in selectedType.damage_relations.half_damage_from"
                :key="source.name"
                :class="[
                  'px-3 py-2 rounded text-white font-medium',
                  typeStore.getTypeColor(source.name)
                ]"
              >
                {{ source.name }}
              </span>
            </div>
          </div>

          <div>
            <h3 class="text-xl font-semibold mb-3 text-purple-600">Immune To (0x Damage)</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="source in selectedType.damage_relations.no_damage_from"
                :key="source.name"
                :class="[
                  'px-3 py-2 rounded text-white font-medium',
                  typeStore.getTypeColor(source.name)
                ]"
              >
                {{ source.name }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useTypeStore } from '@/stores/types'
import type { Type } from '@/types'

const typeStore = useTypeStore()

const selectedType = ref<Type | null>(null)

const types = computed(() => typeStore.types)
const loading = computed(() => typeStore.loading)
const error = computed(() => typeStore.error)

const loadTypes = async () => {
  await typeStore.fetchAllTypes()
}

const selectType = (type: Type) => {
  selectedType.value = type
}

const closeModal = () => {
  selectedType.value = null
}

onMounted(() => {
  loadTypes()
})
</script>