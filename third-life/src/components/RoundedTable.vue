<template>
  <div style="position: relative; width: 100%; height: 100vh;">
    <v-stage :config="stageSize">
      <v-layer>
        <!-- Mesa arredondada -->
        <v-circle
          :config="{
            x: center.x,
            y: center.y,
            radius: tableRadius,
            fill: tableColor,
            stroke: 'black',
            strokeWidth: 2
          }"
        />

        <!-- Cadeiras -->
        <Chair
          v-for="(pos, index) in chairPositions"
          :key="'chair-' + index"
          :x="pos.x"
          :y="pos.y"
          :rotation="pos.rotation"
          :color="chairColor"
        />
      </v-layer>
    </v-stage>

    <!-- Pratos -->
    <Dish
      v-for="(pos, index) in dishPositions"
      :key="'dish-' + index"
      :color="plateColor"
      :style="{
        position: 'absolute',
        left: pos.x - 35 + 'px',
        top: pos.y - 35 + 'px'
      }"
    />

    <!-- Taças -->
    <Cup
      v-for="(pos, index) in cupPositions"
      :key="'cup-' + index"
      :style="{
        position: 'absolute',
        left: pos.x - 30 + 'px',
        top: pos.y - 20 + 'px'
      }"
      :color="cupColor"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue"
import Chair from "../components/Chair.vue"
import Dish from "../components/Dish.vue"
import Cup from "../components/Cup.vue"

const props = defineProps<{
  numChairs: number
  chairColor?: string
  plateColor?: string
  cupColor?: string
  tableColor?: string
}>()

const numChairsLocal = ref(props.numChairs || 8)
watch(() => props.numChairs, val => { if(val) numChairsLocal.value = val })

const chairColor = computed(() => props.chairColor || "#d3d3d3")
const plateColor = computed(() => props.plateColor || "#ffffff")
const cupColor = computed(() => props.cupColor || "#ffffff")
const tableColor = computed(() => props.tableColor || "#eee")

const width = window.innerWidth
const height = window.innerHeight
const stageSize = { width, height }

const center = { x: width / 2, y: height / 2 }
const tableRadius = 200
const chairOffset = 30
const dishOffset = 40
const cupOffset = 30

// Distribuição das cadeiras em círculo
const chairPositions = computed(() => {
  const positions: { x: number; y: number; rotation: number }[] = []
  const angleStep = (2 * Math.PI) / numChairsLocal.value

  for (let i = 0; i < numChairsLocal.value; i++) {
    const angle = i * angleStep
    const x = center.x + Math.cos(angle) * (tableRadius + chairOffset)
    const y = center.y + Math.sin(angle) * (tableRadius + chairOffset)
    const rotation = (angle * 180) / Math.PI + 90 // rotaciona para olhar para a mesa
    positions.push({ x, y, rotation })
  }

  return positions
})

// Pratos (ligeiramente dentro da cadeira)
const dishPositions = computed(() =>
  chairPositions.value.map(pos => {
    const dx = center.x + (pos.x - center.x) * 0.6
    const dy = center.y + (pos.y - center.y) * 0.6
    return { x: dx, y: dy }
  })
)

// Taças (um pouco mais próximas do centro)
const cupPositions = computed(() =>
  chairPositions.value.map(pos => {
    const dx = center.x + (pos.x - center.x) * 0.3
    const dy = center.y + (pos.y - center.y) * 0.3
    return { x: dx, y: dy }
  })
)
</script>
