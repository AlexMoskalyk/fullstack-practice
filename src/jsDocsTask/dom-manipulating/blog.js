const postForm = document.getElementById('postForm');
const postInput = document.getElementById('postInput');
const postsList = document.getElementById('postsList');

let posts = JSON.parse(localStorage.getItem('posts')) || [];

renderPosts(posts);

// Function to render posts and their comments
function renderPosts(postArray) {
    postsList.innerHTML = ''; // Clear existing posts
    postArray.forEach((post, postIndex) => {
        const postLi = document.createElement('li');

        postLi.innerHTML = `
            <div class="post-content">
                <p>${post.text} <small>(${new Date(post.time).toLocaleString()})</small></p>
            </div>
        `;

        // Add delete post button
        const deletePostBtn = document.createElement('button');
        deletePostBtn.textContent = 'Delete Post';
        deletePostBtn.classList.add('delete-btn');
        deletePostBtn.addEventListener('click', () => deletePost(postIndex));
        postLi.appendChild(deletePostBtn);

        // Comment Section for Each Post
        const commentSection = document.createElement('div');
        const commentList = document.createElement('ul');
        commentList.classList.add('comment-list');
        renderComments(post.comments, commentList, postIndex);

        const commentForm = document.createElement('form');
        commentForm.classList.add('comment-form');
        commentForm.innerHTML = `
            <textarea class="comment-input" placeholder="Add a comment..." required></textarea>
            <button type="submit">Add Comment</button>
        `;

        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const commentText = commentForm.querySelector('.comment-input').value.trim();
            if (commentText) {
                addComment(postIndex, commentText);
                commentForm.querySelector('.comment-input').value = ''; 
            }
        });

        commentSection.appendChild(commentList);
        commentSection.appendChild(commentForm);

        postLi.appendChild(commentSection);
        postsList.appendChild(postLi);
    });
}

// Function to add a new post
postForm.addEventListener('submit',  e =>{
    e.preventDefault();
    const text = postInput.value.trim();
    if (text) {
        const newPost = {
            id: Date.now(),
            text,
            time: Date.now(),
            comments: [] 
        };
        posts.push(newPost);
        localStorage.setItem('posts', JSON.stringify(posts)); 
        postInput.value = ''; 
        renderPosts(posts); 
    }
});

// Function to render comments for a specific post
function renderComments(commentArray, parentElement, postIndex) {
    parentElement.innerHTML = '';
    commentArray.forEach((comment, commentIndex) => {
        const commentLi = document.createElement('li');
        commentLi.innerHTML = `
            <p>${comment.text} <small>(${new Date(comment.time).toLocaleString()})</small></p>
        `;

        // Create Edit and Delete buttons for comments
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit-btn');
        editBtn.addEventListener('click', () => editComment(postIndex, commentIndex));

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => deleteComment(postIndex, commentIndex));

        commentLi.appendChild(editBtn);
        commentLi.appendChild(deleteBtn);
        parentElement.appendChild(commentLi);
    });
}

// Function to add a new comment to a specific post
function addComment(postIndex, commentText) {
    const newComment = {
        text: commentText,
        time: Date.now()
    };
    posts[postIndex].comments.push(newComment); 
    localStorage.setItem('posts', JSON.stringify(posts)); 
    renderPosts(posts); 
}

// Function to edit a comment
function editComment(postIndex, commentIndex) {
    const newCommentText = prompt("Edit your comment:", posts[postIndex].comments[commentIndex].text);
    if (newCommentText) {
        posts[postIndex].comments[commentIndex].text = newCommentText;
        localStorage.setItem('posts', JSON.stringify(posts)); 
        renderPosts(posts);
    }
}

// Function to delete a comment
function deleteComment(postIndex, commentIndex) {
    posts[postIndex].comments.splice(commentIndex, 1); 
    localStorage.setItem('posts', JSON.stringify(posts)); 
    renderPosts(posts); 
}

// Function to delete a post and its associated comments
function deletePost(postIndex) {
    posts.splice(postIndex, 1); 
    localStorage.setItem('posts', JSON.stringify(posts)); 
    renderPosts(posts); 
}
