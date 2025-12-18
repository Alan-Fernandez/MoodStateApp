<template>
  <v-container class="fill-height bg-background" fluid>
    <v-row align="center" justify="center" class="fill-height">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card class="elevation-10 rounded-xl overflow-hidden">
          <v-row no-gutters>
            <!-- Image Side (Brand) -->
            <v-col cols="12" md="6" class="bg-gradient-primary d-flex flex-column align-center justify-center text-white p-5">
              <div class="text-center pa-10">
                <v-icon size="80" color="white" class="mb-4">mdi-account-plus-outline</v-icon>
                <h1 class="text-h3 font-weight-bold mb-2">Junte-se a nós</h1>
                <p class="text-subtitle-1 opacity-90">
                  Comece sua jornada emocional hoje.
                </p>
              </div>
            </v-col>

            <!-- Form Side -->
            <v-col cols="12" md="6" class="bg-surface pa-8 d-flex align-center">
              <RegisterForm 
                :loading="loading"
                :error="error"
                @submit="handleRegister"
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
import RegisterForm from '@/components/auth/RegisterForm.vue'

const authStore = useAuthStore()
const router = useRouter()

const loading = ref(false)
const error = ref('')

const handleRegister = async (userData) => {
  loading.value = true
  error.value = ''
  
  try {
    await authStore.register(userData)
    router.push('/inicial')
  } catch (err) {
    console.error(err)
    if (err.response && err.response.data && err.response.data.message) {
      error.value = err.response.data.message
    } else {
      error.value = 'Erro ao registrar. Tente novamente.'
    }
  } finally {
    loading.value = false
  }
}
</script>
