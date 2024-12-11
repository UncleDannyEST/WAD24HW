<template>
  <div class="add-post-page">
    <h1>Add New Post</h1>
    <form @submit.prevent="addPost">
      <input v-model="newPost.author" placeholder="Author" required />
      <textarea v-model="newPost.text" placeholder="Post Content" required></textarea>
      <input v-model="newPost.image_link" placeholder="Image URL (optional)" />
      <button type="submit" class="btn-save">Add Post</button>
      <button @click="cancel" class="btn-cancel">Cancel</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newPost: {
        author: '',
        text: '',
        image_link: '',
        creation_date: '',
        likes: 0,
      },
    };
  },
  methods: {
    addPost() {
      if (!this.newPost.author || !this.newPost.text) {
        alert('Author and content are required!');
        return;
      }
      const allPosts = JSON.parse(localStorage.getItem('posts') || '[]');
      const newPost = {
        ...this.newPost,
        id: allPosts.length + 1,
        creation_date: new Date().toISOString().split('T')[0], // Current date
        likes: 0,
      };
      allPosts.push(newPost); // Add new post
      localStorage.setItem('posts', JSON.stringify(allPosts)); // Save to localStorage
      alert('Post added successfully!');
      this.$router.push('/'); // Redirect to main page
    },
    cancel() {
      this.$router.push('/'); // Redirect to main page
    },
  },
};
</script>

<style scoped>
.add-post-page {
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

.btn-save {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-cancel {
  background-color: #f44336;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-save:hover {
  background-color: #45a049;
}

.btn-cancel:hover {
  background-color: #d32f2f;
}
</style>
