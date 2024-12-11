<template>
  <nav class="header">
    <ul class="nav-links">
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/contact">Contact</router-link></li>
      <li v-if="!loginState.isLoggedIn"><router-link to="/signup">Signup</router-link></li>
      <li v-if="!loginState.isLoggedIn"><router-link to="/login">Login</router-link></li>
      <li v-if="loginState.isLoggedIn">
        <button @click="logout" class="logout-btn">Logout</button>
      </li>
    </ul>
  </nav>
</template>

<script>
import { loginState, authService } from '@/services/authService';

export default {
  computed: {
    loginState() {
      return loginState; // Use reactive state
    },
  },
  methods: {
    logout() {
      authService.logout(); // Perform logout
      this.$router.push('/login'); // Redirect to login page
    },
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
