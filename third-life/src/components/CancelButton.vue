<template>
    <button class="btn" @click="onClick">
        <p class="label">{{ label }}</p>
    </button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  label: string
  onClick?: () => void
}>()

const onClick = props.onClick ?? (() => {})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Roboto:ital,wght@0,100..900;1,100..900&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap');

.btn {
    width: 14vw;
    height: 7vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #0A1828;
    border: none;
    border-radius: 10px;
    background-color: #FF4C4C ;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    outline: none;
    font-family: Montserrat;
    font-weight: 500;
}

.btn:hover {
    background-color: #FFCCCC;
    border: 1px solid #FF4C4C;
    color: #FF4C4C;
    transform: scale(1.05);
}

.btn:active {
    background-color: #FF4C4C;
    color: white;
}

.label {
    outline: none;
}
</style>