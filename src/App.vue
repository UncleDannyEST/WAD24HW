<template>
  <div id="app">
    <header-component />
    <router-view />
    <footer-component />
  </div>
</template>

<script>
import HeaderComponent from './components/header.vue';
import FooterComponent from './components/footer.vue';

export default {
  components: {
    HeaderComponent,
    FooterComponent,
  },
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensures the app spans the full viewport height */
}

router-view {
  flex: 1; /* Allows the main content to grow and push the footer down */
}
</style>
