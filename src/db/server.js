const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const postRouter = require('../router/Post'); // Import post router
const userRouter = require('../router/User'); // Import user router
const authenticateToken = require('../middleware/authenticateToken'); // Token authentication middleware

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Add log to confirm server initialization
console.log('Initializing routes...');
app.use('/api/posts', authenticateToken, postRouter); // Register post routes
console.log('Post router registered at /api/posts');

app.use('/api/users', userRouter); // Register user routes
console.log('User router registered at /api/users');

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
