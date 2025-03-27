import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import './assets/styles.css';
import 'vuetify/styles';  // Importar los estilos de Vuetify
import { aliases, mdi } from 'vuetify/iconsets/mdi'; // Asegura que usa MDI
import '@mdi/font/css/materialdesignicons.css';
import { createStore } from 'vuex';  // Importar Vuex
import store from './store/store';  // El archivo donde tienes tu store

// Eliminar el token del localStorage cuando la aplicación se inicia
localStorage.removeItem('token');
const app = createApp(App);

// Usar Vuetify y Vue Router en la aplicación
app.use(vuetify); 
app.use(router); // Usar Vue Router
app.mount('#app');
