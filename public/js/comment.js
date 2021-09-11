const commentSubmit = document.querySelector('#commentSubmit');

const createComment = async (event) => {
    event.preventDefault();

    const postId = event.target.getAttribute('data-post-id');
    const content = document.querySelector('#commentContent');

    if (content.value !== '') {
        const input = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                content: content.value.trim(),
                post_id: postId
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        if (input.ok) {
            document.location.replace(`/posts/${postId}`);
        }
    } else {
        content.setAttribute('placeholder', 'Please enter a comment')
    }

}

commentSubmit.addEventListener('click', createComment);