<template>
  <div class="plate" :style="plateStyle">
    <div class="plateb" :style="platebStyle"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"

const props = defineProps<{
  color?: string // cor principal
}>()

// se não passar nada, fica branco
const baseColor = computed(() => props.color || "#ffffff")

// Função auxiliar para escurecer ou clarear a cor
function shadeColor(color: string, percent: number) {
  const num = parseInt(color.replace("#", ""), 16)
  const r = Math.min(255, Math.max(0, (num >> 16) + (255 * percent)))
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + (255 * percent)))
  const b = Math.min(255, Math.max(0, (num & 0x0000ff) + (255 * percent)))
  return `rgb(${r}, ${g}, ${b})`
}

// estilos dinâmicos
const plateStyle = computed(() => ({
  background: `radial-gradient(circle at center, ${baseColor.value} 60%, ${shadeColor(baseColor.value, -0.2)} 100%)`,
  border: `2px solid ${shadeColor(baseColor.value, -0.4)}`
}))

const platebStyle = computed(() => ({
  background: `radial-gradient(circle at center, ${baseColor.value} 60%, ${shadeColor(baseColor.value, -0.25)} 100%)`,
  border: `2px solid ${shadeColor(baseColor.value, -0.5)}`
}))
</script>

<style scoped>
.plate {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4vw;
  height: 4vw;
  border-radius: 50%;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.15),
              0 3px 6px rgba(0, 0, 0, 0.2);
}

.plateb {
  width: 2.5vw;
  height: 2.5vw;
  border-radius: 50%;
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.25),
              0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
