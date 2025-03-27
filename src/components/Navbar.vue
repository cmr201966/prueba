


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
      v-model="searchText"
      placeholder="Buscar"
      class="search-input"
      append-icon="mdi-magnify"
      density="compact"
      @input="emitSearchText"
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
import emitter from '../eventBus'; // Importamos el bus de eventos
// Definir la propiedad reactiva
const searchText = ref(""); // Almacena el texto de búsqueda
const isLoggedIn = ref(localStorage.getItem('token') !== null); // Almacena si el usuario está logueado

// Usamos useRouter para manejar la navegación en Vue Router
const router = useRouter();

// Emitir el evento con el texto de búsqueda
//const emitSearchText = () => {
  // Emitir el evento 'search' con el texto
  // Aquí estamos asumiendo que el componente padre maneja este evento.
  // Asegúrate de que el componente padre tenga un manejador para el evento 'search'
//  emit('search', searchText.value);
//};
// Definir la propiedad reactiva

// Emitir el evento con el texto de búsqueda
const emitSearchText = () => {
  emitter.emit('search', searchText.value); // Usamos el bus de eventos para emitir el texto
};
// Método para cerrar sesión
const logout = () => {
  // Eliminar el token del localStorage
  localStorage.removeItem('token');
  
  // Actualizar el estado de isLoggedIn
  isLoggedIn.value = false;
  router.push({ name: 'home' }); // Redirigir al home
};

// Métodos de navegación
const goHome = () => {
  // Redirigir al home
  router.push({ name: 'home' });
};

const goToPage = (page) => {
  // Redirigir a la página correspondiente
  router.push({ name: page });
};
</script>

<script>
import './styles.css';
</script>

