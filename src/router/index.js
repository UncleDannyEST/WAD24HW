import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/views/MainPage.vue';
import ContactPage from '@/views/ContactPage.vue';
import Login from '@/views/Login.vue';
import Signup from '@/views/Signup.vue';
import AddPost from '@/views/AddPost.vue';
import PostDetails from '@/views/PostDetails.vue';

const routes = [
  { path: '/', name: 'MainPage', component: MainPage },
  { path: '/contact', name: 'ContactPage', component: ContactPage },
  { path: '/login', name: 'Login', component: Login },
  { path: '/signup', name: 'Signup', component: Signup },
  { path: '/add-post', name: 'AddPost', component: AddPost, meta: { requiresAuth: true } },
  { path: '/post/:id', name: 'PostDetails', component: PostDetails, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard for protected routes
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;
