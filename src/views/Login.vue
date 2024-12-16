<template>
  <div class="login-page">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input 
        v-model="email" 
        type="email" 
        placeholder="Email" 
        required 
      />
      <input 
        v-model="password" 
        type="password" 
        placeholder="Password" 
        required 
      />
      <button type="submit" class="btn-login">Login</button>
      <button @click="goToSignup" class="btn-signup">Sign Up</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await fetch('http://localhost:3000/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);
        alert('Login successful!');
        this.$router.push('/');
      } catch (error) {
        console.error('Error logging in:', error);
        alert('Failed to log in. Please check your credentials.');
      }
    },
    goToSignup() {
      this.$router.push('/signup'); // Redirect to the signup page
    },
  },
};
</script>

<style scoped>
.login-page {
  max-width: 600px;
  margin: 20px auto;
  text-align: center;
}

input {
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.btn-login {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
}

.btn-signup {
  background-color: #1a73e8;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-login:hover {
  background-color: #45a049;
}

.btn-signup:hover {
  background-color: #0057b7;
}
</style>
