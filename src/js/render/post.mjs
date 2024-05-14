import { getPost } from "../api/posts/read.mjs";
import { getProfile } from "../api/profiles/read.mjs";
import { createPostsHTML } from "./posts.mjs";
import { setDeletePostFormListener } from "../handlers/deletePost.mjs";
import { load } from "../storage/index.mjs";

// The individual post have a button where you can edit the post with.
async function editPostButton(post, parentElement, currentUser) {
  // Check if the current user is viewing their own post
  if (post.author.name === currentUser.name) {
    const divElement = document.createElement("div");
    divElement.classList.add("container-md", "col-md-12", "col-lg-7", "mt-2", "mb-2", "mx-auto");
    parentElement.appendChild(divElement);

    const editPost = document.createElement("a");
    editPost.classList.add("btn", "btn-success", "mt-3", "w-100");
    editPost.href = `/feed/post/edit/?id=${post.id}`;
    editPost.innerText = `Edit post`;
    divElement.appendChild(editPost);

    const editPostMessage = document.createElement("p");
    editPostMessage.innerText = `You can only edit posts that you have created.`;
    editPostMessage.classList.add("text-danger", "text-center", "fw-bold");
    divElement.appendChild(editPostMessage);
  }
}

// The individual post have a button where you can edit the post with.
async function removePostButton(post, parentElement, currentUser) {
  // Check if the current user is viewing their own post
  if (post.author.name === currentUser.name) {
    const divElement = document.createElement("div");
    divElement.classList.add(
      "container-md",
      "col-md-12",
      "col-lg-7",
      "mt-2",
      "mb-2",
      "mx-auto"
    );
    parentElement.appendChild(divElement);

    const deletePost = document.createElement("p");
    deletePost.classList.add("btn", "btn-danger", "mt-3", "lg-w-25");
    deletePost.innerText = `Delete post`;
    divElement.appendChild(deletePost);


    // event listener - might need to put this somewhere else.
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
    editPostButton(post, parentElement, currentUser); // Pass currentUser to editPostButton
    removePostButton(post, parentElement, currentUser); // Pass currentUser to removePostButton
  } catch (error) {
    console.error("Error fetching or rendering post:", error);
  }
}






