<template>
  <v-group :config="{ x, y, rotation }">
    <!-- Retângulo central -->
    <v-rect
      :config="{
        x: -34.375,
        y: -27.5,
        width: 68.75,
        height: 13.75,
        fill: color,
        stroke: 'black',
        strokeWidth: 1
      }"
    />

    <!-- Retângulo inferior -->
    <v-rect
      :config="{
        x: -34.375,
        y: 27.5,
        width: 68.75,
        height: -34.375,
        fill: color,
        stroke: 'black',
        strokeWidth: 1
      }"
    />

    <!-- Retângulo esquerdo -->
    <v-rect
      :config="{
        x: -44.6875,
        y: -20.625,
        width: 10.3125,
        height: 41.25,
        fill: color,
        stroke: 'black',
        strokeWidth: 1
      }"
    />

    <!-- Retângulo direito -->
    <v-rect
      :config="{
        x: 34.375,
        y: -20.625,
        width: 10.3125,
        height: 41.25,
        fill: color,
        stroke: 'black',
        strokeWidth: 1
      }"
    />
  </v-group>
</template>

<script setup lang="ts">
defineProps<{
  x: number
  y: number
  rotation: number
  color: string
}>()
</script>
