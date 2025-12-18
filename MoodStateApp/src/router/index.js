import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import LoginView from '@/views/auth/LoginView.vue'
import InitialView from '@/views/mood/InitialView.vue'
import SadView from '@/views/mood/SadView.vue'
import PokerFaceView from '@/views/mood/PokerFaceView.vue'
import HappyView from '@/views/mood/HappyView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/inicial'
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresAuth: false }
    },
    {
      path: '/inicial',
      name: 'initial',
      component: InitialView,
      meta: { requiresAuth: true }
    },
    {
      path: '/triste',
      name: 'sad',
      component: SadView,
      meta: { requiresAuth: true }
    },
    {
      path: '/poker-face',
      name: 'poker-face',
      component: PokerFaceView,
      meta: { requiresAuth: true }
    },
    {
      path: '/feliz',
      name: 'happy',
      component: HappyView,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login' })
  } else if (to.name === 'login' && authStore.isAuthenticated) {
    next({ name: 'initial' })
  } else {
    next()
  }
})

export default router
