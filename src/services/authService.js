import { reactive } from 'vue';

const USERS_KEY = 'users'; // LocalStorage key for storing users

// Load users from localStorage or initialize with default test users
let users = JSON.parse(localStorage.getItem(USERS_KEY)) || [
  { email: 'testuser1@example.com', password: 'password123' },
  { email: 'testuser2@example.com', password: 'securepass456' },
];

// Save users to localStorage
const saveUsers = () => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Reactive state for authentication
export const loginState = reactive({
  isLoggedIn: false,
  currentUser: null,
});

export const authService = {
  // Register a new user
  register(email, password) {
    if (users.some((user) => user.email === email)) {
      throw new Error('This email is already registered.');
    }
    const newUser = { email, password };
    users.push(newUser); // Add the new user
    saveUsers(); // Save updated users to localStorage
    console.log('New user registered:', newUser); // Debugging
  },

  // Validate user credentials and login
  login(email, password) {
    const user = users.find((user) => user.email === email && user.password === password);
    if (!user) {
      throw new Error('Invalid email or password.');
    }
    loginState.isLoggedIn = true;
    loginState.currentUser = user;
    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('currentUser', JSON.stringify(user));
    console.log('Logged in user:', user); // Debugging
  },

  // Logout the current user
  logout() {
    loginState.isLoggedIn = false;
    loginState.currentUser = null;
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    console.log('User logged out.'); // Debugging
  },

  // Get all users (for debugging)
  getAllUsers() {
    return users;
  },
};
