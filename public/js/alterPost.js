const submitUpdate = document.querySelector('#updatePost');
const submitDelete = document.querySelector('#deletePost');

const updatePost = async (event) => {
    event.preventDefault();
}

const deletePost = async (event) => {
    event.preventDefault();
    const postId = event.target.getAttribute('data-id');
    const userId = event.target.getAttribute('data-user-id');

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