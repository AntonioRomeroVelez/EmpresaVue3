<script setup>
import { ref } from "vue";

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
  <div class="product-card">
    <div class="card-header">
      <h3 class="product-name">{{ nombre }}</h3>
      <span class="product-quantity">Stock: {{ cantidad }}</span>
    </div>

    <div class="card-body">
      <p class="product-price">$ {{ precio.toFixed(2) }}</p>
      <p class="product-description">{{ descripcion }}</p>
    </div>

    <div class="card-footer">
      <button class="add-to-cart-btn">Agregar al carrito</button>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 1.2rem;
  max-width: 300px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  background-color: white;
  margin: 10px;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 0.8rem;
}

.product-name {
  margin: 0;
  font-size: 1.2rem;
  color: #333;
}

.product-quantity {
  background-color: #f5f5f5;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  color: #666;
}

.product-price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
  margin: 0.5rem 0;
}

.product-description {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.4;
  margin: 0.8rem 0;
}

.add-to-cart-btn {
  width: 100%;
  padding: 0.6rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.add-to-cart-btn:hover {
  background-color: #3aa876;
}
</style>
