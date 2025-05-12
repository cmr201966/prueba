<template>
    <DefaultLayout>
      <v-container>
        <h1>Bienvenidos a la Prueba Técnica</h1>
        <p>Para poder publicar anuncios, debe iniciar sesión.</p>
      </v-container>
    </DefaultLayout>
  </template>
  
  <script>
  import api from '../api/axios';
  import DefaultLayout from '../layouts/DefaultLayout.vue'
    export default {
    name: 'Home',
    components: {
      DefaultLayout
    },

    async mounted() {
  },
  
  }
  </script>
  