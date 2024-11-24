<template>
  <div class="main-page">
    <h1>Blog Posts</h1>
    
    <div class="posts">
      <Post
        v-for="post in posts"
        :key="post.id"
        :post="post"
      />
    </div>
    <button @click="resetLikes" class="btn-reset">Reset All Likes</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Post from '../components/Post.vue';

export default {
  components: {
    Post,
  },
  computed: {
    ...mapGetters(['allPosts']), // Get posts from Vuex store
    posts() {
      return this.allPosts;
    },
  },
  methods: {
    ...mapActions(['resetLikes', 'loadPosts']),
  },
  created() {
    // Dispatch the loadPosts action to load data from the JSON file
    this.loadPosts();
  },
};
</script>

<style scoped>
.main-page {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.posts {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.btn-reset {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-reset:hover {
  background-color: #0d47a1;
}
</style>
