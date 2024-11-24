// Load Header Component
/*
fetch('components/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header').innerHTML = data;
    })
    .catch(error => console.error('Error loading header:', error));

// Load Footer Component
fetch('components/footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer').innerHTML = data;
    })
    .catch(error => console.error('Error loading footer:', error));
*/


// Variables
const postList = document.getElementById('post-list');
const resetLikesButton = document.getElementById('reset-likes');
let posts = [];

// Fetch and display posts dynamically
if (postList) {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            posts = data.map(post => ({ ...post, likes: 0 }));
            displayPosts();
        })
        .catch(error => console.error('Error fetching posts:', error));
}

// Display posts on the page
function displayPosts() {
    postList.innerHTML = '';
    posts.forEach((post, index) => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <h2>${post.author}</h2>
            <p>${post.text}</p>
            ${post.image_link ? `<img src="${post.image_link}" alt="Post Image">` : ''}
            <p>Likes: <span id="like-count-${index}">${post.likes}</span></p>
            <img src="res/images/thumbsup.jpg" alt="Like" class="like-button" onclick="likePost(${index})">
        `;
        postList.appendChild(postElement);
    });
}

// Handle "Like" button clicks
function likePost(index) {
    posts[index].likes++;
    document.getElementById(`like-count-${index}`).textContent = posts[index].likes;
}

// Reset all likes
if (resetLikesButton) {
    resetLikesButton.addEventListener('click', () => {
        posts.forEach(post => (post.likes = 0));
        displayPosts();
    });
}

// Form validation for Login
// Validate the password based on given conditions
function validatePassword() {
    const password = document.getElementById('password').value;
    const errorElement = document.getElementById('password-error');
    errorElement.textContent = ''; // Clear previous errors

    const errors = [];

    // Condition checks
    if (password.length < 8 || password.length >= 15) {
        errors.push('At least 8 chars and less than 15 chars.');
    }
    if (!/^[A-Z]/.test(password)) {
        errors.push('Should start with an uppercase alphabet.');
    }
    if (!/[A-Z]/.test(password)) {
        errors.push('Includes at least one uppercase alphabet character.');
    }
    if (!/[a-z].*[a-z]/.test(password)) {
        errors.push('Includes at least two lowercase alphabet characters.');
    }
    if (!/\d/.test(password)) {
        errors.push('Includes at least one numeric value.');
    }
    if (!/_/.test(password)) {
        errors.push('Includes the character "_".');
    }

    // Display errors if any
    if (errors.length > 0) {
        errorElement.textContent = `The password is not valid - ${errors.join(' ')}`;
        return false; // Prevent form submission
    }

    // Password is valid
    errorElement.textContent = '';
    return true;
}