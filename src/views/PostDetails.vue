<template>
  <div class="post-details-page">
    <div class="form-container">
      <h2>Edit Post</h2>
      <form @submit.prevent="saveChanges">
        <div class="form-group">
          <label for="author">Author</label>
          <input
            id="author"
            type="text"
            v-model="post.author"
            placeholder="Author's name"
            required
          />
        </div>
        <div class="form-group">
          <label for="content">Content</label>
          <textarea
            id="content"
            v-model="post.text"
            placeholder="Post content"
            required
          ></textarea>
        </div>
        <div class="form-group">
          <label for="image">Image URL</label>
          <input
            id="image"
            type="text"
            v-model="post.image_link"
            placeholder="Image URL"
          />
        </div>
        <button type="submit" class="btn-primary">Save Changes</button>
        <button @click.prevent="deletePost" class="btn-danger">Delete Post</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: null, // Placeholder for the post to be edited
    };
  },
  created() {
    const postId = this.$route.params.id;
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    this.post = posts.find((post) => post.id === parseInt(postId));
    if (!this.post) {
      alert('Post not found.');
      this.$router.push('/');
    }
  },
  methods: {
    saveChanges() {
      const posts = JSON.parse(localStorage.getItem('posts')) || [];
      const index = posts.findIndex((p) => p.id === this.post.id);
      if (index !== -1) {
        posts[index] = this.post;
        localStorage.setItem('posts', JSON.stringify(posts));
        alert('Post updated successfully!');
        this.$router.push('/');
      } else {
        alert('Error saving post.');
      }
    },
    deletePost() {
      if (confirm('Are you sure you want to delete this post?')) {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const updatedPosts = posts.filter((post) => post.id !== this.post.id);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
        alert('Post deleted.');
        this.$router.push('/');
      }
    },
  },
};
</script>

<style scoped>
.post-details-page {
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
  margin-bottom: 20px;
  color: #1a73e8;
}
.form-group {
  margin-bottom: 20px;
  text-align: left;
}
label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
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
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
}
.btn-primary:hover {
  background-color: #43a047;
}
.btn-danger {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}
.btn-danger:hover {
  background-color: #d32f2f;
}
</style>
