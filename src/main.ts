import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import './assets/styles.css';
import 'vuetify/styles';  
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import '@mdi/font/css/materialdesignicons.css';
import { createStore } from 'vuex'; 
import store from './store/store';  

localStorage.removeItem('token');
const app = createApp(App);

app.use(vuetify); 
app.use(router);
app.mount('#app');
