import { defineStore } from 'pinia'
import jokesService from '@/services/jokesService'

export const useJokesStore = defineStore('jokes', {
  state: () => ({
    currentJoke: null,
    loading: false,
    error: null,
  }),
  actions: {
    async fetchRandomJoke() {
      this.loading = true
      this.error = null
      try {
        const data = await jokesService.getRandomJoke()
        this.currentJoke = data.data // La API devuelve { data: { joke: ... } }
      } catch (err) {
        console.error('Error fetching joke:', err)
        this.error = 'No se pudo obtener una broma en este momento. Por favor intenta de nuevo más tarde.'
      } finally {
        this.loading = false
      }
    },
  },
})
