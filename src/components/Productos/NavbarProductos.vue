<template>
  <nav class="navbar">
    <!-- Botón de crear producto -->
    <div class="actions">
      <button @click="openCreateModal" class="create-button">
        <i class="plus-icon">+</i> Crear Producto
      </button>
    </div>

    <!-- Buscador -->
    <div class="search-container">
      <input
        type="text"
        v-model="searchQuery"
        @input="handleSearch"
        placeholder="Buscar productos..."
        class="search-input"
      />
      <button @click="handleSearch" class="search-button">
        <i class="search-icon">🔍</i>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const searchQuery = ref("");

const props = defineProps({
  appName: {
    type: String,
    default: "Mi Tienda",
  },
  logo: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["create-product", "search"]);

const openCreateModal = () => {
  emit("create-product");
  // O alternativamente navegar a ruta de creación:
  // router.push('/productos/nuevo');
};

const handleSearch = () => {
  emit("search", searchQuery.value);
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #2c3e50;
  color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.navbar-brand {
  display: flex;
  align-items: center;
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
}

.logo {
  height: 40px;
  margin-right: 10px;
}

.app-name {
  font-size: 1.5rem;
  font-weight: bold;
}

.search-container {
  display: flex;
  align-items: center;
  flex-grow: 1;
  max-width: 500px;
  margin: 0 2rem;
}

.search-input {
  width: 100%;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px 0 0 4px;
  font-size: 1rem;
  outline: none;
}

.search-button {
  padding: 0.5rem 1rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-button:hover {
  background-color: #3aa876;
}

.search-icon {
  font-size: 1rem;
}

.actions {
  display: flex;
  align-items: center;
}

.create-button {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.create-button:hover {
  background-color: #0d8bf2;
}

.plus-icon {
  margin-right: 5px;
  font-weight: bold;
}

/* Responsive */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    padding: 1rem;
  }

  .search-container {
    width: 100%;
    margin: 1rem 0;
    max-width: none;
  }

  .actions {
    width: 100%;
    justify-content: flex-end;
    margin-top: 1rem;
  }
}
</style>
