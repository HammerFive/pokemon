export interface Type {
  id: number
  name: string
  damage_relations: TypeRelations
  pokemon: Array<{
    pokemon: {
      name: string
      url: string
    }
    slot: number
  }>
  moves: Array<{
    name: string
    url: string
  }>
}

export interface TypeRelations {
  no_damage_to: TypeRelation[]
  half_damage_to: TypeRelation[]
  double_damage_to: TypeRelation[]
  no_damage_from: TypeRelation[]
  half_damage_from: TypeRelation[]
  double_damage_from: TypeRelation[]
}

export interface TypeRelation {
  name: string
  url: string
}

export interface TypeListResponse {
  count: number
  next: string | null
  previous: string | null
  results: Array<{
    name: string
    url: string
  }>
}