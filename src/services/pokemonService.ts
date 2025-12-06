import axios from 'axios'
import type { Pokemon, PokemonListResponse, PokemonSpecies } from '@/types'

const API_BASE_URL = 'https://pokeapi.co/api/v2'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000
})

export const pokemonService = {
  async getPokemonList(limit = 20, offset = 0): Promise<PokemonListResponse> {
    const response = await api.get(`/pokemon?limit=${limit}&offset=${offset}`)
    return response.data
  },

  async getPokemonByNameOrId(nameOrId: string | number): Promise<Pokemon> {
    const response = await api.get(`/pokemon/${nameOrId}`)
    return response.data
  },

  async getPokemonSpecies(nameOrId: string | number): Promise<PokemonSpecies> {
    const response = await api.get(`/pokemon-species/${nameOrId}`)
    return response.data
  },

  async getPokemonCount(): Promise<number> {
    const response = await api.get('/pokemon?limit=1')
    return response.data.count
  },

  async searchPokemon(query: string): Promise<Pokemon[]> {
    try {
      const pokemon = await this.getPokemonByNameOrId(query.toLowerCase())
      return [pokemon]
    } catch {
      return []
    }
  },

  async getPokemonByIds(ids: number[]): Promise<Pokemon[]> {
    const promises = ids.map(id => this.getPokemonByNameOrId(id))
    return Promise.all(promises)
  }
}