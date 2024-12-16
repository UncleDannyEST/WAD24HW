<template>
  <div class="post-details-page">
    <div v-if="post">
      <h1>{{ isEditing ? "Edit Post" : post.author }}</h1>
      <div v-if="!isEditing">
        <p>{{ post.text }}</p>
        <img v-if="post.image_link" :src="post.image_link" alt="Post Image" />
        <p>Likes: {{ post.likes }}</p>
        <p>Posted on: {{ formattedDate(post.creation_date) }}</p>
        <button @click="enableEditing" class="btn-edit">Edit Post</button>
        <button @click="deletePost" class="btn-delete">Delete Post</button>
      </div>
      <form v-else @submit.prevent="saveChanges">
        <input v-model="post.author" placeholder="Author" required />
        <textarea v-model="post.text" placeholder="Content" required></textarea>
        <input v-model="post.image_link" placeholder="Image URL" />
        <button type="submit" class="btn-save">Save Changes</button>
        <button @click="cancelEditing" class="btn-cancel">Cancel</button>
      </form>
    </div>
    <div v-else>
      <p>Loading post details...</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: null,
      isEditing: false,
    };
  },
  created() {
    this.fetchPost();
  },
  methods: {
    async fetchPost() {
      const postId = this.$route.params.id; // Get the post ID from the URL
      console.log(`Fetching post with ID: ${postId}`);
      try {
        const response = await fetch(`http://localhost:3000/api/posts/${postId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Add token for authentication
          },
        });
        if (!response.ok) {
          if (response.status === 401) {
            alert('Unauthorized. Please log in again.');
            this.$router.push('/login');
          } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        }
        this.post = await response.json();
      } catch (error) {
        console.error('Error fetching post:', error);
        alert('Failed to load the post. Redirecting to main page.');
        this.$router.push('/');
      }
    },
    enableEditing() {
      this.isEditing = true;
    },
    cancelEditing() {
      this.isEditing = false; // Cancel editing mode
      this.fetchPost(); // Reload the original post details
    },
    async saveChanges() {
      const postId = this.$route.params.id; // Get the post ID
      try {
        const response = await fetch(`http://localhost:3000/api/posts/${postId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Add token for authentication
          },
          body: JSON.stringify({
            author: this.post.author,
            text: this.post.text,
            image_link: this.post.image_link,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const updatedPost = await response.json();
        alert('Post updated successfully!');
        this.post = updatedPost; // Update the local post object
        this.isEditing = false; // Exit editing mode
      } catch (error) {
        console.error('Error updating post:', error);
        alert('Failed to update the post.');
      }
    },
    async deletePost() {
      const postId = this.$route.params.id; // Get the post ID
      if (!confirm('Are you sure you want to delete this post?')) return;

      try {
        const response = await fetch(`http://localhost:3000/api/posts/${postId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Add token for authentication
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        alert('Post deleted successfully!');
        this.$router.push('/'); // Redirect to main page after deletion
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete the post.');
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
.post-details-page {
  max-width: 600px;
  margin: 20px auto;
  text-align: center;
}

textarea,
input {
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

img {
  max-width: 100%;
  margin: 10px 0;
}

.btn-edit,
.btn-delete,
.btn-save,
.btn-cancel {
  margin: 5px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-edit {
  background-color: #1a73e8;
  color: white;
}

.btn-delete {
  background-color: #f44336;
  color: white;
}

.btn-save {
  background-color: #4caf50;
  color: white;
}

.btn-cancel {
  background-color: gray;
  color: white;
}

.btn-edit:hover {
  background-color: #0d47a1;
}

.btn-delete:hover {
  background-color: #d32f2f;
}

.btn-save:hover {
  background-color: #388e3c;
}

.btn-cancel:hover {
  background-color: #757575;
}
</style>
