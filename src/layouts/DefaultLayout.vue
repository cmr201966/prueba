<template>
  <v-app>
      <!-- Aquí va tu barra de navegación -->
      <Navbar />

    <v-main>
      <!-- Aquí se renderiza el contenido de la vista que se pasa -->
      <slot></slot> <!-- Este es el espacio donde se renderizará el contenido de las vistas -->
    </v-main>

    <v-footer app>
      <!-- Aquí va tu pie de página si lo tienes -->
      <span class="white--text">© 2025 Destodo</span>
    </v-footer>
  </v-app>
</template>

<script>
import Navbar from '../components/Navbar.vue'

export default {
  name: 'DefaultLayout',
  components: {
    Navbar
  }
}
</script>

<style scoped>
/* Estilos personalizados del layout */
</style>
