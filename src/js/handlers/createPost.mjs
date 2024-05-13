import { createPost } from "../api/posts/create.mjs";

// Trick from course assignment video - Creates an object with the keys and values with a single line of code.
export async function setCreatePostFormListener() {
  const form = document.querySelector("#createPost");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);

      // Convert tags string to an array
      const tagsString = formData.get("tags");
      const tagsArray = tagsString
        .split(" ")
        .filter((tag) => tag.trim() !== "");

      // Create post object with tags as an array
      const post = {
        title: formData.get("title"),
        body: formData.get("body"),
        tags: tagsArray,
        media: formData.get("media"),
      };

      // send it to the API
      await createPost(post);

      // After post creation, redirect to the feed page
      window.location.href = "/feed";
      
    });
  }
}
