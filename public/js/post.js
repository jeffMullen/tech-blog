const submitCreate = document.querySelector('#submitPost');

const createPost = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#newPostTitle').value.trim();
    const content = document.querySelector('#newPostContent').value.trim();
    const userId = event.target.getAttribute('data-id');

    if (title && content) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                content: content,
                user_id: userId
            }),
            headers: { 'Content-Type': 'application/json' }
        })

        if (response.ok) {
            document.location.replace(`/dashboard/${userId}`);
        } else {
            alert('Please make sure all fields are filled');
        }
    };
};

submitCreate.addEventListener('click', createPost);