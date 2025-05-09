<script setup>
// import ObtenerProductos from "./components/ObtenerProductos.vue";
import ComponenteNavbar from "./components/ComponentesGenerales/ComponenteNavbar.vue";
// import ProductosView from "./views/ProductosView.vue";
</script>

<!-- <template>
  <ObtenerProductos />
 
</template> -->

<template>
  <div id="app">
    <ComponenteNavbar />
    <router-view />
  </div>
</template>

<style scoped></style>
