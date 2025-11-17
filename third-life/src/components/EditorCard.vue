<template>
  <div>
    <ActionCard>
      <ButtonPrimary label="ADICIONAR PLANTA" @click="selectBackground" class="btns"/>
      <ButtonPrimary label="ADICIONAR MÓVEL" @click="selectFurniture" class="btns"/>

      <ButtonSecondary label="ROTACIONAR" class="btns" @click="rotateSelected"></ButtonSecondary>
      <div>
        <ButtonSecondary label="+" class="btns downup" @click="scaleUpSelected"></ButtonSecondary>
        <ButtonSecondary label="-" class="btns downup" @click="scaleDownSelected"></ButtonSecondary>
      </div>
      <CancelButton label="EXCLUIR" class="btns" @click="deleteSelected"/>

      <ButtonSecondary label="EXPORTAR" class="btns export" @click="exportPNG"/>
    </ActionCard>

    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      @change="handleFile"
      style="display: none"
    />
  </div>
</template>

<script setup lang="ts">
import ActionCard from '../components/ActionCard.vue';
//@ts-ignore
import ButtonPrimary from '../components/ButtonPrimary.vue';
//@ts-ignore
import ButtonSecondary from '../components/ButtonSecondary.vue';
import { ref } from 'vue';
//@ts-ignore
import CancelButton from './CancelButton.vue';

const emit = defineEmits([
  'addBackground',
  'addFurniture',
  'deleteSelected',
  'rotateSelected',
  'scaleUpSelected',
  'scaleDownSelected',
  'exportPNG'
]);

const fileInput = ref<HTMLInputElement | null>(null);
const mode = ref<'background' | 'furniture' | null>(null);

const selectBackground = () => {
  mode.value = 'background';
  fileInput.value?.click();
};

const selectFurniture = () => {
  mode.value = 'furniture';
  fileInput.value?.click();
};

const handleFile = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    if (mode.value === 'background') {
      emit('addBackground', reader.result);
    } else if (mode.value === 'furniture') {
      emit('addFurniture', reader.result);
    }
  };
  reader.readAsDataURL(file);
};

const rotateSelected = () => emit('rotateSelected');
const scaleUpSelected = () => emit('scaleUpSelected');
const scaleDownSelected = () => emit('scaleDownSelected');
const deleteSelected = () => emit('deleteSelected');
const exportPNG = () => emit('exportPNG');
</script>

<style scoped>
.btns {
  margin-top: 2vh;
}

.downup {
  height: 4vh;
}

.export {
  margin-top: 20vh;
}
</style>
