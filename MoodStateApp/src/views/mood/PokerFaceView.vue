<template>
  <v-container class="fill-height bg-background" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" class="text-center">
        <v-icon size="120" color="primary">mdi-emoticon-neutral</v-icon>
        <h1 class="text-h3 mt-4 text-primary">Poker Face</h1>
        <p class="text-subtitle-1 mt-2 text-on-background">Procurando um pouco de humor...</p>
        
        <v-progress-linear
          v-model="moodStore.happinessLevel"
          color="success"
          height="20"
          striped
          class="mt-6 mx-auto"
          style="max-width: 400px"
        >
          <template v-slot:default="{ value }">
            <strong>{{ Math.ceil(value) }}% Feliz</strong>
          </template>
        </v-progress-linear>
      </v-col>
    </v-row>

    <!-- Modal de Chistes -->
    <v-dialog
      v-model="showModal"
      persistent
      max-width="500"
    >
      <v-card color="surface">
        <v-card-title class="text-h5 bg-primary text-on-primary d-flex justify-space-between align-center">
          Hora da Piada Geek!
          <v-btn icon="mdi-close" variant="text" density="compact" @click="closeModal"></v-btn>
        </v-card-title>

        <v-card-text class="pa-6 text-center">
          <div v-if="loading" class="d-flex justify-center my-4">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </div>
          
          <div v-else-if="error">
            <v-alert type="error" variant="tonal">{{ error }}</v-alert>
            <v-btn color="primary" class="mt-4" @click="fetchJoke">Tentar novamente</v-btn>
          </div>

          <div v-else>
            <p class="text-h6 font-italic mb-4 text-on-surface">"{{ currentJoke?.joke }}"</p>
            <v-chip size="small" color="secondary" variant="outlined">
              Fonte: {{ currentJoke?.source }}
            </v-chip>
          </div>

          <CelebrationAnimation 
            :show="moodStore.isHappy" 
            @animation-complete="animationFinished = true" 
          />
        </v-card-text>

        <v-card-actions class="justify-end pa-4">
          <v-btn
            v-if="!moodStore.isHappy"
            color="primary"
            variant="elevated"
            @click="fetchJoke"
            :loading="loading"
          >
            Outra Piada
          </v-btn>
          
          <v-btn
            v-else-if="animationFinished"
            color="success"
            variant="elevated"
            @click="finish"
          >
            Estou Feliz! (Continuar)
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMoodStore } from '@/stores/mood'
import jokesService from '@/services/jokesService'
import CelebrationAnimation from '@/components/common/CelebrationAnimation.vue'

const router = useRouter()
const moodStore = useMoodStore()

const showModal = ref(true)
const loading = ref(false)
const error = ref(null)
const currentJoke = ref(null)
const animationFinished = ref(false)

const fetchJoke = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await jokesService.getRandomJoke()
    currentJoke.value = response.data
    // Incrementamos felicidad por cada chiste leído (ej: 34% para llegar a 100 en 3 chistes)
    moodStore.incrementHappiness(34)
  } catch (err) {
    console.error(err)
    error.value = 'Não foi possível carregar a piada.'
  } finally {
    loading.value = false
  }
}

const closeModal = () => {
  showModal.value = false
  router.push('/inicial')
}

const finish = () => {
  showModal.value = false
  router.push('/feliz')
}

onMounted(() => {
  fetchJoke()
})
</script>
