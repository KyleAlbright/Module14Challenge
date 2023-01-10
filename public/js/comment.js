const postId = document.querySelector("#comment").getAttribute("data-id");

const newCommentHandler = async (event) => {
  event.preventDefault();
  //collects and sets the values
  const commentContent = document.querySelector("#comment").value;

  if (commentContent) {
    //will post a comment in relation to the postID.
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        post_id: postId,
        comment_body: commentContent,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // sends us back to the homepage once the comment has been posted
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector("#newcomment")
  .addEventListener("click", newCommentHandler);
