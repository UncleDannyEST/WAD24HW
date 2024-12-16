CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    author VARCHAR(255) NOT NULL,
    text TEXT NOT NULL,
    image_link TEXT,
    creation_date TIMESTAMP DEFAULT NOW(),
    likes INTEGER DEFAULT 0,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
