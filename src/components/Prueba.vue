<script setup>
import { ref, computed, onMounted } from "vue";
import ComponenteHijo from "./ComponenteHijo.vue";
const arrayFrutas = [
  { nombre: "Plátano", cantidad: 3 },
  { nombre: "Mora", cantidad: 5 },
  { nombre: "Melón", cantidad: 7 },
  { nombre: "Manzana", cantidad: 12 },
];
</script>

<template>
  <div v-for="fruta in arrayFrutas" :key="fruta.nombre" class="containerFrutas">
    <ComponenteHijo :nombre="fruta.nombre" :cantidad="fruta.cantidad" />
  </div>
</template>

<style scoped>
.containerFrutas {
  border: solid 1px silver;
  margin: 5px;
  padding: 2px 5px;
  border-radius: 5px;
  gap: 10px;
}
.containerFrutas > div {
  display: inline-flex;
  gap: 10px;
  align-items: center;
  justify-content: start;
}
</style>
