import { createPost } from "../api/posts/create.mjs";

// Trick from course assignment video - Creates an object with the keys and values with a single line of code.
/**
 * setCreatePostFormListener retrieves all required data from the html form and creates the post. This function does not require any
 * params, as its hardcoded atm. 
 * It will send a post request with all the data to the API with the function createPost();
 * The API wants the tags to be an array, therefore this function converts string into an Array otherwise it does not work. 
 * returns the user to the feed page after creation of the post.
 */
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

