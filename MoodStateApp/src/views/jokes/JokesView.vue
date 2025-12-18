<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="mt-5">
          <v-card-title class="text-h5">
            Geek Jokes
          </v-card-title>
          
          <v-card-text class="text-center py-5">
            <v-progress-circular
              v-if="jokesStore.loading"
              indeterminate
              color="primary"
            ></v-progress-circular>
            
            <div v-else-if="jokesStore.error">
              <v-alert type="error" outlined>
                {{ jokesStore.error }}
              </v-alert>
            </div>
            
            <div v-else-if="jokesStore.currentJoke">
              <p class="text-h6 font-italic">"{{ jokesStore.currentJoke.joke }}"</p>
              <v-chip class="mt-3" small outlined>
                Fuente: {{ jokesStore.currentJoke.source }}
              </v-chip>
            </div>
            
            <div v-else>
              <p>Presiona el botón para obtener una broma.</p>
            </div>
          </v-card-text>
          
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click="jokesStore.fetchRandomJoke()"
              :loading="jokesStore.loading"
            >
              Obtener Broma
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useJokesStore } from '@/stores/jokes'
import { onMounted } from 'vue'

const jokesStore = useJokesStore()

onMounted(() => {
  if (!jokesStore.currentJoke) {
    jokesStore.fetchRandomJoke()
  }
})
</script>
