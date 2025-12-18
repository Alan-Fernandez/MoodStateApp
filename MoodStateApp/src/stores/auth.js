import { defineStore } from 'pinia'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(credentials) {
      try {
        const response = await api.post('/auth/login', credentials)
        this.token = response.data.access_token
        localStorage.setItem('token', this.token)
        
        // Obtener información del usuario inmediatamente después del login
        await this.fetchUser()
        return true
      } catch (error) {
        console.error('Error en login:', error)
        throw error
      }
    },

    async register(userData) {
      try {
        const response = await api.post('/auth/register', userData)
        
        // La respuesta de registro incluye el token y el usuario
        this.token = response.data.authorization.access_token
        this.user = response.data.user
        
        localStorage.setItem('token', this.token)
        localStorage.setItem('user', JSON.stringify(this.user))
        
        return true
      } catch (error) {
        console.error('Error en registro:', error)
        throw error
      }
    },
    
    async fetchUser() {
      try {
        const response = await api.get('/auth/me')
        this.user = response.data
        localStorage.setItem('user', JSON.stringify(this.user))
      } catch (error) {
        console.error('Error obteniendo usuario:', error)
        // Si falla obtener el usuario, tal vez el token no es válido
        // this.logout() // Opcional: forzar logout si falla /me
      }
    },

    async refreshToken() {
      try {
        const response = await api.post('/auth/refresh')
        this.token = response.data.access_token
        localStorage.setItem('token', this.token)
        return true
      } catch (error) {
        console.error('Error refrescando token:', error)
        this.logout()
        throw error
      }
    },

    async logout() {
      try {
        if (this.token) {
          await api.post('/auth/logout')
        }
      } catch (error) {
        console.error('Error en logout:', error)
      } finally {
        this.token = null
        this.user = null
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    },
  },
})
