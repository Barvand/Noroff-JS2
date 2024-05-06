import { createPost } from "../api/posts/create.mjs";

// Trick from course assignment video - Creates an object with the keys and values with a single line of code.
export function setCreatePostFormListener() {
  const form = document.querySelector("#createPost");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const post = Object.fromEntries(formData.entries());

      console.log(post)
      // send it to the API
      createPost(post);

    })
  }
}
