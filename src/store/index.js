import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    posts: [],
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    updatePost(state, updatedPost) {
      const index = state.posts.findIndex(post => post.id === updatedPost.id);
      if (index !== -1) {
        state.posts.splice(index, 1, updatedPost);
      }
    },
    resetLikes(state) {
      state.posts.forEach(post => (post.likes = 0));
    },
  },
  actions: {
    async loadPosts({ commit }) {
      try {
        // Fetch posts from the backend
        const response = await axios.get('http://localhost:3000/api/posts');
        commit('setPosts', response.data);
      } catch (error) {
        console.error('Error loading posts:', error.message);
      }
    },
    async likePost({ commit }, postId) {
      try {
        // Send a PUT request to increment likes
        const response = await axios.put(`http://localhost:3000/api/posts/${postId}/like`);
        commit('updatePost', response.data); // Update the post in the state
      } catch (error) {
        console.error('Error liking post:', error.message);
      }
    },
    async resetLikes({ state, commit }) {
      try {
        // Reset likes in the backend (if applicable)
        const resetPromises = state.posts.map(post =>
          axios.put(`http://localhost:3000/api/posts/${post.id}`, {
            ...post,
            likes: 0, // Reset likes to 0
          })
        );
        await Promise.all(resetPromises);

        // Update the state after resetting
        commit('resetLikes');
      } catch (error) {
        console.error('Error resetting likes:', error.message);
      }
    },
  },
  getters: {
    allPosts: state => state.posts,
  },
});
