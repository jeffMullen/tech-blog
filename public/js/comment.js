const commentSubmit = document.querySelector('#commentSubmit');

const createComment = async (event) => {
    event.preventDefault();

    const postId = event.target.getAttribute('data-post-id');
    const userId = event.target.getAttribute('data-user-id');
    const content = document.querySelector('#commentContent').value.trim();

    const input = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({
            content: content,
            user_id: userId,
            post_id: postId
        }),
        headers: { 'Content-Type': 'application/json' }
    })

    if (input.ok) {
        document.location.replace(`/posts/${postId}`);
    }
}

commentSubmit.addEventListener('click', createComment);