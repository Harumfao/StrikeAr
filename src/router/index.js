import { createRouter, createWebHistory } from 'vue-router'
import login from '../views/login.vue';
import register from '../views/register.vue';
import home from '../views/home.vue';
import crearcampo from '../views/crearcampo.vue'
import perfil from '../views/perfil.vue'
import comunidad from '../views/publicaciones.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { 
        path: '/login',
        name: 'login',
        component: login
    },
    { 
        path: '/register',
        name: 'register',
        component: register
    },
    { 
        path: '/',
        name: 'home',
        component: home
    },
    { 
        path: '/crearcampo',
        name: 'crearcampo',
        component: crearcampo
    },
    { 
        path: '/perfil',
        name: 'perfil',
        component: perfil
    },
    { 
        path: '/comunidad',
        name: 'comunidad',
        component: comunidad
    },
    
    
    

  ]
    
});

export default router;  
