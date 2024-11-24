// persistedState.js
export function createPersistedState() {
    return (store) => {
      const savedState = localStorage.getItem('vuexState');
      if (savedState) {
        console.log("Restoring state from localStorage...");
        store.replaceState(Object.assign(store.state, JSON.parse(savedState)));
      }
  
      store.subscribe((mutation, state) => {
        console.log("Saving state to localStorage...", state);
        localStorage.setItem('vuexState', JSON.stringify(state));
      });
    };
  }
  