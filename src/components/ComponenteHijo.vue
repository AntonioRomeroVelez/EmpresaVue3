<script setup>
const props = defineProps({
  nombre: {
    type: String,
    required: true,
  },
  cantidad: {
    type: Number,
    default: 0,
  },
});
</script>

<template>
  <div>
    <p>Fruta: {{ nombre }}</p>
    <p>Cantidad: {{ cantidad }}</p>
  </div>
</template>

<style scoped></style>
