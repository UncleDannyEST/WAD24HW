<template>
    <div class="footer">
      <p>&copy; WAD2024 Group BH. All Rights Reserved.</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FooterComponent',
  };
  </script>
  
  <style>
  .footer {
    display: flex;
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */
    background-color: #f8f9fa; /* Optional: Background color */
    padding: 20px; /* Padding inside the footer */
    box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.1); /* Optional: Shadow at the top for styling */
    position: fixed; /* Keeps the footer fixed at the bottom */
    bottom: 0; /* Aligns it to the bottom of the page */
    width: 100%; /* Ensures it spans the full width of the page */
    z-index: 10; /* Ensures it stays above other content */
  }
  
  .footer p {
    margin: 0; /* Remove default margin */
    font-size: 14px; /* Adjust font size if needed */
    color: #333; /* Text color */
  }
  </style>
  