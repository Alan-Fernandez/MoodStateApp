<template>
  <v-container class="fill-height bg-background" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" class="text-center">
        <v-icon size="120" color="primary">mdi-emoticon-happy-outline</v-icon>
        <h1 class="text-h3 mt-4 text-primary font-weight-bold">Estado Feliz!</h1>
        <p class="text-subtitle-1 mt-2 text-on-background">Você alcançou a felicidade máxima.</p>
        <v-btn color="primary" size="large" class="mt-6" @click="handleReset">
          Voltar ao Início
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useMoodStore } from '@/stores/mood'

const router = useRouter()
const moodStore = useMoodStore()

const handleReset = () => {
  moodStore.resetMood()
  router.push('/inicial')
}
</script>
