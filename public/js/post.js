const newPostHandler = async function (event) {
  event.preventDefault();

  const postTitle = document.querySelector('input[name= "post-title"]').value;
  const postBody = document.querySelector('textarea[name="post-body"]').value;


  if (postTitle && postBody){
 const response =  await fetch("/api/posts", {
    method: "POST",
    body: JSON.stringify({
      title: postTitle,
      post_body: postBody,
    }),
    headers: { "content-type": "application/json" },
  });
  if (response.ok) {
    document.location.replace('/dashboard')
  } else {
    alert('failed to create new post')
  }
};
}

document
  .querySelector("#new-post-form")
  .addEventListener("submit", newPostHandler);


  