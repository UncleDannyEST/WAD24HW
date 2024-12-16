import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/views/MainPage.vue';
import Login from '@/views/Login.vue';
import Signup from '@/views/Signup.vue';
import AddPost from '@/views/AddPost.vue';
import PostDetails from '@/views/PostDetails.vue';
import ContactPage from '@/views/ContactPage.vue'; // Ensure the file path is correct

const routes = [
  { path: '/', name: 'MainPage', component: MainPage },
  { path: '/login', name: 'Login', component: Login },
  { path: '/signup', name: 'Signup', component: Signup },
  { path: '/add-post', name: 'AddPost', component: AddPost, meta: { requiresAuth: true } },
  { path: '/post/:id', name: 'PostDetails', component: PostDetails, meta: { requiresAuth: true } },
  { path: '/contact', name: 'ContactPage', component: ContactPage },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login');
  } else {
    next();
  }
});
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (to.meta.requiresAuth && !isLoggedIn) {
      next('/login'); // Redirect to login if not authenticated
  } else {
      next(); // Allow access
  }
});


export default router;
