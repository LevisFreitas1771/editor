<template>
  <div class="container">
    <div class="menu">
      <TableConfig @update:settings="onUpdateSettings" @export="onExportTable" />
    </div>
    <div class="tables">
      <SquaredTable
        ref="squaredTableRef"
        :numChairs="settings.quantidade"
        :tableColor="settings.mesa"
        :chairColor="settings.cadeiras"
        :plateColor="settings.pratos"
        :cupColor="settings.tacas"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SquaredTable from "../components/SquaredTable.vue";
import TableConfig from "../components/TableConfig.vue";

const squaredTableRef = ref<InstanceType<typeof SquaredTable> | null>(null);

const settings = ref({
  mesa: "#000000",
  cadeiras: "#ffff00",
  pratos: "#ffffff",
  tacas: "#ff0000",
  quantidade: 2
});

function onExportTable() {
  squaredTableRef.value?.exportTablePNG();
}

function onUpdateSettings(values: typeof settings.value) {
  settings.value = values;
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  height: 95%;
}

.menu {
  width: 17vw;
  height: 80vh;
  margin-left: 3vw;
}

.tables {
  max-width: 60vw;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20vw;
}
</style>
