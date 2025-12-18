<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Iniciar Sesión</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form @submit.prevent="handleLogin" ref="form">
              <v-text-field
                v-model="email"
                label="Email"
                name="email"
                prepend-icon="mdi-account"
                type="email"
                :rules="[rules.required, rules.email]"
                required
              ></v-text-field>

              <v-text-field
                v-model="password"
                id="password"
                label="Contraseña"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                :rules="[rules.required]"
                required
              ></v-text-field>
              
              <v-alert
                v-if="error"
                type="error"
                dense
                outlined
                class="mt-3"
              >
                {{ error }}
              </v-alert>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" :loading="loading" @click="handleLogin">Entrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const form = ref(null)

const rules = {
  required: value => !!value || 'Requerido.',
  email: value => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || 'E-mail inválido.'
  },
}

const handleLogin = async () => {
  const { valid } = await form.value.validate()
  
  if (valid) {
    loading.value = true
    error.value = ''
    
    try {
      await authStore.login({
        email: email.value,
        password: password.value
      })
      router.push('/')
    } catch (err) {
      error.value = 'Credenciales inválidas o error en el servidor.'
    } finally {
      loading.value = false
    }
  }
}
</script>
