const editPostHandler = async function (postId, method) {
  //sets the values equal to the what we have set up in our models
  const postTitle = document.querySelector('input[name= "post-title"]').value;
  const postBody = document.querySelector('textarea[name="post-body"]').value;

  // we set the method for this in our handlebars with an onclick event. So the method,
  // will be set depending on the button clicked. DELETE is the delete, PUT is the edit
  // the rest is the same logic as the post.js
  if (postTitle && postBody) {
    const response = await fetch(`/api/posts/${postId}`, {
      method: method,
      body: JSON.stringify({
        title: postTitle,
        post_body: postBody,
      }),
      headers: { "content-type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("failed to edit post");
    }
  }
};
