const newPostHandler = async function (event) {
  event.preventDefault();

  const postTitle = document.querySelector('input[name= "post-title"]').value;
  const postBody = document.querySelector('textarea[name="post-body"]').value;

  await fetch("/api/post", {
    method: "POST",
    body: JSON.stringify({
      postTitle,
      postBody,
    }),
    headers: { "content-type": "application/json" },
  });
};

document
  .querySelector("#new-post-form")
  .addEventListener("submit", newPostHandler);
