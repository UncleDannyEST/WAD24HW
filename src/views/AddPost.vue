<template>
  <div class="add-post-page">
    <h1>Add New Post</h1>
    <form @submit.prevent="addPost">
      <input 
        v-model="newPost.author" 
        type="text" 
        placeholder="Author" 
        required 
      />
      <textarea 
        v-model="newPost.text" 
        placeholder="Post Content" 
        required
      ></textarea>
      <input 
        v-model="newPost.image_link" 
        type="text" 
        placeholder="Image URL (optional)"
      />
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
      },
    };
  },
  methods: {
    async addPost() {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:3000/api/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(this.newPost),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const addedPost = await response.json();
        console.log('Post added:', addedPost);
        this.$router.push('/'); // Redirect to the main page
      } catch (error) {
        console.error('Error adding post:', error);
        alert(error.message);
      }
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
