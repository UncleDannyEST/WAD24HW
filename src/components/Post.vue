<template>
    <div class="post">
      <h3>{{ post.author }}</h3>
      <p>{{ post.text }}</p>
      <img v-if="post.image_link" :src="post.image_link" alt="Post Image" />
      <p>Likes: {{ post.likes }}</p>
      <button @click="likePost">Like</button>
    </div>
  </template>
  
  <script>
  export default {
    props: ['post'], // Receive the post object as a prop
    methods: {
      likePost() {
        this.$store.dispatch('likePost', this.post.id);
      },
    },
  };
  </script>
  
  <style>
  .post {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    text-align: center;
  }
  
  .post img {
    max-width: 100%;
    border-radius: 8px;
    margin-top: 10px;
  }
  </style>
  