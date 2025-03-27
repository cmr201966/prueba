<template>
    <DefaultLayout>
      <v-container>
        <h1>Acerca de nosotros</h1>
        <p>DesTodo es tu plataforma donde puedes encontrar todo tipo servicios y productos</p>
        <p>Email:    destodo@gmail.com</p>
        <p>Teléfono: 52675359</p>
        <p>whatsapp: 53178447</p>
        <p>WWW:      https://destodo.web.app</p>
      </v-container>
    </DefaultLayout>
  </template>
  
  <script>
  import DefaultLayout from '../layouts/DefaultLayout.vue'
  
  export default {
    name: 'About',
    components: {
      DefaultLayout
    }
  }
  </script>
  