<template>
  <v-stage
    ref="stageRef"
    :config="stageSize"
    @mousedown="handleStageClick"
    @touchstart="handleStageClick"
  >
    <v-layer>
      <!-- Imagem de fundo -->
      <v-image
        v-if="backgroundImage"
        :config="{
          image: backgroundImage,
          x: backgroundX,
          y: backgroundY,
          width: backgroundSize.width,
          height: backgroundSize.height,
          listening: false
        }"
      />

      <!-- Renderiza imagens dinâmicas -->
      <template v-for="item in shapes" :key="item.id">
        <!-- Borda de seleção -->
        <v-rect
          v-if="selectedId === item.id"
          :x="item.x"
          :y="item.y"
          :width="item.width"
          :height="item.height"
          :offset="{ x: item.width / 2, y: item.height / 2 }"
          :rotation="item.rotation || 0"
          :stroke="'#0A1828'"
          :strokeWidth="2"
          :listening="false"
        />

        <!-- Imagem manipulável -->
        <v-image
          v-if="item.type === 'image' && item.element"
          :ref="el => setShapeRef(item.id, el)"
          :config="{
            image: item.element,
            x: item.x,
            y: item.y,
            width: item.width,
            height: item.height,
            offset: { x: item.width / 2, y: item.height / 2 },
            rotation: item.rotation || 0,
            draggable: true
          }"
          @click="selectShape(item.id)"
          @tap="selectShape(item.id)"
          @dragend="updateShapePosition(item.id, $event)"
        />
      </template>
    </v-layer>
  </v-stage>
</template>

<script setup lang="ts">
import { ref, defineExpose, defineProps, defineEmits } from "vue";

interface Shape {
  id: string;
  type: "image";
  x: number;
  y: number;
  width: number;
  height: number;
  src: string;
  element?: HTMLImageElement;
}

const props = defineProps<{
  shapes: Shape[];
  selectedId: string | null;
}>();

const emit = defineEmits(["update:shapes", "update:selectedId"]);

const stageRef = ref<any>(null);
const backgroundX = ref(0);
const backgroundY = ref(0);
const backgroundImage = ref<HTMLImageElement | null>(null);
const backgroundSize = ref<{ width: number; height: number }>({
  width: 0,
  height: 0,
});

const stageSize = ref<{ width: number; height: number }>({
  width: window.innerWidth * 0.75,
  height: window.innerHeight * 0.8,
});

const shapeNodes = ref<Record<string, any>>({});
const selectedId = ref<string | null>(null);

const setShapeRef = (id: string, el: any) => {
  if (el) shapeNodes.value[id] = el.getNode();
};

const selectShape = (id: string) => {
  selectedId.value = id;
  emit("update:selectedId", id);
};

const handleStageClick = (e: any) => {
  if (e.target === e.target.getStage()) {
    selectedId.value = null;
    emit("update:selectedId", null);
  }
};

const updateShapePosition = (id: string, e: any) => {
  const node = e.target;
  const updatedShapes = props.shapes.map((s) =>
    s.id === id ? { ...s, x: node.x(), y: node.y() } : s
  );
  emit("update:shapes", updatedShapes);
};

// Redimensiona o background proporcionalmente
const resizeBackground = (img: HTMLImageElement) => {
  const stageW = stageSize.value.width;
  const stageH = stageSize.value.height;
  const imgRatio = img.width / img.height;
  const stageRatio = stageW / stageH;

  if (imgRatio > stageRatio) {
    backgroundSize.value.width = stageW;
    backgroundSize.value.height = stageW / imgRatio;
  } else {
    backgroundSize.value.height = stageH;
    backgroundSize.value.width = stageH * imgRatio;
  }

  backgroundX.value = (stageW - backgroundSize.value.width) / 2;
  backgroundY.value = (stageH - backgroundSize.value.height) / 2;
};

// Define o background
const setBackground = (src: string) => {
  const img = new Image();
  img.src = src;
  img.onload = () => {
    backgroundImage.value = img;
    resizeBackground(img);
  };
};

// Exporta tudo como PNG
const exportToPNG = () => {
  if (!stageRef.value) return;

  const uri = stageRef.value.getStage().toDataURL({
    pixelRatio: 2,
    mimeType: "image/png"
  });

  const link = document.createElement("a");
  link.download = "planta.png";
  link.href = uri;
  link.click();
};

// Expor funções para About.vue
defineExpose({
  setBackground,
  exportToPNG
});
</script>
