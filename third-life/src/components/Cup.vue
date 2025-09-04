<template>
  <div class="glass">
    <div class="bowl" :style="bowlStyle"></div>
    <div class="stem" :style="stemStyle"></div>
    <div class="base" :style="baseStyle"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"

const props = defineProps<{
  color?: string // cor principal da taça
}>()

const mainColor = computed(() => props.color || "#ffffff")

// Função para escurecer ou clarear cores
function shadeColor(color: string, percent: number) {
  const num = parseInt(color.replace("#", ""), 16)
  const r = Math.min(255, Math.max(0, ((num >> 16) & 0xff) + (255 * percent)))
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + (255 * percent)))
  const b = Math.min(255, Math.max(0, (num & 0xff) + (255 * percent)))
  return `rgb(${r}, ${g}, ${b})`
}

// Estilos dinâmicos
const bowlStyle = computed(() => ({
  background: `radial-gradient(circle at 50% 30%, ${mainColor.value} 60%, ${shadeColor(mainColor.value, -0.2)} 100%)`,
  border: `2px solid ${shadeColor(mainColor.value, -0.4)}`
}))

const stemStyle = computed(() => ({
  background: `linear-gradient(to bottom, ${shadeColor(mainColor.value, 0.3)} 0%, ${shadeColor(mainColor.value, 0.1)} 100%)`
}))

const baseStyle = computed(() => ({
  background: `radial-gradient(circle at center, ${shadeColor(mainColor.value, 0.2)} 60%, ${shadeColor(mainColor.value, -0.2)} 100%)`
}))
</script>

<style scoped>
.glass {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50px;
  height: 100px;
  position: relative;
}

.bowl {
  width: 1.25vw;
  height: 0.75vw;
  border-radius: 50% / 25%;
  box-shadow: inset 0 2px 6px rgba(0,0,0,0.2);
  z-index: 3;
}

.stem {
  width: 0.2vw;
  height: 2vw;
  margin-top: -5px;
  z-index: 2;
}

.base {
  width: 1vw;
  height: 0.3vw;
  border-radius: 50%;
  margin-top: -2px;
  z-index: 1;
}
</style>
