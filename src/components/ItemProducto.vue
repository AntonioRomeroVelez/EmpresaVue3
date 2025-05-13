<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();
const producto = ref(null);
const loading = ref(true);
const error = ref(null);

// Carga de datos del producto
onMounted(async () => {
  try {
    loading.value = true;
    const { data } = await axios.get(
      `http://127.0.0.1:8000/api/products/${route.params.id}`
    );

    producto.value = data; // Usamos directamente los datos de la API
  } catch (err) {
    error.value = "Error al cargar el producto";
    console.error("Error fetching product:", err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
    <!-- Estado de carga -->
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div
        class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"
      ></div>
    </div>

    <!-- Mensaje de error -->
    <div v-else-if="error" class="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg
            class="h-5 w-5 text-red-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm text-red-700">{{ error }}</p>
        </div>
      </div>
    </div>

    <!-- Detalle del producto -->
    <div
      v-else-if="producto"
      class="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden"
    >
      <!-- Encabezado con imagen (opcional) -->
      <div class="bg-green-600 p-6 text-white">
        <h1 class="text-3xl font-bold">{{ producto.nombre }}</h1>
        <div class="flex items-center mt-2">
          <span class="text-green-100">{{ producto.laboratorio }}</span>
          <span class="mx-2">•</span>
          <span class="text-green-100">{{ producto.marca }}</span>
        </div>
      </div>

      <!-- Contenido principal -->
      <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Columna izquierda - Información del producto -->
        <div>
          <h2 class="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">
            Descripción
          </h2>
          <p class="text-gray-600 mb-6">{{ producto.descripcion }}</p>

          <div class="space-y-4">
            <div class="flex justify-between border-b pb-2">
              <span class="text-gray-600">Nombre genérico:</span>
              <span class="font-medium">{{ producto.nombreGenerico }}</span>
            </div>

            <div class="flex justify-between border-b pb-2">
              <span class="text-gray-600">Presentación:</span>
              <span class="font-medium">{{ producto.presentacion }}</span>
            </div>

            <div class="flex justify-between border-b pb-2">
              <span class="text-gray-600">Stock disponible:</span>
              <span class="font-medium">{{ producto.cantidad }} unidades</span>
            </div>
          </div>
        </div>

        <!-- Columna derecha - Precios -->
        <div>
          <h2 class="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">
            Información de Precios
          </h2>

          <div class="space-y-4">
            <div class="flex justify-between border-b pb-2">
              <span class="text-gray-600">Precio farmacia:</span>
              <span class="font-medium"
                >${{ producto.precioFarmacia.toFixed(2) }}</span
              >
            </div>

            <div class="flex justify-between border-b pb-2">
              <span class="text-gray-600">PVP:</span>
              <span class="font-bold text-lg"
                >${{ producto.pvp.toFixed(2) }}</span
              >
            </div>

            <div class="flex justify-between border-b pb-2">
              <span class="text-gray-600">Descuento:</span>
              <span class="font-medium text-red-500"
                >{{ producto.descuento }}%</span
              >
            </div>

            <div class="flex justify-between border-b pb-2">
              <span class="text-gray-600">IVA:</span>
              <span
                :class="producto.iva ? 'text-green-500' : 'text-yellow-500'"
              >
                {{ producto.iva ? "Incluido" : "No incluido" }}
              </span>
            </div>

            <div class="flex justify-between border-b pb-2">
              <span class="text-gray-600">Bonificación:</span>
              <span class="font-medium text-green-600">{{
                producto.bonificacion
              }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Acciones -->
      <div class="bg-gray-50 px-6 py-4 flex justify-between items-center">
        <router-link
          to="/productos"
          class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Volver a productos
        </router-link>

        <button
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none"
        >
          Agregar al carrito
        </button>
      </div>
    </div>

    <!-- Producto no encontrado -->
    <div v-else class="text-center py-12">
      <svg
        class="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <h3 class="mt-2 text-lg font-medium text-gray-900">
        Producto no encontrado
      </h3>
      <p class="mt-1 text-sm text-gray-500">
        El producto solicitado no existe o no está disponible.
      </p>
      <div class="mt-6 btns">
        <router-link
          to="/productos"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none"
        >
          Ver todos los productos
        </router-link>
      </div>
    </div>
  </div>
</template>
