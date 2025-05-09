<script setup>
import { ref, computed, onMounted } from "vue";

const props = defineProps({
  nombre: {
    type: String,
    required: true,
  },
  cantidad: {
    type: Number,
    default: 0,
  },
  precio: {
    type: Number,
    required: true,
  },
  descripcion: {
    type: String,
    default: "No hay descripción",
  },
});
</script>

<template>
  <tr>
    <td>{{ nombre }}</td>
    <td>{{ cantidad }}</td>
    <td>$ {{ precio.toFixed(2) }}</td>
    <td>
      <button class="add-to-cart-btn">Ver producto</button>
    </td>
  </tr>
</template>

<style scoped>
.producto-card {
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  text-align: center;
  text-transform: capitalize;
  margin: 5px;
  padding: 5px 10px;
}

button {
  padding: 0.5rem 1rem;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
}
</style>
