import { defineStore } from 'pinia'
import { ref } from 'vue'
import { typeService } from '@/services'
import type { Type } from '@/types'

export const useTypeStore = defineStore('types', () => {
  const types = ref<Type[]>([])
  const currentType = ref<Type | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchAllTypes = async () => {
    loading.value = true
    error.value = null

    try {
      types.value = await typeService.getAllTypes()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch types'
      console.error('Error fetching types:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchTypeByNameOrId = async (nameOrId: string | number) => {
    loading.value = true
    error.value = null

    try {
      const type = await typeService.getTypeByNameOrId(nameOrId)
      currentType.value = type
      return type
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch type'
      console.error('Error fetching type:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const getTypeColor = (typeName: string): string => {
    const colors: Record<string, string> = {
      normal: 'bg-pokemon-normal',
      fire: 'bg-pokemon-fire',
      water: 'bg-pokemon-water',
      electric: 'bg-pokemon-electric',
      grass: 'bg-pokemon-grass',
      ice: 'bg-pokemon-ice',
      fighting: 'bg-pokemon-fighting',
      poison: 'bg-pokemon-poison',
      ground: 'bg-pokemon-ground',
      flying: 'bg-pokemon-flying',
      psychic: 'bg-pokemon-psychic',
      bug: 'bg-pokemon-bug',
      rock: 'bg-pokemon-rock',
      ghost: 'bg-pokemon-ghost',
      dragon: 'bg-pokemon-dragon',
      dark: 'bg-pokemon-dark',
      steel: 'bg-pokemon-steel',
      fairy: 'bg-pokemon-fairy'
    }
    return colors[typeName] || 'bg-gray-500'
  }

  return {
    types,
    currentType,
    loading,
    error,
    fetchAllTypes,
    fetchTypeByNameOrId,
    getTypeColor
  }
})