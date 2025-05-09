<script setup>
import { ref, computed, onMounted } from "vue";

// Reactive state
const count = ref(0);
const doubled = computed(() => count.value * 4);

// Functions
const increment = () => count.value++;

// Lifecycle
onMounted(() => {
  console.log("Component mounted");
});
</script>

<template>
  <div>
    <h1>{{ count }} x 4 = {{ doubled }}</h1>
    <button @click="increment">Increment</button>
  </div>
</template>

<style scoped>
button {
  padding: 0.5rem 1rem;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
}
</style>
