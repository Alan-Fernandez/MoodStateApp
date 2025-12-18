import { defineStore } from 'pinia'

export const useMoodStore = defineStore('mood', {
  state: () => ({
    currentMood: 'neutral', // neutral, sad, poker-face, happy
    happinessLevel: 0, // 0 a 100
  }),
  actions: {
    setMood(mood) {
      this.currentMood = mood
    },
    incrementHappiness(amount) {
      this.happinessLevel = Math.min(this.happinessLevel + amount, 100)
      if (this.happinessLevel >= 100) {
        this.setMood('happy')
      }
    },
    resetMood() {
      this.currentMood = 'neutral'
      this.happinessLevel = 0
    }
  },
  getters: {
    isHappy: (state) => state.happinessLevel >= 100,
  }
})
