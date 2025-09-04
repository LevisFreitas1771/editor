<template>
    <button class="btn"  @click="handleClick">
        <p class="label">{{ label }}</p>
    </button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{ label: string }>()
const emit = defineEmits<{
  (e: 'click'): void
}>()

function handleClick() {
  emit('click')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Roboto:ital,wght@0,100..900;1,100..900&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap');

.btn {
    width: 14vw;
    height: 7vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #BFA181;
    border: none;
    border-radius: 10px;
    background: #0A1828;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    outline: none;
    font-family: Montserrat;
    font-weight: 500;
}

.btn:hover {
    background: transparent;
    border: 2px solid #0A1828;
    color: #0A1828;
    transform: scale(1.05);
}

.btn:active {
    background: #0A1828;
    color: white;
    border: none;
}

.label {
    outline: none;
}
</style>