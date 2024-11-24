import { createStore } from 'vuex';

export default createStore({
  state: {
    posts: [],
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    incrementLikes(state, postId) {
      const post = state.posts.find(post => post.id === postId);
      if (post) {
        post.likes++;
      }
      this.commit('savePostsToLocalStorage');  // Save updated posts to localStorage
    },
    resetLikes(state) {
      state.posts.forEach(post => (post.likes = 0));
      this.commit('savePostsToLocalStorage');  // Save reset posts to localStorage
    },
    savePostsToLocalStorage(state) {
      // Save posts with likes to localStorage
      localStorage.setItem('posts', JSON.stringify(state.posts));
    },
  },
  actions: {
    async loadPosts({ commit }) {
      try {
        // Load data from the 'data.json' file located in the public folder
        const response = await fetch('/data.json');
        const posts = await response.json();

        // Add a unique 'id' and 'likes' field to each post
        const postsWithId = posts.map((post, index) => ({
          ...post,
          id: index + 1, // Simple unique ID based on the index
          likes: 0, // Initialize likes to 0
        }));

        // Check if we have posts saved in localStorage
        const savedPosts = localStorage.getItem('posts');
        if (savedPosts) {
          const savedPostsData = JSON.parse(savedPosts);

          // Merge the posts with their saved likes from localStorage
          savedPostsData.forEach(savedPost => {
            const post = postsWithId.find(p => p.id === savedPost.id);
            if (post) {
              post.likes = savedPost.likes;  // Set the likes from localStorage
            }
          });
        }

        // Commit the posts to the store
        commit('setPosts', postsWithId);
      } catch (error) {
        console.error('Error loading posts:', error);
      }
    },
    likePost({ commit }, postId) {
      commit('incrementLikes', postId);
    },
    resetLikes({ commit }) {
      commit('resetLikes');
    },
  },
  getters: {
    allPosts: state => state.posts,
  },
});
