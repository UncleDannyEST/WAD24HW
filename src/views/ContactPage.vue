<template>
  <div class="contact-page">
    <div class="form-container">
      <h2>Contact Us</h2>
      <p>We'd love to hear from you! Reach out using the form below or the information provided.</p>
      <p>Email: <strong>support@ourblog.com</strong></p>
      <p>Phone: <strong>+1 (800) 555-1234</strong></p>
      <p>Address: <strong>123 Blog Street, Blog City, BL 56789</strong></p>
      <form @submit.prevent="sendMessage">
        <div class="form-group">
          <label for="name">Your Name:</label>
          <input type="text" id="name" placeholder="Enter your name" v-model="name" required />
        </div>
        <div class="form-group">
          <label for="email">Your Email:</label>
          <input type="email" id="email" placeholder="Enter your email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="message">Your Message:</label>
          <textarea id="message" placeholder="Write your message" v-model="message" required></textarea>
        </div>
        <button type="submit" class="btn-primary">Send Message</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      message: '',
    };
  },
  methods: {
    sendMessage() {
      alert('Message sent! Thank you for contacting us.');
      this.name = '';
      this.email = '';
      this.message = '';
    },
  },
};
</script>

<style scoped>
.contact-page {
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
p {
  margin: 10px 0;
}
.form-group {
  margin-bottom: 15px;
  text-align: left;
}
input,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
textarea {
  resize: none;
  height: 100px;
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
