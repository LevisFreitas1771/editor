<template>
  <div style="position: relative; width: fit-content; height: fit-content;">
    <v-stage ref="stageRef" :config="stageSize">
      <v-layer>
        <!-- Mesa quadrada -->
        <v-rect
          :config="{
            x: center.x - tableSize / 2,
            y: center.y - tableSize / 2,
            width: tableSize,
            height: tableSize,
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
      :color="cupColor"
      :style="{
        position: 'absolute',
        left: pos.x - 30 + 'px',
        top: pos.y - 20 + 'px'
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
//@ts-ignore
import Chair from "../components/Chair.vue";
//@ts-ignore
import Dish from "../components/Dish.vue";
//@ts-ignore
import Cup from "../components/Cup.vue";

const props = defineProps<{
  numChairs: number;
  chairColor?: string;
  plateColor?: string;
  cupColor?: string;
  tableColor?: string;
}>();

// Configurações
const tableSize = 400;
const chairOffset = 30;
const dishOffset = 40;
const extra = chairOffset + 50;

const stageWidth = tableSize + extra * 2;
const stageHeight = tableSize + extra * 2;
const stageSize = { width: stageWidth, height: stageHeight };
const center = { x: stageWidth / 2, y: stageHeight / 2 };

const numChairsLocal = ref(props.numChairs || 8);
watch(() => props.numChairs, val => { if (val) numChairsLocal.value = val });

const chairColor = computed(() => props.chairColor || "#d3d3d3");
const plateColor = computed(() => props.plateColor || "#ffffff");
const cupColor = computed(() => props.cupColor || "#ffffff");
const tableColor = computed(() => props.tableColor || "#eee");

// Cadeiras distribuídas
const chairPositions = computed(() => {
  const positions: { x: number; y: number; rotation: number }[] = [];
  const sidesMap: Record<number, number[]> = {
    2: [1, 0, 1, 0],
    3: [1, 1, 1, 0],
    4: [1, 1, 1, 1],
    5: [2, 1, 1, 1],
    6: [2, 1, 2, 1],
    7: [2, 2, 2, 1],
    8: [2, 2, 2, 2],
    9: [3, 2, 2, 2],
    10: [3, 2, 3, 2],
    11: [3, 3, 2, 3],
    12: [3, 3, 3, 3],
    13: [4, 3, 3, 3],
    14: [4, 3, 4, 3]
  };
  const perSide = sidesMap[numChairsLocal.value] || [1, 1, 1, 1];

  for (let side = 0; side < 4; side++) {
    const countOnSide = perSide[side];
    for (let i = 0; i < countOnSide; i++) {
      let x = center.x;
      let y = center.y;
      let rotation = 0;

      if (side === 0) { // esquerda
        x = center.x - tableSize / 2 - chairOffset;
        y = center.y - tableSize / 2 + ((tableSize / (countOnSide + 1)) * (i + 1));
        rotation = 90;
      } else if (side === 1) { // topo
        x = center.x - tableSize / 2 + ((tableSize / (countOnSide + 1)) * (i + 1));
        y = center.y - tableSize / 2 - chairOffset;
        rotation = 180;
      } else if (side === 2) { // direita
        x = center.x + tableSize / 2 + chairOffset;
        y = center.y - tableSize / 2 + ((tableSize / (countOnSide + 1)) * (i + 1));
        rotation = -90;
      } else if (side === 3) { // baixo
        x = center.x - tableSize / 2 + ((tableSize / (countOnSide + 1)) * (i + 1));
        y = center.y + tableSize / 2 + chairOffset;
        rotation = 0;
      }

      positions.push({ x, y, rotation });
    }
  }
  return positions;
});

// Pratos
const dishPositions = computed(() =>
  chairPositions.value.map((pos) => {
    let dx = pos.x;
    let dy = pos.y;
    if (pos.rotation === 180) dy = center.y - tableSize / 2 + dishOffset;
    else if (pos.rotation === 0) dy = center.y + tableSize / 2 - dishOffset;
    else if (pos.rotation === -90) dx = center.x + tableSize / 2 - dishOffset;
    else if (pos.rotation === 90) dx = center.x - tableSize / 2 + dishOffset;
    return { x: dx, y: dy };
  })
);

// Taças
const cupPositions = computed(() =>
  dishPositions.value.map((pos) => {
    const factor = 0.6;
    const dx = center.x + (pos.x - center.x) * factor;
    const dy = center.y + (pos.y - center.y) * factor;
    return { x: dx, y: dy };
  })
);

// 🎯 Exportação para PNG
const stageRef = ref<any>(null);

function exportTablePNG() {
  if (stageRef.value) {
    const uri = stageRef.value.getNode().toDataURL({ pixelRatio: 2 });
    const link = document.createElement("a");
    link.download = "mesa.png";
    link.href = uri;
    link.click();
  }
}

defineExpose({ exportTablePNG });
</script>
