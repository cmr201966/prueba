<template>
  <v-app-bar app color="primary" dark>
    <!-- Logo de la aplicación -->
    <v-btn text @click="goHome">
      <img src="/logo.jpg" alt="Logo" class="logo" />
    </v-btn>

    <v-toolbar-title>
      <v-btn text @click="goHome">
        <span class="white--text">Destodo</span>
      </v-btn>
    </v-toolbar-title>
    
    <!-- Campo de búsqueda entre el título y los botones de navegación -->
    <v-text-field
      placeholder="Buscar"
      solo
      class="search-input"
      append-icon="mdi-magnify"
    ></v-text-field>

    <!-- Espaciador para alinear los elementos -->
    <v-spacer></v-spacer>
  
    <!-- Enlaces de navegación -->
    <v-btn text @click="goToPage('home')">Inicio</v-btn>

    <!-- Solo visible si el usuario no está logueado -->
    <v-btn v-if="!isLoggedIn" text @click="goToPage('login')">Iniciar sesión</v-btn>

    <!-- Solo visible si el usuario está logueado -->
    <v-btn v-if="isLoggedIn" text @click="logout">Cerrar sesión</v-btn>    

    <!-- Solo visible si el usuario está logueado -->
    <v-btn v-if="isLoggedIn" text @click="goToPage('anuncios')">Anuncios</v-btn>
   
    <v-btn text @click="goToPage('about')">Acerca de</v-btn>
  </v-app-bar>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// Creamos una referencia reactiva para el estado de isLoggedIn
const isLoggedIn = ref(localStorage.getItem('token') !== null);

// Usamos useRouter para manejar la navegación en Vue Router
const router = useRouter();

// Método para cerrar sesión
const logout = () => {
  // Eliminar el token del localStorage
  localStorage.removeItem('token');
  
  // Actualizar el estado de isLoggedIn
  isLoggedIn.value = false;

};

// Métodos de navegación
const goHome = () => {
  // Redirigir al home (usando Vue Router)
  router.push({ name: '/' });
};

const goToPage = (page) => {
  // Redirigir a la página correspondiente (usando Vue Router)
  router.push({ name: page });
};
</script>

<script>
  import './styles.css';
</script>
