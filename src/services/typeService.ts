import axios from 'axios'
import type { Type, TypeListResponse } from '@/types'

const API_BASE_URL = 'https://pokeapi.co/api/v2'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000
})

export const typeService = {
  async getTypeList(): Promise<TypeListResponse> {
    const response = await api.get('/type')
    return response.data
  },

  async getTypeByNameOrId(nameOrId: string | number): Promise<Type> {
    const response = await api.get(`/type/${nameOrId}`)
    return response.data
  },

  async getAllTypes(): Promise<Type[]> {
    const typeList = await this.getTypeList()
    const promises = typeList.results.map(type =>
      this.getTypeByNameOrId(type.name)
    )
    return Promise.all(promises)
  }
}