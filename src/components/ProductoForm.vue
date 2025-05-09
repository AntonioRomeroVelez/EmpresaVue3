<template>
  <form @submit.prevent="$emit('submit', product)" class="form">
    <div class="form-group">
      <label>Nombre:</label>
      <input v-model="product.nombre" required type="text" />
    </div>

    <div class="form-group">
      <label>Precio ($):</label>
      <input
        v-model.number="product.precio"
        required
        type="number"
        min="0"
        step="0.01"
      />
    </div>

    <div class="form-group">
      <label>Cantidad:</label>
      <input v-model.number="product.cantidad" required type="number" min="0" />
    </div>

    <div class="form-group">
      <label>IVA (%):</label>
      <input
        v-model.number="product.iva"
        required
        type="number"
        min="0"
        max="100"
      />
    </div>

    <div class="form-group">
      <label>Descripción:</label>
      <textarea v-model="product.descripcion"></textarea>
    </div>

    <button type="submit" class="btn-submit">
      {{ product.id ? "Actualizar" : "Guardar" }}
    </button>
  </form>
</template>

<script setup>
defineProps({
  product: { type: Object, required: true },
});

defineEmits(["submit"]);
</script>

<style scoped>
.form {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #eee;
}
.form-group {
  margin-bottom: 10px;
}
label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}
input,
textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
.btn-submit {
  background: #2196f3;
  color: white;
  padding: 10px 15px;
  border: none;
}
</style>
