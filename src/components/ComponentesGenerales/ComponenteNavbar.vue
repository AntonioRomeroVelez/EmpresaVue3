<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-logo">
        <img :src="logo" alt="Logo" v-if="logo" />
        {{ appName }}
      </router-link>
    </div>

    <div class="navbar-links">
      <router-link
        v-for="link in links"
        :key="link.path"
        :to="link.path"
        class="nav-link"
        active-class="active"
      >
        {{ link.title }}
      </router-link>
    </div>

    <div class="navbar-actions" v-if="showAuthButtons">
      <button class="auth-button login" @click="handleLogin">
        Iniciar sesión
      </button>
      <button class="auth-button signup" @click="handleSignup">
        Registrarse
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  appName: {
    type: String,
    default: "App",
  },
  logo: {
    type: String,
    default: "",
  },
  showAuthButtons: {
    type: Boolean,
    default: true,
  },
  customLinks: {
    type: Array,
    default: () => [],
  },
});

const defaultLinks = ref([
  { path: "/", title: "Inicio" },
  { path: "/about", title: "Acerca de" },
  { path: "/productos", title: "Productos" },
  { path: "/contact", title: "Contacto" },
]);

const links = ref([...defaultLinks.value, ...props.customLinks]);

const handleLogin = () => {
  // Lógica para login
  console.log("Login clicked");
};

const handleSignup = () => {
  // Lógica para registro
  console.log("Signup clicked");
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
}

.navbar-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  text-decoration: none;
}

.navbar-logo img {
  height: 40px;
}

.navbar-links {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-link.active {
  background-color: #42b983;
  font-weight: bold;
}

.navbar-actions {
  display: flex;
  gap: 1rem;
}

.auth-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

.auth-button.login {
  background-color: transparent;
  color: white;
  border: 1px solid white;
}

.auth-button.login:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.auth-button.signup {
  background-color: #42b983;
  color: white;
}

.auth-button.signup:hover {
  background-color: #3aa876;
}

/* Responsive */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    padding: 1rem;
  }

  .navbar-links {
    margin: 1rem 0;
    flex-wrap: wrap;
    justify-content: center;
  }

  .navbar-actions {
    margin-top: 1rem;
  }
}
</style>
