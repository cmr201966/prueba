<template>
   <DefaultLayout>
    <v-app>
      <v-container class="d-flex justify-center align-center" style="">
        <v-card class="pa-4" max-width="400px">
          <v-form ref="form" v-model="valid" @submit.prevent="submitForm">
            <v-text-field
              v-model="user"
              label="Nombre usuario:"
              density="compact"
              type="text"
            ></v-text-field>
  
            <v-text-field
              v-model="password"
              label="Contraseña"
              density="compact"
              type="password"
            ></v-text-field>
  
            <v-btn :disabled="!valid" color="primary" type="submit" block>
              Iniciar sesión
            </v-btn>
          </v-form>
        </v-card>
      </v-container>
    </v-app>
  </DefaultLayout>
    </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import api from '../api/axios';
  import DefaultLayout from '../layouts/DefaultLayout.vue'
  
  const user = ref('');
  const password = ref('');
  const valid = ref(false);
  const router = useRouter();  // Importa el router
    
  const submitForm = async () => {
    try {
      const response = await api.post('/login', {
        username: user.value,
        password: password.value,
      });
      localStorage.setItem('token', response.data.token);
      router.push('/');      
    } catch (error) {
      console.error('Error de autenticación', error);
      alert('Credenciales incorrectas');
    }
  };
  </script>
  
  <style scoped>
  /* Puedes agregar estilos personalizados aquí */
  </style>
  