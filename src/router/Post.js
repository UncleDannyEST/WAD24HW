const express = require('express');
const pool = require('../db');
const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();

// Add a new post
router.post('/', authenticateToken, async (req, res) => {
  const { author, text, image_link } = req.body;
  const userId = req.user.userId; // Extracted from the JWT

  if (!author || !text) {
    return res.status(400).json({ error: 'Author and text are required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO posts (author, text, image_link, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [author, text, image_link, userId]
    );
    res.json(result.rows[0]); // Return the created post
  } catch (error) {
    console.error('Error adding post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Fetch all posts
router.get('/', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM posts ORDER BY creation_date DESC');
    res.json(result.rows); // Return all posts
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Fetch a single post by ID
router.get('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(result.rows[0]); // Return the post
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Like a post (increment likes)
router.put('/:id/like', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(result.rows[0]); // Return the updated post
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a single post by ID
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json({ message: `Post ${id} deleted successfully.` });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete all posts
router.delete('/', authenticateToken, async (req, res) => {
  try {
    await pool.query('DELETE FROM posts');
    res.status(200).json({ message: 'All posts deleted successfully' });
  } catch (error) {
    console.error('Error deleting all posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { author, text, image_link } = req.body;
    const userId = req.user.userId; // Ensure user has access to modify
  
    if (!author || !text) {
      return res.status(400).json({ error: 'Author and text are required' });
    }
  
    try {
      const result = await pool.query(
        'UPDATE posts SET author = $1, text = $2, image_link = $3 WHERE id = $4 AND user_id = $5 RETURNING *',
        [author, text, image_link, id, userId]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Post not found or unauthorized' });
      }
      res.json(result.rows[0]); // Return the updated post
    } catch (err) {
      console.error('Error updating post:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;
