<template>
  <div class="productos-container">
    <!-- Barra de búsqueda -->
    <div class="search-bar">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Buscar por nombre o nombre genérico..."
        @input="handleSearch"
      />
    </div>

    <!-- Lista de productos -->
    <div class="productos-list" v-if="!isLoading && !error">
      <div
        v-for="producto in productosFiltrados"
        :key="producto.id"
        class="producto-card"
      >
        <div class="producto-info">
          <h3>{{ producto.nombre }}</h3>
          <p v-if="producto.nombreGenerico">
            <strong>Genérico:</strong> {{ producto.nombreGenerico }}
          </p>
          <p v-if="producto.precio">
            <strong>Precio:</strong> ${{ producto.precio.toFixed(2) }}
          </p>
          <p v-if="producto.stock">
            <strong>Stock:</strong> {{ producto.stock }} unidades
          </p>
        </div>

        <!-- Selector de cantidad -->
        <div class="producto-actions">
          <input
            type="number"
            v-model.number="producto.cantidadPedido"
            min="1"
            :max="producto.stock || 100"
            placeholder="Cantidad"
          />
          <button @click="agregarAlPedido(producto)">Agregar</button>
        </div>
      </div>
    </div>

    <!-- Carrito/Pedido -->
    <div class="pedido-section" v-if="pedido.length > 0">
      <h2>Tu Pedido</h2>
      <ul>
        <li v-for="(item, index) in pedido" :key="index">
          {{ item.nombre }} - {{ item.cantidadPedido }} x ${{
            item.pvp.toFixed(2)
          }}
          <button @click="eliminarDelPedido(index)">×</button>
        </li>
      </ul>
      <div class="pedido-total">
        <strong>Total:</strong> ${{ calcularTotal().toFixed(2) }}
      </div>
      <button @click="confirmarPedido">Confirmar Pedido</button>
    </div>

    <!-- Estados de carga/error -->
    <div v-if="isLoading">Cargando productos...</div>
    <div v-if="error" class="error-message">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

// Estados reactivos
const productos = ref([]);
const todosLosProductos = ref([]);
const searchQuery = ref("");
const isLoading = ref(true);
const error = ref(null);
const pedido = ref([]);

// Computed para filtrado reactivo
const productosFiltrados = computed(() => {
  if (!searchQuery.value.trim()) return productos.value;

  const query = searchQuery.value.toLowerCase();
  return productos.value.filter(
    (producto) =>
      producto.nombre?.toLowerCase().includes(query) ||
      producto.nombreGenerico?.toLowerCase().includes(query)
  );
});

// Funciones
const handleSearch = () => {
  // La búsqueda se maneja automáticamente con el computed
};

const agregarAlPedido = (producto) => {
  if (!producto.cantidadPedido || producto.cantidadPedido < 1) return;

  const existente = pedido.value.find((p) => p.id === producto.id);
  if (existente) {
    existente.cantidadPedido += producto.cantidadPedido;
  } else {
    pedido.value.push({
      ...producto,
      cantidadPedido: producto.cantidadPedido,
    });
  }

  // Resetear cantidad después de agregar
  producto.cantidadPedido = null;
};

const eliminarDelPedido = (index) => {
  pedido.value.splice(index, 1);
};

const calcularTotal = () => {
  return pedido.value.reduce((total, item) => {
    return total + item.pvp * item.cantidadPedido;
  }, 0);
};

const confirmarPedido = async () => {
  try {
    // Aquí iría tu lógica para enviar el pedido
    console.log("Pedido confirmado:", pedido.value);
    alert(`Pedido confirmado por $${calcularTotal().toFixed(2)}`);
    pedido.value = [];
  } catch (err) {
    console.error("Error al confirmar pedido:", err);
  }
};

// Carga inicial
onMounted(async () => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/products");
    const data = await response.json();
    productos.value = data.map((p) => ({ ...p, cantidadPedido: null }));
    todosLosProductos.value = [...productos.value];
  } catch (err) {
    error.value = "Error al cargar productos";
  } finally {
    isLoading.value = false;
  }
});
</script>
