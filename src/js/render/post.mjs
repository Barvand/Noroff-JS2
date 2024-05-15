import { getPost } from "../api/posts/read.mjs";
import { getProfile } from "../api/profiles/read.mjs";
import { createPostsHTML } from "./posts.mjs";
import { setDeletePostFormListener } from "../handlers/deletePost.mjs";
import { load } from "../storage/index.mjs";

// The individual post have a button where you can edit the post with.
async function addPostButton(post, parentElement, currentUser) {
  // Check if the current user is viewing their own post
  if (post.author.name === currentUser.name) {
    const divElement = document.createElement("div");
    divElement.classList.add(
      "container-md",
      "col-md-12",
      "col-lg-6",
      "mt-2",
      "mb-2",
      "mx-auto",
      "d-flex",
      "justify-content-between"
  
    );
    parentElement.appendChild(divElement);

    // Create and append the edit button
    const editPost = document.createElement("a");
    editPost.classList.add(
      "btn",
      "btn-success",
      "mt-3",
      "h-50",
      "text-center"
    );
    editPost.href = `/feed/post/edit/?id=${post.id}`;
    editPost.innerText = `Edit post`;
    divElement.appendChild(editPost);

    // Create and append the delete button
    const deletePost = document.createElement("p");
    deletePost.classList.add("btn", "btn-danger", "mt-3", "lg-w-25", "text-center")
    deletePost.innerText = `Delete post`;
    divElement.appendChild(deletePost);

    // Add event listener for the delete button
    deletePost.addEventListener("click", (event) => {
      setDeletePostFormListener();
    });
  }
}



export async function renderSinglePost(parentElement) {
  const currentUser = load("profile")
  // Get the post ID from the query string
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const id = params.get("id"); // Extract the ID from the query string
  try {
    // Fetch the post data based on the ID
    const post = await getPost(id);

    // Render the post with the fetched data
    createPostsHTML(post, parentElement);
    addPostButton(post, parentElement, currentUser);
  } catch (error) {
    console.error("Error fetching or rendering post:", error);
  }
}






