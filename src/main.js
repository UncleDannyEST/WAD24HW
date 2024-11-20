import { createApp } from 'vue';
import App from './App.vue';
import store from './store'; // Import Vuex store
import router from './router'; // Import Vue Router

createApp(App)
  .use(store) // Use Vuex store
  .use(router) // Use Vue Router
  .mount('#app'); // Mount the app to the DOM
