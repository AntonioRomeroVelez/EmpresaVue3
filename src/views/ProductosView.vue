<template>
  <div class="container">
    <h1>Gestión de Productos</h1>

    <!-- Formulario (Add/Edit) -->
    <ProductoForm v-model:product="currentProduct" @submit="handleSubmit" />

    <!-- Tabla de Productos -->
    <table class="table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th>IVA (%)</th>
          <th>Precio con IVA</th>
          <th>Descripción</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.nombre }}</td>
          <td>${{ product.precio.toFixed(2) }}</td>
          <td>{{ product.cantidad }}</td>
          <td>{{ product.iva }}%</td>
          <td>${{ (product.precio * (1 + product.iva / 100)).toFixed(2) }}</td>
          <td>{{ product.descripcion }}</td>
          <td>
            <button @click="editProduct(product)" class="btn-edit">
              Editar
            </button>
            <button @click="deleteProduct(product.id)" class="btn-delete">
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ProductoForm from "../components/ProductoForm.vue";
// import ProductoForm from "@/components/ProductoForm.vue";

// Datos simulados (reemplazar con API real)
const products = ref([]);
const currentProduct = ref({
  id: null,
  nombre: "",
  precio: 0,
  cantidad: 0,
  iva: 12, // Valor por defecto (ej: 12%)
  descripcion: "",
});

// Cargar datos iniciales
onMounted(() => {
  products.value = JSON.parse(localStorage.getItem("products")) || [];
});

// Guardar o actualizar
const handleSubmit = (product) => {
  if (product.id) {
    const index = products.value.findIndex((p) => p.id === product.id);
    products.value[index] = product;
  } else {
    products.value.push({ ...product, id: Date.now() });
  }
  saveToLocalStorage();
  resetForm();
};

// Editar
const editProduct = (product) => {
  currentProduct.value = { ...product };
};

// Eliminar
const deleteProduct = (id) => {
  products.value = products.value.filter((p) => p.id !== id);
  saveToLocalStorage();
};

// Helpers
const saveToLocalStorage = () => {
  localStorage.setItem("products", JSON.stringify(products.value));
};

// const API_URL = 'https://tu-api.com/products';

// const saveToAPI = async () => {
//   try {
//     if (currentProduct.value.id) {
//       await axios.put(`${API_URL}/${currentProduct.value.id}`, currentProduct.value);
//     } else {
//       await axios.post(API_URL, currentProduct.value);
//     }
//     fetchProducts(); // Recargar datos
//   } catch (error) {
//     console.error("Error al guardar:", error);
//   }
// };

const resetForm = () => {
  currentProduct.value = {
    id: null,
    nombre: "",
    precio: 0,
    cantidad: 0,
    iva: 12,
    descripcion: "",
  };
};
</script>

<style scoped>
.container {
  max-width: 1000px;
  margin: 0 auto;
}
.table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}
.btn-edit {
  background: #4caf50;
  color: white;
  margin-right: 5px;
}
.btn-delete {
  background: #f44336;
  color: white;
}
</style>
