import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Login from '../views/Login.vue';
import Anuncios from '../views/Anuncios.vue';

const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/about', name: 'about', component: About },
    { path: '/login', name: 'login', component: Login },
    { path: '/anuncios', name: 'anuncios', component: Anuncios }]

const router = createRouter({
    
  history: createWebHistory(import.meta.env.BASE_URL)
  ,
  routes,
});

// Lógica para proteger rutas
router.beforeEach((to, from, next) => {
  const isAuthenticated = false; // Cambia esta variable según la lógica de autenticación (por ejemplo, verificando un token)

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/'); // Redirige a la página de login si no está autenticado
  } else {
    next();
  }
});

export default router;
