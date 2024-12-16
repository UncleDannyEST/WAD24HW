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
      <button @click="goToAddPost" class="btn-add-post">Add New Post</button>
      <button @click="deleteAllPosts" class="btn-delete-all">Delete All Posts</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [],
      isLoggedIn: false,
    };
  },
  computed: {
    sortedPosts() {
      return this.posts.slice().sort((a, b) => new Date(b.creation_date) - new Date(a.creation_date));
    },
  },
  created() {
    this.checkLoginStatus();
    if (this.isLoggedIn) {
      this.loadPosts();
    }
  },
  methods: {
    checkLoginStatus() {
      this.isLoggedIn = !!localStorage.getItem('token');
    },
    async loadPosts() {
      try {
        const response = await fetch('http://localhost:3000/api/posts', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        this.posts = await response.json();
      } catch (error) {
        console.error('Error loading posts:', error);
        alert('Session expired. Please log in again.');
        this.logout();
      }
    },
    logout() {
      localStorage.removeItem('token');
      alert('You have been logged out.');
      this.$router.push('/login');
    },
    goToAddPost() {
      this.$router.push('/add-post');
    },
    goToPostDetails(postId) {
      console.log(`Navigating to post with ID: ${postId}`);
      this.$router.push(`/post/${postId}`);
    },
    likePost(postId) {
      fetch(`http://localhost:3000/api/posts/${postId}/like`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(updatedPost => {
          this.posts = this.posts.map(post => (post.id === updatedPost.id ? updatedPost : post));
        })
        .catch(error => {
          console.error('Error liking post:', error);
        });
    },
    async deleteAllPosts() {
      try {
        const response = await fetch('http://localhost:3000/api/posts', {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        this.posts = []; // Clear posts locally
        alert('All posts deleted successfully.');
      } catch (error) {
        console.error('Error deleting posts:', error);
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
.btn-add-post,
.btn-delete-all {
  margin: 5px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px; /* Ensure consistent size */
}

.btn-like {
  background-color: #4caf50;
  color: white;
}

.btn-secondary {
  background-color: gray;
  color: white;
}

.btn-add-post {
  background-color: #1a73e8;
  color: white;
}

.btn-delete-all {
  background-color: #f44336; /* Red for destructive action */
  color: white;
}

.btn-like:hover,
.btn-secondary:hover,
.btn-add-post:hover,
.btn-delete-all:hover {
  opacity: 0.8;
}
</style>
