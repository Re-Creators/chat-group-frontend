import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    meta : {
      requiresAuth : true
    },
    component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue')
  },
  {
    path: '/profile/edit',
    name: 'Edit',
    meta : {
      requiresAuth : true
    },
    component: () => import(/* webpackChunkName: "edit" */ '../views/Edit.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  const loggedIn = localStorage.getItem('token')

  if(loggedIn && (to.name === "Login" || to.name === "Register")) {
    return {
      name : 'Profile'
    }
  }

  if(to.meta.requiresAuth && !loggedIn) {
    return {
      path : '/'
    }
  }
})

export default router
