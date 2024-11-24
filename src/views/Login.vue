<template>
    <div class="login-page">
      <div class="form-container">
        <h2>Welcome Back</h2>
        <p>Please log in to continue:</p>
        <br />
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              v-model="email"
              required
            />
          </div>
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              v-model="username"
              required
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              required
            />
            <p v-if="passwordError" class="error">
              {{ passwordError }}
            </p>
          </div>
          <button type="submit" class="btn-primary">Login</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        username: '',
        password: '',
        passwordError: '',
      };
    },
    methods: {
      handleLogin() {
        // Reset the error message
        this.passwordError = '';
        
        // Validation conditions
        const errors = [];
        
        if (this.password.length < 8 || this.password.length >= 15) {
          errors.push('Password must be between 8 and 15 characters.');
        }
        if (!/^[A-Z]/.test(this.password)) {
          errors.push('Password must start with an uppercase letter.');
        }
        if (!/[A-Z]/.test(this.password)) {
          errors.push('Password must include at least one uppercase alphabet character.');
        }
        if ((this.password.match(/[a-z]/g) || []).length < 2) {
          errors.push('Password must include at least two lowercase alphabet characters.');
        }
        if (!/\d/.test(this.password)) {
          errors.push('Password must include at least one numeric value.');
        }
        if (!/_/.test(this.password)) {
          errors.push('Password must include the character "_".');
        }
  
        // If there are errors, show them; otherwise, proceed
        if (errors.length > 0) {
          this.passwordError = `The password is not valid: ${errors.join(' ')}`;
          return;
        }
  
        // Login logic here
        alert(`Login successful for ${this.username}`);
        
        // Clear form fields (optional)
        this.email = '';
        this.username = '';
        this.password = '';
      },
    },
  };
  </script>
  
  <style scoped>
  .login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f4f4f9;
  }
  
  .form-container {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    width: 400px;
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 15px;
    text-align: left;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .btn-primary {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .btn-primary:hover {
    background-color: #0056b3;
  }
  
  .error {
    color: red;
    font-size: 14px;
    margin-top: 5px;
  }
  </style>
  