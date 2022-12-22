const postId = document.querySelector('input[name="post-id]').ariaValueMax;

const newCommentHandler = async (event) => {
    event.preventDefault();

    const commentContent = document.querySelector('textarea[name="comment-body"]').value;

    if(commentContent) {
        const response = await fetch('/api/comments', {
            method: 'POST', 
            body: JSON.stringify({
                postId, 
                commentContent
            }), 
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText)
        }
    };
}

document
.querySelector('#newcomment')
.addEventListener('submit', newCommentHandler)