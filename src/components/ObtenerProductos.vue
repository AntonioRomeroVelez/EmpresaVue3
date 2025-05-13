<script setup>
// import ItemProducto from "./ItemProducto.vue";
import ListarProducto from "./ListarProducto.vue";
import NavbarProductos from "../components/Productos/NavbarProductos.vue";

import { ref, onMounted } from "vue";
import axios from "axios";

// Estados reactivos
const productos = ref([]); // Esta será la lista mostrada (filtrada o completa)
const todosLosProductos = ref([]); // Esta siempre mantendrá todos los productos
const isLoading = ref(true);
const error = ref(null);

const handleSearch = (data) => {
  console.log("Buscando:", data);

  if (!data.trim()) {
    // Si el campo está vacío, restaura todos los productos
    productos.value = [...todosLosProductos.value];
    return;
  }

  // Filtra desde la lista completa (todosLosProductos)
  const query = data.toLowerCase();
  productos.value = todosLosProductos.value.filter(
    (producto) =>
      producto.nombre.toLowerCase().includes(query) ||
      producto.nombreGenerico.toLowerCase().includes(query)
  );
};

/// funcion para obtener los productos
const fetchProductos = async () => {
  try {
    isLoading.value = true;
    const { data } = await axios.get("http://127.0.0.1:8000/api/products", {
      params: {
        limit: 10,
      },
    });
    console.log(data);
    productos.value = data;
    todosLosProductos.value = [...data]; // Copia independiente
  } catch (err) {
    error.value = `Error: ${err.message}`;
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

/// ejecutar el componente al montar
onMounted(fetchProductos);
</script>

<template>
  <div>
    <NavbarProductos
      @create-product="showCreateModal = true"
      @search="handleSearch"
    />
    <!-- Estado de carga -->
    <div v-if="isLoading" class="loading">Cargando productos...</div>

    <!-- manejo de errores -->
    <div v-else-if="error" class="error">
      {{ error }}
    </div>

    <!-- listar productos -->

    <!-- <ListarProducto
        :nombre="producto.nombre"
        :cantidad="producto.cantidad"
        :precio="producto.precio"
        :descripcion="producto.descripcion"
      /> -->

    <table
      class="min-w-full text-sm text-left text-gray-500 border border-gray-200"
    >
      <thead class="text-xs text-gray-700 uppercase bg-gray-100">
        <tr>
          <th scope="col" class="px-6 py-3 border-b">Nombre</th>
          <th scope="col" class="px-6 py-3 border-b">marca</th>
          <th scope="col" class="px-6 py-3 border-b">presentacion</th>
          <th scope="col" class="px-6 py-3 border-b">nombreGenerico</th>
          <th scope="col" class="px-6 py-3 border-b">precioFarmacia</th>
          <th scope="col" class="px-6 py-3 border-b">pvp</th>
          <th scope="col" class="px-6 py-3 border-b">iva</th>
          <th scope="col" class="px-6 py-3 border-b">bonificacion</th>
          <th scope="col" class="px-6 py-3 border-b">laboratorio</th>
          <th scope="col" class="px-6 py-3 border-b">descuento</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="producto in productos"
          :key="producto.id"
          class="bg-white hover:bg-gray-50"
        >
          <td class="px-6 py-4 border-b">{{ producto.nombre }}</td>
          <td class="px-6 py-4 border-b">{{ producto.marca }}</td>
          <td class="px-6 py-4 border-b">{{ producto.presentacion }}</td>
          <td class="px-6 py-4 border-b">{{ producto.nombreGenerico }}</td>
          <td class="px-6 py-4 border-b">$ {{ producto.precioFarmacia }}</td>
          <td class="px-6 py-4 border-b">$ {{ producto.pvp }}</td>
          <td class="px-6 py-4 border-b">{{ producto.iva }}</td>
          <td class="px-6 py-4 border-b">{{ producto.bonificacion }}</td>
          <td class="px-6 py-4 border-b">{{ producto.laboratorio }}</td>
          <td class="px-6 py-4 border-b">{{ producto.descuento }}</td>
          <!-- <td class="px-6 py-4 border-b"><button>Ver</button></td> -->
          <td class="px-6 py-4 border-b">
            <router-link
              :to="`/productos/${producto.id}`"
              class="text-blue-600 hover:text-blue-800 hover:underline"
            >
              Ver
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.loading,
.error {
  padding: 2rem;
  text-align: center;
  font-weight: bold;
}

button {
  cursor: pointer;
  padding: 0.5rem 1rem;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
}

.minimalist-table {
  width: 100%;
  border-collapse: collapse;
  font-family: "Segoe UI", sans-serif;
  margin: 1rem 0;
}

.minimalist-table th {
  background-color: #f8f9fa;
  color: #495057;
  font-weight: 600;
  text-align: left;
  padding: 12px 15px;
  border-bottom: 2px solid #dee2e6;
}

.minimalist-table td {
  padding: 12px 15px;
  border-bottom: 1px solid #e9ecef;
  color: #6c757d;
}

.minimalist-table tr:hover td {
  background-color: #f8f9fa;
  color: #495057;
}
</style>
