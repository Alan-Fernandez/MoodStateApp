<template>
  <v-container class="fill-height bg-background cursor-pointer" fluid @click="handleClick">
    <v-row align="center" justify="center">
      <v-col cols="12" class="text-center">
        <v-icon size="120" color="accent">mdi-emoticon-sad-outline</v-icon>
        <h1 class="text-h3 mt-4 text-on-background">Estado Triste</h1>
        <p class="text-subtitle-1 mt-2 text-on-background opacity-70">Haz clic para intentar animarte...</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useMoodStore } from '@/stores/mood'

const router = useRouter()
const moodStore = useMoodStore()

const handleClick = () => {
  moodStore.setMood('poker-face')
  router.push('/poker-face')
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
