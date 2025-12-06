export interface Pokemon {
  id: number
  name: string
  height: number
  weight: number
  base_experience?: number
  sprites: {
    front_default: string
    back_default: string
    front_shiny: string
    back_shiny: string
    other?: {
      'official-artwork'?: {
        front_default: string
        front_shiny: string
      }
    }
  }
  types: PokemonType[]
  stats: PokemonStat[]
  abilities: PokemonAbility[]
  moves: PokemonMove[]
  species: {
    name: string
    url: string
  }
  forms: PokemonForm[]
}

export interface PokemonType {
  slot: number
  type: {
    name: string
    url: string
  }
}

export interface PokemonStat {
  base_stat: number
  effort: number
  stat: {
    name: string
    url: string
  }
}

export interface PokemonAbility {
  slot: number
  is_hidden: boolean
  ability: {
    name: string
    url: string
  }
}

export interface PokemonMove {
  move: {
    name: string
    url: string
  }
  version_group_details: Array<{
    level_learned_at: number
    version_group: {
      name: string
      url: string
    }
    move_learn_method: {
      name: string
      url: string
    }
  }>
}

export interface PokemonForm {
  name: string
  url: string
}

export interface PokemonListItem {
  name: string
  url: string
}

export interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: PokemonListItem[]
}

export interface PokemonSpecies {
  id: number
  name: string
  generation: {
    name: string
    url: string
  }
  evolves_from_species?: {
    name: string
    url: string
  }
  evolution_chain: {
    url: string
  }
  flavor_text_entries: Array<{
    flavor_text: string
    language: {
      name: string
      url: string
    }
    version: {
      name: string
      url: string
    }
  }>
  genera: Array<{
    genus: string
    language: {
      name: string
      url: string
    }
  }>
  habitat?: {
    name: string
    url: string
  }
  is_legendary: boolean
  is_mythical: boolean
  growth_rate: {
    name: string
    url: string
  }
}