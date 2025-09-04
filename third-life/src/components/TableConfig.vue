<template>
    <ActionCard>
      <div>
        <ColorPicker class="color" v-model="tableColor" :label="'MESA:'"></ColorPicker>
        <ColorPicker class="color" v-model="chairColor" :label="'CADEIRAS:'"></ColorPicker>
        <ColorPicker class="color" v-model="dishColor" :label="'PRATOS:'"></ColorPicker>
        <ColorPicker class="color" v-model="cupColor" :label="'TAÇAS:'"></ColorPicker>
      </div>
        <div class="controlsplusdown">
          <ButtonPrimary class="plusdown" @click="down" :label="'-'"></ButtonPrimary>
          <p class="quantity">{{ quantity }}</p>
          <ButtonPrimary class="plusdown" @click="plus" :label="'+'"></ButtonPrimary>
        </div>
        <ButtonSecondary class="export" :label="'EXPORTAR'" @click="emitValues"></ButtonSecondary>
    </ActionCard>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import ActionCard from './ActionCard.vue';
//@ts-ignore
import ColorPicker from './ColorPicker.vue';
//@ts-ignore
import ButtonPrimary from './ButtonPrimary.vue';
//@ts-ignore
import ButtonSecondary from './ButtonSecondary.vue';

const tableColor = ref('#000000')
const chairColor = ref('#ffff00')
const dishColor = ref('#ffffff')
const cupColor = ref('#ff0000')

const quantity = ref(2)

// Ajuste da quantidade
function plus() {
  if(quantity.value < 14)
  quantity.value++
}

function down() {
  if (quantity.value > 2) quantity.value--
}

// Emitir valores para o componente pai
const emit = defineEmits<{
  (e: 'update:settings', values: { mesa: string; cadeiras: string; pratos: string; tacas: string; quantidade: number }): void
}>()

function emitValues() {
  emit('update:settings', {
    mesa: tableColor.value,
    cadeiras: chairColor.value,
    pratos: dishColor.value,
    tacas: cupColor.value,
    quantidade: quantity.value
  })
}

// Emite automaticamente ao mudar qualquer valor
watch([tableColor, chairColor, dishColor, cupColor, quantity], () => {
  emitValues()
})
</script>


<style scoped>
.color {
    margin-top: 2vh;
}

.controlsplusdown {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
}

.plusdown {
    height: 5vh;
    width: 5vh;
}

.quantity {
    font-family: montserrat;
}

.export {
    /* margin-top: 20vh; */
    margin-bottom: 3vh;
}

</style>