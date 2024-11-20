import { createStore } from 'vuex';

export default createStore({
  state: {
    posts: [
      {
        id: 1,
        author: 'Alice',
        text: 'Exploring the beauty of autumn in the mountains!',
        image_link: 'https://example.com/image1.jpg',
        likes: 0,
      },
      {
        id: 2,
        author: 'Bob',
        text: 'Loving the new pumpkin spice latte. Fall flavors are the best!',
        image_link: '',
        likes: 0,
      },
    ],
  },
  mutations: {
    incrementLikes(state, postId) {
      const post = state.posts.find(post => post.id === postId);
      if (post) post.likes++;
    },
    resetLikes(state) {
      state.posts.forEach(post => (post.likes = 0));
    },
  },
  actions: {
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
