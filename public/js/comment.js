const postId = document.querySelector('#comment').getAttribute("data-id");

const newCommentHandler = async (event) => {
    event.preventDefault();

    const commentContent = document.querySelector('#comment').value;

    if(commentContent) {
        const response = await fetch('/api/comments', {
            method: 'POST', 
            body: JSON.stringify({
                post_id: postId,
                comment_body: commentContent
            }), 
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            document.location.replace('/');
            console.log(response.json())
        } else {
            alert(response.statusText)
        }
    };
}

document
.querySelector('#newcomment')
.addEventListener('click', newCommentHandler)