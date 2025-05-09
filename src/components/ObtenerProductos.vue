<script setup>
// import ItemProducto from "./ItemProducto.vue";
import ListarProducto from "./ListarProducto.vue";
import NavbarProductos from "../components/Productos/NavbarProductos.vue";

import { ref, onMounted } from "vue";
import axios from "axios";

const handleSearch = (query) => {
  console.log("Buscando:", query);
  // Implementa tu lógica de búsqueda aquí
};

//estadsos reactivos
const productos = ref([]);
const isLoading = ref(true);
const error = ref(null);

/// funcion para obtener los productos
const fetchProductos = async () => {
  try {
    isLoading.value = true;
    const { data } = await axios.get("http://127.0.0.1:8000/api/productos", {
      params: {
        limit: 10,
      },
    });
    console.log(data);
    productos.value = data;
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

    <table class="minimalist-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Cantidad</th>
          <th>Precio</th>
          <th>Descripción</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="producto in productos" :key="producto.id">
          <td>{{ producto.nombre }}</td>
          <td>{{ producto.cantidad }}</td>
          <td>$ {{ producto.precio }}</td>
          <td>{{ producto.descripcion }}</td>
          <td><button>Ver</button></td>
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
