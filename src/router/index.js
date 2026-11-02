import { createRouter, createWebHistory } from 'vue-router'
import login from '../views/login.vue';
import register from '../views/register.vue';
import home from '../views/home.vue';
import crearcampo from '../views/crearcampo.vue';
import perfil from '../views/perfil.vue';
import comunidad from '../views/publicaciones.vue';
import post from '../views/post.vue';



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
        alias: ['/home', '/dashboard'],
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
        alias: '/publicaciones',
        name: 'comunidad',
        component: comunidad
    },
    {
        path: '/post',
        name: 'post',
        component: post
    },
    
    
    

  ]
    
});
export default router;  