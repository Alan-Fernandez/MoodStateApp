<template>
  <v-container class="fill-height bg-background" fluid>
    <v-row align="center" justify="center" class="fill-height">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card class="elevation-10 rounded-xl overflow-hidden">
          <v-row no-gutters>
            <!-- Image Side (Brand) -->
            <v-col cols="12" md="6" class="bg-gradient-primary d-flex flex-column align-center justify-center text-white p-5">
              <div class="text-center pa-10">
                <v-icon size="80" color="white" class="mb-4">mdi-emoticon-happy-outline</v-icon>
                <h1 class="text-h3 font-weight-bold mb-2">MoodState</h1>
                <p class="text-subtitle-1 opacity-90">
                  Tu viaje emocional comienza aquí.
                </p>
              </div>
            </v-col>

            <!-- Form Side -->
            <v-col cols="12" md="6" class="bg-surface pa-8 d-flex align-center">
              <LoginForm 
                :loading="loading"
                :error="error"
                @submit="handleLogin"
              />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import LoginForm from '@/components/auth/LoginForm.vue'

const authStore = useAuthStore()
const router = useRouter()

const loading = ref(false)
const error = ref('')

const handleLogin = async (credentials) => {
  loading.value = true
  error.value = ''
  
  try {
    await authStore.login(credentials)
    router.push('/')
  } catch (err) {
    error.value = 'Credenciales inválidas o error en el servidor.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.bg-gradient-primary {
  background: linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%);
}

.opacity-90 {
  opacity: 0.9;
}
</style>

