<template>
  <div class="celebration-container" v-if="show">
    <div class="celebration-icon">
      🎉
    </div>
    <div 
      v-for="n in 20" 
      :key="n" 
      class="confetti-piece"
      :style="getConfettiStyle(n)"
    ></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['animation-complete'])

const getConfettiStyle = (n) => {
  const left = Math.random() * 100 + '%'
  const delay = Math.random() * 2 + 's'
  const duration = (Math.random() * 2 + 2) + 's'
  const bgColors = ['#FFD700', '#FF6347', '#00D084', '#4FD1C5', '#E5E7EB']
  const color = bgColors[Math.floor(Math.random() * bgColors.length)]
  
  return {
    left,
    animationDelay: delay,
    animationDuration: duration,
    backgroundColor: color
  }
}

onMounted(() => {
  if (props.show) {
    setTimeout(() => {
      emit('animation-complete')
    }, 2000) // Match roughly with animation duration
  }
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/animations.scss';
</style>
