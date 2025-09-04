<template>
  <div id="app">
    <PersonalHeader></PersonalHeader>
    <router-view />
  </div>
</template>

<script setup lang="ts">
//@ts-ignore
import PersonalHeader from './components/PersonalHeader.vue';

// Não precisa de lógica no App.vue normalmente
</script>

<style>
/* Estilos globais */
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  font-family: Arial, sans-serif;
  overflow: hidden;
}
#app {
  width: 100%;
  height: 100%;
}
</style>
