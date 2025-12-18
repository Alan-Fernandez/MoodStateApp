<template>
  <v-form @submit.prevent="handleSubmit" ref="form" class="register-form">
    <h2 class="text-h4 font-weight-bold mb-6 text-primary">Criar Conta</h2>
    
    <v-text-field
      v-model="name"
      label="Nome Completo"
      name="name"
      prepend-inner-icon="mdi-account-outline"
      variant="outlined"
      color="primary"
      :rules="[rules.required]"
      class="mb-2"
    ></v-text-field>

    <v-text-field
      v-model="email"
      label="E-mail"
      name="email"
      prepend-inner-icon="mdi-email-outline"
      variant="outlined"
      color="primary"
      :rules="[rules.required, rules.email]"
      class="mb-2"
    ></v-text-field>

    <v-text-field
      v-model="password"
      label="Senha"
      name="password"
      prepend-inner-icon="mdi-lock-outline"
      variant="outlined"
      color="primary"
      :type="showPassword ? 'text' : 'password'"
      :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append-inner="showPassword = !showPassword"
      :rules="[rules.required, rules.min]"
      class="mb-4"
    ></v-text-field>

    <v-alert
      v-if="error"
      type="error"
      variant="tonal"
      class="mb-4"
      closable
    >
      {{ error }}
    </v-alert>

    <v-btn
      block
      color="primary"
      size="large"
      type="submit"
      :loading="loading"
      class="text-none font-weight-bold rounded-pill mb-4"
      elevation="2"
    >
      Registrar
    </v-btn>

    <div class="text-center">
      <span class="text-body-2 text-medium-emphasis">Já tem uma conta? </span>
      <router-link to="/login" class="text-body-2 font-weight-bold text-primary text-decoration-none">
        Entrar
      </router-link>
    </div>
  </v-form>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['submit'])

const form = ref(null)
const name = ref('')
const email = ref('')
const password = ref('')
const showPassword = ref(false)

const rules = {
  required: value => !!value || 'Este campo é obrigatório.',
  email: value => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || 'Insira um e-mail válido.'
  },
  min: value => (value && value.length >= 8) || 'Mínimo de 8 caracteres.'
}

const handleSubmit = async () => {
  const { valid } = await form.value.validate()
  if (valid) {
    emit('submit', {
      name: name.value,
      email: email.value,
      password: password.value
    })
  }
}
</script>

<style scoped lang="scss">
.register-form {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}
</style>
