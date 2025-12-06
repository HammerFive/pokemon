import axios from 'axios'
import type { Ability, AbilityListResponse } from '@/types'

const API_BASE_URL = 'https://pokeapi.co/api/v2'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000
})

export const abilityService = {
  async getAbilityList(limit = 20, offset = 0): Promise<AbilityListResponse> {
    const response = await api.get(`/ability?limit=${limit}&offset=${offset}`)
    return response.data
  },

  async getAbilityByNameOrId(nameOrId: string | number): Promise<Ability> {
    const response = await api.get(`/ability/${nameOrId}`)
    return response.data
  },

  async searchAbilities(query: string): Promise<Ability[]> {
    try {
      const ability = await this.getAbilityByNameOrId(query.toLowerCase())
      return [ability]
    } catch {
      return []
    }
  }
}