<template>
  <div class="main-page">
    <h1>Posts</h1>
    <div v-if="isLoggedIn && posts.length" class="posts">
      <div 
        v-for="post in sortedPosts" 
        :key="post.id" 
        class="post" 
        @click="goToPostDetails(post.id)"
        role="button"
        tabindex="0"
      >
        <h2>{{ post.author }}</h2>
        <p>{{ post.text }}</p>
        <img v-if="post.image_link" :src="post.image_link" alt="Post Image" />
        <p>Likes: {{ post.likes }}</p>
        <p class="post-date">Posted on: {{ formattedDate(post.creation_date) }}</p>
        <button 
          @click.stop="likePost(post.id)" 
          class="btn-like"
        >
          Like
        </button>
      </div>
    </div>
    <div v-else-if="isLoggedIn">
      <p>No posts available. Add a post to get started!</p>
    </div>
    <div v-else>
      <p>You must be logged in to view and manage posts.</p>
    </div>

    <div v-if="isLoggedIn" class="actions">
      <button @click="logout" class="btn-secondary">Logout</button>
      <button @click="deleteAllPosts" class="btn-delete-all">Delete All Posts</button>
      <button @click="goToAddPost" class="btn-add-post">Add New Post</button>
    </div>
  </div>
</template>

<script>
import { authService, loginState } from '@/services/authService';

export default {
  data() {
    return {
      posts: [], // Posts loaded from localStorage
    };
  },
  computed: {
    isLoggedIn() {
      return loginState.isLoggedIn;
    },
    sortedPosts() {
      // Sort posts by creation date (newest first)
      return this.posts.slice().sort((a, b) => new Date(b.creation_date) - new Date(a.creation_date));
    },
  },
  created() {
    if (this.isLoggedIn) {
      this.loadPosts();
    }
  },
  methods: {
    loadPosts() {
      const storedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
      if (storedPosts.length > 0) {
        this.posts = storedPosts;
      } else {
        fetch('/data.json')
          .then((response) => response.json())
          .then((data) => {
            this.posts = data.map((post, index) => ({
              ...post,
              id: index + 1, // Assign unique IDs
              likes: post.likes || 0,
            }));
            localStorage.setItem('posts', JSON.stringify(this.posts));
          })
          .catch((error) => console.error('Error loading posts:', error.message));
      }
      console.log('Posts loaded:', this.posts); // Debugging
    },
    logout() {
      authService.logout();
      alert('You have been logged out.');
      this.$router.push('/login');
    },
    goToPostDetails(postId) {
      console.log('Navigating to post with ID:', postId); // Debugging
      const post = this.posts.find((p) => p.id === postId);
      if (post) {
        this.$router.push(`/post/${postId}`); // Navigate to PostDetails page
      } else {
        alert('Post not found!');
      }
    },
    goToAddPost() {
      this.$router.push('/add-post'); // Navigate to AddPost page
    },
    likePost(postId) {
      console.log('Liking post with ID:', postId); // Debugging
      const post = this.posts.find((p) => p.id === postId); // Find post by ID
      if (post) {
        post.likes += 1; // Increment likes
        localStorage.setItem('posts', JSON.stringify(this.posts)); // Save updated posts
        console.log(`Updated likes for post ${postId}: ${post.likes}`); // Debugging
      } else {
        alert('Post not found for liking!');
      }
    },
    deleteAllPosts() {
      if (confirm('Are you sure you want to delete all posts? This action cannot be undone.')) {
        this.posts = [];
        localStorage.setItem('posts', JSON.stringify(this.posts));
        alert('All posts have been deleted.');
      }
    },
    formattedDate(date) {
      const formatted = new Date(date);
      return formatted.toLocaleDateString();
    },
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

.post {
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.post:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
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

.actions {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 15px;
}

textarea,
input {
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.btn-like,
.btn-secondary,
.btn-delete-all,
.btn-add-post {
  margin: 5px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-like {
  background-color: #4caf50;
  color: white;
}

.btn-secondary {
  background-color: gray;
  color: white;
}

.btn-delete-all {
  background-color: #f44336;
  color: white;
}

.btn-add-post {
  background-color: #1a73e8;
  color: white;
}

.btn-like:hover,
.btn-secondary:hover,
.btn-delete-all:hover,
.btn-add-post:hover {
  opacity: 0.8;
}
</style>
