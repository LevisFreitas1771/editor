<template>
  <div class="container">
    <EditorCard
      @addBackground="addBackground"
      @addFurniture="addFurniture"
      @deleteSelected="deleteSelected"
      @rotateSelected="rotateSelected"
      @scaleUpSelected="scaleUpSelected"
      @scaleDownSelected="scaleDownSelected"
      @exportPNG="exportPNG"
      :selectedId="selectedId"
    />

    <CanvasArea
      ref="canvas"
      :shapes="shapes"
      :selectedId="selectedId"
      @update:selectedId="selectedId = $event"
      @update:shapes="shapes = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
//@ts-ignore
import EditorCard from '../components/EditorCard.vue';
//@ts-ignore
import CanvasArea from '../components/CanvasArea.vue';

const canvas = ref();
const shapes = ref<any[]>([]);
const selectedId = ref<string | null>(null);

const addBackground = (dataUrl: string) => {
  canvas.value.setBackground(dataUrl);
};

const addFurniture = (dataUrl: string) => {
  const img = new Image();
  img.src = dataUrl;
  img.onload = () => {
    const maxWidth = 200;
    const ratio = img.width / img.height;
    const width = img.width > maxWidth ? maxWidth : img.width;
    const height = width / ratio;

    shapes.value.push({
      id: `furniture-${Date.now()}`,
      type: 'image',
      x: 50,
      y: 50,
      width,
      height,
      src: dataUrl,
      element: img
    });
  };
};

const rotateSelected = () => {
  if (!selectedId.value) return;
  shapes.value = shapes.value.map(s =>
    s.id === selectedId.value
      ? { ...s, rotation: (s.rotation || 0) + 15 }
      : s
  );
};

const scaleUpSelected = () => {
  if (!selectedId.value) return;
  shapes.value = shapes.value.map(s =>
    s.id === selectedId.value
      ? { ...s, width: s.width * 1.1, height: s.height * 1.1 }
      : s
  );
};

const scaleDownSelected = () => {
  if (!selectedId.value) return;
  shapes.value = shapes.value.map(s =>
    s.id === selectedId.value
      ? { ...s, width: s.width * 0.9, height: s.height * 0.9 }
      : s
  );
};

const deleteSelected = () => {
  if (!selectedId.value) return;
  shapes.value = shapes.value.filter(s => s.id !== selectedId.value);
  selectedId.value = null;
};

// 🔹 Função para exportar PNG
const exportPNG = () => {
  canvas.value.exportToPNG();
};
</script>

<style scoped>

.container {
  display: flex;
  max-height: 80vh;
  max-width: 90vw;
  margin: 5vh 5vh 0vh 5vh;
}
</style>
