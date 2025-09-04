<template>
  <div>
    <button class="btn" @click="togglePicker">
      <p class="label">{{ label }}</p>
      <div
        class="color-preview"
        :style="{ backgroundColor: colorInternal }"
      ></div>
    </button>
    <input
      ref="colorInput"
      type="color"
      v-model="colorInternal"
      @input="updateColor"
      style="display: none"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue'

const props = defineProps<{
  label: string
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const colorInput = ref<HTMLInputElement>()

// interna para controle local da cor
const colorInternal = ref(props.modelValue || '#ffffff')

// abre o seletor de cores
function togglePicker() {
  colorInput.value?.click()
}

// envia para o componente pai
function updateColor() {
  emit('update:modelValue', colorInternal.value)
}

// atualiza caso o pai mude a cor
watch(() => props.modelValue, (val) => {
  if (val) colorInternal.value = val
})
</script>

<style scoped>
.btn {
    width: 14vw;
    height: 7vh;
    display: flex;
    justify-content:space-between;
    padding: 0vh 5vh 0vh 5vh;
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
    position: relative;
    gap: 10px;
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

.color-preview {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 2px solid #BFA181;
}
</style>
