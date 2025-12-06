import { defineStore } from 'pinia'
import { ref } from 'vue'
import { pokemonService } from '@/services'
import type { Pokemon, PokemonSpecies } from '@/types'

export const usePokemonStore = defineStore('pokemon', () => {
  const pokemonList = ref<Pokemon[]>([])
  const currentPokemon = ref<Pokemon | null>(null)
  const currentSpecies = ref<PokemonSpecies | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const count = ref(0)

  const fetchPokemonList = async (limit = 20, offset = 0) => {
    loading.value = true
    error.value = null

    try {
      const response = await pokemonService.getPokemonList(limit, offset)
      count.value = response.count

      const pokemonPromises = response.results.map(p =>
        pokemonService.getPokemonByNameOrId(p.name)
      )
      const pokemonDetails = await Promise.all(pokemonPromises)
      pokemonList.value = pokemonDetails
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch Pokémon list'
      console.error('Error fetching Pokémon list:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchPokemonByNameOrId = async (nameOrId: string | number) => {
    loading.value = true
    error.value = null

    try {
      const [pokemon, species] = await Promise.all([
        pokemonService.getPokemonByNameOrId(nameOrId),
        pokemonService.getPokemonSpecies(nameOrId)
      ])
      currentPokemon.value = pokemon
      currentSpecies.value = species
      return pokemon
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch Pokémon'
      console.error('Error fetching Pokémon:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const searchPokemon = async (query: string) => {
    loading.value = true
    error.value = null

    try {
      const results = await pokemonService.searchPokemon(query)
      return results
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Search failed'
      console.error('Error searching Pokémon:', err)
      return []
    } finally {
      loading.value = false
    }
  }

  const fetchPokemonCount = async () => {
    try {
      count.value = await pokemonService.getPokemonCount()
      return count.value
    } catch (err) {
      console.error('Error fetching Pokémon count:', err)
      return 1010 // Fallback count
    }
  }

  const clearCurrentPokemon = () => {
    currentPokemon.value = null
    currentSpecies.value = null
  }

  return {
    pokemonList,
    currentPokemon,
    currentSpecies,
    loading,
    error,
    count,
    fetchPokemonList,
    fetchPokemonByNameOrId,
    searchPokemon,
    fetchPokemonCount,
    clearCurrentPokemon
  }
})