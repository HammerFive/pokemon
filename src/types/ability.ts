export interface Ability {
  id: number
  name: string
  is_main_series: boolean
  generation: {
    name: string
    url: string
  }
  effect_entries: EffectEntry[]
  flavor_text_entries: Array<{
    flavor_text: string
    language: {
      name: string
      url: string
    }
    version_group: {
      name: string
      url: string
    }
  }>
  pokemon: Array<{
    pokemon: {
      name: string
      url: string
    }
    is_hidden: boolean
    slot: number
  }>
}

export interface EffectEntry {
  effect: string
  short_effect: string
  language: {
    name: string
    url: string
  }
}

export interface AbilityListResponse {
  count: number
  next: string | null
  previous: string | null
  results: Array<{
    name: string
    url: string
  }>
}