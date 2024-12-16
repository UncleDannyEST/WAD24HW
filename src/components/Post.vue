<template>
  <div>
    <h1>Posts</h1>
    <div v-for="post in posts" :key="post.id">
      <h3>{{ post.author }}</h3>
      <p>{{ post.text }}</p>
      <p>Likes: {{ post.likes }}</p>
      <button @click="likePost(post.id)">Like</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      posts: [],
    };
  },
  methods: {
    async fetchPosts() {
      const response = await axios.get('http://localhost:3000/api/posts');
      this.posts = response.data;
    },
    async likePost(postId) {
      await axios.put(`http://localhost:3000/api/posts/${postId}/like`);
      this.fetchPosts(); // Reload posts after liking
    },
  },
  mounted() {
    this.fetchPosts();
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

.post-date {
  font-size: 0.9em;
  color: #777;
  margin-top: 10px;
}
</style>
