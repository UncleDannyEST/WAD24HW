<template>
  <div class="form-page">
    <h1>Sign Up</h1>
    <form @submit.prevent="signUp">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit" class="btn-primary">Sign Up</button>
      <button @click="cancel" type="button" class="btn-secondary">Cancel</button>
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
    async signUp() {
      try {
        const response = await fetch('http://localhost:3000/api/users/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.email, password: this.password }),
        });

        if (!response.ok) {
          if (response.status === 409) {
            throw new Error('Email already exists. Please use a different email.');
          } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        }

        alert('Signup successful!');
        this.$router.push('/login');
      } catch (error) {
        console.error('Error signing up:', error);
        alert(error.message); // Display the error to the user
      }
    },
    cancel() {
      this.$router.push('/'); // Redirect to home page
    },
  },
};
</script>

<style scoped>
.form-page {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
  text-align: center;
}

input {
  width: 100%;
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.btn-primary {
  background-color: #1a73e8; /* Blue */
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #1664c0;
}

.btn-secondary {
  background-color: gray;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 3px;

}

.btn-secondary:hover {
  background-color: #555;
}
</style>
