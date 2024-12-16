<template>
  <nav class="header">
    <ul class="nav-links">
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/contact">Contact</router-link></li>
      <li v-if="!isLoggedIn"><router-link to="/signup">Signup</router-link></li>
      <li v-if="!isLoggedIn"><router-link to="/login">Login</router-link></li>
      <li v-if="isLoggedIn">
        <router-link to="/add-post">Add Post</router-link>
      </li>
      <li v-if="isLoggedIn">
        <button @click="logout" class="logout-btn">Logout</button>
      </li>
    </ul>
  </nav>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const store = useStore(); // Access Vuex store
    const router = useRouter(); // Access Vue Router for navigation

    // Computed properties from Vuex store
    const isLoggedIn = computed(() => store.getters.isAuthenticated); 
    const user = computed(() => store.getters.currentUser);

    // Handle user logout
    const logout = async () => {
      try {
        await store.dispatch('logout'); // Trigger logout action in Vuex store
        router.push('/login'); // Redirect to login page
      } catch (error) {
        console.error('Logout failed:', error);
      }
    };

    return {
      isLoggedIn,
      user,
      logout,
    };
  },
};
</script>

<style scoped>
.header {
  background-color: #1a73e8;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 15px;
  margin: 0;
  padding: 0;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.nav-links a:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.logout-btn {
  background: none;
  border: none;
  color: white;
  font-weight: bold;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.logout-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
