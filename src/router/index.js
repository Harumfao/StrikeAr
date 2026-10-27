import { createRouter, createWebHistory } from 'vue-router'
import login from '../views/login.vue';
import register from '../views/register.vue';
import home from '../views/home.vue';
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
        component: home
    },
    {
        path: '/post',
        name: 'post',
        component: post
    }

  ]
    
});

export default router;  
