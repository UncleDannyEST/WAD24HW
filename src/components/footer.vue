<template>
  <footer class="footer">
    <p>&copy; 2024 WAD2024 Group BH. All Rights Reserved.</p>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent',
};
</script>

<style scoped>
.footer {
  position: static; /* Stays at the bottom of the viewport */
  bottom: 0;
  width: 100%;
  background-color: #1a73e8;
  color: white;
  text-align: center;
  padding: 10px 0;
  z-index: 1000; /* Ensure it stays above other elements */
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.1);
}
</style>
