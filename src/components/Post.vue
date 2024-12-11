<template>
  <div class="post">
    <h3>{{ post.author }}</h3>
    <p>{{ post.text }}</p>
    <img v-if="post.image_link" :src="post.image_link" alt="Post Image" />
    <p>Likes: {{ post.likes || 0 }}</p>
    <p class="post-date">Posted on: {{ formattedDate }}</p>
    <img 
      src="thumbsup.jpg" 
      alt="Like"
      @click="likePost"
      class="like-button"
    />
  </div>
</template>

<script>
export default {
  props: ['post'],
  computed: {
    formattedDate() {
      const date = new Date(this.post.creation_date);
      return date.toLocaleDateString();
    },
  },
  methods: {
    likePost() {
      this.post.likes = (this.post.likes || 0) + 1;
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

.post-date {
  font-size: 0.9em;
  color: #777;
  margin-top: 10px;
}
</style>
