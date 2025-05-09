<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

//estadsos reactivos
const pokemones = ref([]);
const isLoading = ref(true);
const error = ref(null);

/// funcion para obtener los pokemones
const fetchPokemones = async () => {
  try {
    isLoading.value = true;
    const { data } = await axios.get("https://pokeapi.co/api/v2/pokemon", {
      params: {
        limit: 10,
      },
    });
    pokemones.value = data.results;

    // Opcional: Obtener detalles adicionales en paralelo
    const detailsPromises = pokemones.value.map((p) =>
      axios.get(p.url).then((res) => res.data)
    );
    pokemones.value = await Promise.all(detailsPromises);
  } catch (err) {
    error.value = `Error: ${err.message}`;
    console.error(err);
  } finally {
    isLoading.value = false;
  }
  console.log(pokemones.value);
};

/// ejecutar el componente al montar
onMounted(fetchPokemones);
</script>

<template>
  <div>
    <h1>Pokedex</h1>

    <!-- Estado de carga -->
    <div v-if="isLoading" class="loading">Cargando pokemon...</div>

    <!-- manejo de errores -->
    <div v-else-if="error" class="error">
      {{ error }}
    </div>

    <!-- listar pokemones -->
    <ul>
      <div
        v-for="pokemon in pokemones"
        :key="pokemon.name"
        class="pokemon-card"
      >
        <img
          :src="pokemon.sprites?.front_default"
          :alt="pokemon.name"
          class="pokemon-sprite"
        />
        <h3>{{ pokemon.name }}</h3>
        <div class="types">
          <span
            v-for="type in pokemon.types"
            :key="type.slot"
            :class="`type-${type.type.name}`"
          >
            {{ type.type.name }}
          </span>
        </div>
      </div>
    </ul>
  </div>
</template>

<style scoped>
.pokemon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  padding: 0;
  list-style: none;
}

.pokemon-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 5px;
  text-align: center;
  text-transform: capitalize;
  display: inline-table;
  width: 150px;
  height: 70px;
  margin: 5px;
}

.pokemon-sprite {
  width: 96px;
  height: 96px;
}

.types {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 0.5rem;
}

.type-grass {
  background: #78c850;
}
.type-fire {
  background: #f08030;
}
.type-water {
  background: #6890f0;
}
/* Agrega más tipos según necesites */

.loading,
.error {
  padding: 2rem;
  text-align: center;
  font-weight: bold;
}
</style>
