<template>
  <div class="signup-page">
    <div class="form-container">
      <h2>Sign Up</h2>
      <form @submit.prevent="signup">
        <div class="form-group">
          <label for="email">Email:</label>
          <input id="email" type="email" placeholder="Enter your email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input id="password" type="password" placeholder="Enter your password" v-model="password" required />
          <small>Password must be at least 6 characters long.</small>
        </div>
        <button type="submit" class="btn-primary">Sign Up</button>
      </form>
    </div>
  </div>
</template>

<script>
import { authService } from '@/services/authService';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    signup() {
      try {
        authService.register(this.email, this.password);
        alert('Account created successfully! You can now log in.');
        this.$router.push('/login'); // Redirect to login page
      } catch (error) {
        alert(error.message); // Display error message
      }
    },
  },
};
</script>


<style scoped>
.signup-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f4f9;
}
.form-container {
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  text-align: center;
}
h2 {
  margin-bottom: 10px;
  color: #1a73e8;
}
.form-group {
  margin-bottom: 15px;
  text-align: left;
}
input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
small {
  display: block;
  margin-top: 5px;
  font-size: 0.85em;
  color: #777;
}
.btn-primary {
  background-color: #1a73e8;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
}
.btn-primary:hover {
  background-color: #155cbc;
}
</style>
