const express = require('express');
const jwt = require('jsonwebtoken');
const { pool } = require('../db');
const router = express.Router();

// Middleware to authenticate JWT
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied' });

  jwt.verify(token, 'your_secret_key', (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Fetch all posts
router.get('/', authenticate, async (req, res) => {
  try {
    const posts = await pool.query('SELECT * FROM posts ORDER BY timestamp DESC');
    res.json(posts.rows);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add a new post
router.post('/', authenticate, async (req, res) => {
  const { body } = req.body;
  try {
    const newPost = await pool.query(
      'INSERT INTO posts (body, user_id) VALUES ($1, $2) RETURNING *',
      [body, req.user.id]
    );
    res.status(201).json(newPost.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a post
router.put('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { body } = req.body;
  try {
    const updatedPost = await pool.query(
      'UPDATE posts SET body = $1 WHERE id = $2 RETURNING *',
      [body, id]
    );
    res.json(updatedPost.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a specific post
router.delete('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM posts WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete all posts
router.delete('/', authenticate, async (req, res) => {
  try {
    await pool.query('DELETE FROM posts');
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
