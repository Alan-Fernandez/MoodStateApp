<template>
  <v-container class="fill-height text-center" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="8">
        <h1 class="text-h2 font-weight-bold mb-4 text-primary">MoodStateApp</h1>
        <p class="text-h5 mb-6">
          Bienvenido a tu aplicación de estado de ánimo y entretenimiento geek.
        </p>
        
        <div v-if="!authStore.isAuthenticated">
          <p class="mb-4">Inicia sesión para acceder a todas las funcionalidades.</p>
          <v-btn color="primary" size="large" to="/login">
            Iniciar Sesión
          </v-btn>
        </div>
        
        <div v-else>
          <p class="mb-4">Hola, {{ authStore.user?.name || 'Usuario' }}!</p>
          <v-btn color="secondary" size="large" to="/jokes" class="mr-4">
            Ver Chistes Geek
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>
