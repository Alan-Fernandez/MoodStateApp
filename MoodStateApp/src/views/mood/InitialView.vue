<template>
  <v-container class="fill-height bg-background cursor-pointer" fluid @click="handleClick">
    <v-row align="center" justify="center">
      <v-col cols="12" class="text-center">
        <v-icon size="120" color="primary">mdi-emoticon-neutral-outline</v-icon>
        <h1 class="text-h3 mt-4 text-on-background">Estado Neutro</h1>
        <p class="text-subtitle-1 mt-2 text-on-background opacity-70">Clique em qualquer lugar para continuar...</p>
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
  moodStore.setMood('sad')
  router.push('/triste')
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
