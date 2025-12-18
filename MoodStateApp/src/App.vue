<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <v-app>
    <v-app-bar color="primary" app v-if="authStore.isAuthenticated">
      <v-toolbar-title>MoodStateApp</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="logout">Logout</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<style scoped></style>

