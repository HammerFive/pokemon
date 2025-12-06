import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PokemonView from '../views/PokemonView.vue'
import TypesView from '../views/TypesView.vue'
import AbilitiesView from '../views/AbilitiesView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/pokemon',
      name: 'pokemon',
      component: PokemonView
    },
    {
      path: '/pokemon/:id',
      name: 'pokemon-detail',
      component: () => import('../views/PokemonDetailView.vue')
    },
    {
      path: '/types',
      name: 'types',
      component: TypesView
    },
    {
      path: '/abilities',
      name: 'abilities',
      component: AbilitiesView
    }
  ]
})

export default router