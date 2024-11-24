<template>
    <div class="sticky-header">
        <h1>Our Blog!</h1>
        <div class="nav-container">
            <nav>
                <router-link to="/" class="nav-item">Home</router-link>
                <router-link to="/login" class="nav-item">Login</router-link>
            </nav>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'HeaderComponent',
    };
</script>
