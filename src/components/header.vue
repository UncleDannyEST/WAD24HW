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
  
  <style>
  .sticky-header {
    display: flex;
    flex-direction: column; /* Stack elements vertically */
    justify-content: center; /* Center vertically */
    align-items: center; /* Center horizontally */
    background-color: #1a73e8; /* Optional: Background color */
    padding: 20px; /* Optional: Padding */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Optional: Shadow for styling */
    position: sticky; /* Stick to the top of the page */
    top: 0; /* Required for sticky positioning */
    z-index: 10; /* Keep it above other content */
  }
  
  .nav-container {
    margin-top: 10px; /* Space between the title and navigation */
  }
  
  nav {
    display: flex;
    gap: 15px; /* Space between navigation items */
  }
  
  .nav-item {
    text-decoration: none; /* Remove underline from links */
    color: #333; /* Default text color */
    font-weight: bold;
  }
  
  .nav-item:hover {
    color: #007bff; /* Change color on hover */
  }
  </style>
  
