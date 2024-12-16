import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    posts: [],
    token: localStorage.getItem('token') || null, // Load token from localStorage
    user: null, // Store user info after login
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
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token); // Store token in localStorage for persistence
    },
    clearToken(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token'); // Remove token from localStorage
    },
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    async loadPosts({ commit }) {
      try {
        const response = await axios.get('http://localhost:3000/api/posts', {
          headers: {
            Authorization: `Bearer ${this.state.token}`, // Attach token in Authorization header
          },
        });
        commit('setPosts', response.data);
      } catch (error) {
        console.error('Error loading posts:', error.message);
      }
    },
    async likePost({ commit }, postId) {
      try {
        const response = await axios.put(
          `http://localhost:3000/api/posts/${postId}/like`,
          {},
          {
            headers: {
              Authorization: `Bearer ${this.state.token}`, // Attach token in Authorization header
            },
          }
        );
        commit('updatePost', response.data);
      } catch (error) {
        console.error('Error liking post:', error.message);
      }
    },
    async resetLikes({ state, commit }) {
      try {
        const resetPromises = state.posts.map(post =>
          axios.put(
            `http://localhost:3000/api/posts/${post.id}`,
            {
              ...post,
              likes: 0,
            },
            {
              headers: {
                Authorization: `Bearer ${this.state.token}`, // Attach token in Authorization header
              },
            }
          )
        );
        await Promise.all(resetPromises);
        commit('resetLikes');
      } catch (error) {
        console.error('Error resetting likes:', error.message);
      }
    },
    async login({ commit }, { email, password }) {
      try {
        const response = await axios.post('http://localhost:3000/api/users/login', {
          email,
          password,
        });
        const token = response.data.token;
        commit('setToken', token);

        // Optionally, fetch user info after login
        const userResponse = await axios.get('http://localhost:3000/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        commit('setUser', userResponse.data);
      } catch (error) {
        console.error('Error logging in:', error.message);
      }
    },
    async logout({ commit }) {
      commit('clearToken'); // Clear the token and user state
    },
  },
  getters: {
    allPosts: state => state.posts,
    isAuthenticated: state => !!state.token, // Check if user is authenticated
    currentUser: state => state.user, // Get current user info
  },
});
