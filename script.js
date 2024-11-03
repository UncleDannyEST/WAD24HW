// Toggle Dropdown Menu
function toggleDropdown() {
    const dropdownMenu = document.getElementById('dropdownMenu');
    dropdownMenu.classList.toggle('show-dropdown');
}

// Fetch and display posts from JSON endpoint
/*document.addEventListener('DOMContentLoaded', function () {
    const postList = document.getElementById('post-list');

    // Fetch posts from the JSONBin endpoint or local file
    fetch('https://api.jsonbin.io/v3/b/67249a43ad19ca34f8c21328', {
        headers: {
            'X-Master-Key': '$2a$10$iWtK6y3LNldIMiMUXV4Ozu0VdTQTBMNc0ZUH4C92PlB8UDRo1UfJe' // Replace with your actual API key
        }
    })
    .then(response => response.json())
    .then(data => {
        const posts = data.record || data; // Use data.record if the endpoint response nests data

        posts.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.classList.add('post');

            const postTitle = document.createElement('h2');
            postTitle.textContent = post.author;

            const postDate = document.createElement('p');
            postDate.textContent = `Created on: ${post.creation_date}`;
            postDate.style.fontSize = '0.9rem';
            postDate.style.color = '#777';

            const postContent = document.createElement('p');
            postContent.textContent = post.text;

            if (post.image_link) {
                const postImage = document.createElement('img');
                postImage.src = post.image_link;
                postImage.alt = "Post Image";
                postImage.style.width = '100%';
                postDiv.appendChild(postImage);
            }

            postDiv.appendChild(postTitle);
            postDiv.appendChild(postDate);
            postDiv.appendChild(postContent);
            postList.appendChild(postDiv);
        });
    })
    .catch(error => {
        console.error("Error fetching posts:", error);
    });
});
*/
// Fetch and display posts from local data.json file
document.addEventListener('DOMContentLoaded', function () {
    const postList = document.getElementById('post-list');

    fetch('data.json')  // Path to local JSON file
        .then(response => {
            if (!response.ok) throw new Error("Could not load data.json");
            return response.json();
        })
        .then(data => {
            const posts = data; // Adjust this if the data has a nested structure

            posts.forEach(post => {
                const postDiv = document.createElement('div');
                postDiv.classList.add('post');

                const postTitle = document.createElement('h2');
                postTitle.textContent = post.author;

                const postDate = document.createElement('p');
                postDate.textContent = `Created on: ${post.creation_date}`;
                postDate.style.fontSize = '0.9rem';
                postDate.style.color = '#777';

                const postContent = document.createElement('p');
                postContent.textContent = post.text;

                const profilePic = document.createElement('img');
                profilePic.src = 'res/images/me.png';
                profilePic.alt = 'Profile Picture';
                profilePic.classList.add('profile-picture');
                postDiv.appendChild(profilePic);

                postDiv.appendChild(postTitle);
                postDiv.appendChild(postDate);

                if (post.image_link) {
                    const postImage = document.createElement('img');
                    postImage.src = post.image_link;
                    postImage.alt = "Post Image";
                    postImage.style.width = '100%';
                    postDiv.appendChild(postImage);
                }

                
                postDiv.appendChild(postContent);
                // Create the thumbs-up icon and style it
                const thumbsUp = document.createElement('img');
                thumbsUp.src = 'res/images/thumbsup.jpg';
                thumbsUp.alt = 'Thumbs Up';
                thumbsUp.classList.add('thumbs-up');

                
                postDiv.appendChild(thumbsUp); 
                postList.appendChild(postDiv);
            });
        })
        .catch(error => {
            console.error("Error loading posts:", error);
        });
});
