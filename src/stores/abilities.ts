import { defineStore } from 'pinia'
import { ref } from 'vue'
import { abilityService } from '@/services'
import type { Ability } from '@/types'

export const useAbilityStore = defineStore('abilities', () => {
  const abilities = ref<Ability[]>([])
  const currentAbility = ref<Ability | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const count = ref(0)

  const fetchAbilityList = async (limit = 20, offset = 0) => {
    loading.value = true
    error.value = null

    try {
      const response = await abilityService.getAbilityList(limit, offset)
      count.value = response.count

      const abilityPromises = response.results.map(ability =>
        abilityService.getAbilityByNameOrId(ability.name)
      )
      const abilityDetails = await Promise.all(abilityPromises)
      abilities.value = abilityDetails
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch abilities'
      console.error('Error fetching abilities:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchAbilityByNameOrId = async (nameOrId: string | number) => {
    loading.value = true
    error.value = null

    try {
      const ability = await abilityService.getAbilityByNameOrId(nameOrId)
      currentAbility.value = ability
      return ability
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch ability'
      console.error('Error fetching ability:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const searchAbilities = async (query: string) => {
    loading.value = true
    error.value = null

    try {
      const results = await abilityService.searchAbilities(query)
      return results
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Search failed'
      console.error('Error searching abilities:', err)
      return []
    } finally {
      loading.value = false
    }
  }

  return {
    abilities,
    currentAbility,
    loading,
    error,
    count,
    fetchAbilityList,
    fetchAbilityByNameOrId,
    searchAbilities
  }
})