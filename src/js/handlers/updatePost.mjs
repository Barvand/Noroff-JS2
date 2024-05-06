import { updatePost } from "../api/posts/index.mjs";
import { getPost } from "../api/posts/index.mjs";

export async function setUpdatePostFormListener() {
  const form = document.querySelector("#editPost");

  const url = new URL(location.href);
  const id = url.searchParams.get("id");

  if (form) {
    const button = form.querySelector("button");
    button.disabled = true;

    const post = await getPost(id);

    form.title.value = post.title;
    form.body.value = post.body;
    form.media.value = post.media;

    button.disabled = false;

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const post = Object.fromEntries(formData.entries());
      post.id = id;

      // Retrieve current user details from local storage
      const currentUser = JSON.parse(localStorage.getItem("profile"));

      // Add a check to ensure that the post belongs to the current user
      if (post.author !== currentUser.id) {
        // Display an error message
        const errorMessage = document.createElement("p");
        errorMessage.textContent =
          "You are not authorized to update this post!";
        errorMessage.classList.add("text-danger", "text-center");
        form.appendChild(errorMessage);
        return; // Exit the function, preventing further execution
      }

      // send it to the API
      await updatePost(post);

      // Display a message to indicate successful update
      const successMessage = document.createElement("p");
      successMessage.textContent = "Post updated successfully!";
      successMessage.classList.add("text-success", "text-center");
      form.appendChild(successMessage);

      // Optionally, you can remove the message after a few seconds
      setTimeout(() => {
        form.removeChild(successMessage);
      }, 5000); // Remove message after 5 seconds (5000 milliseconds)
    });
  }
}
