const submitUpdate = document.querySelector('#updatePost');
const submitDelete = document.querySelector('#deletePost');
const editPost = document.querySelector('.post-heading');

const postId = editPost.getAttribute('data-id');
const userId = editPost.getAttribute('data-user-id');

const updatePost = async (event) => {
    event.preventDefault();

    let title = document.querySelector('#newPostTitle').value.trim();
    const content = document.querySelector('#newPostContent').value.trim();

    if (title === '') {
        title = document.querySelector('#former-title').innerHTML;
    }

    const postUpdate = await fetch(`/api/dashboard/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({
            title: title,
            content: content
        }),
        headers: { 'Content-Type': 'application/json' }
    })

    if (postUpdate.ok) {
        document.location.replace(`/dashboard/${userId}`);
    } else {
        alert('Failed to update post')
    }
}

const deletePost = async (event) => {
    event.preventDefault();

    const response = await fetch(`/api/dashboard/posts/${postId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        document.location.replace(`/dashboard/${userId}`);
    } else {
        alert('Failed to delete post');
    }
}

submitUpdate.addEventListener('click', updatePost);
submitDelete.addEventListener('click', deletePost);