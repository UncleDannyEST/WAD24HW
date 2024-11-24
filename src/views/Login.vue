<template>
    <div class="login-page">
    <div class="form-container">
        <h2>Welcome Back</h2>
        <p>Please log in to continue:</p><br>
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
            <p v-if="passwordError" class="error">{{ passwordError }}</p>
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
        // Reset error message
        this.passwordError = '';

        // Simple validation for the password (example)
        if (this.password.length < 6) {
        this.passwordError = 'Password must be at least 6 characters long';
        return;
        }

        // You can handle actual login logic here, e.g., send data to an API or store
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
</style>