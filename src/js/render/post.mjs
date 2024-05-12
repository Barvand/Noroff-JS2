import { getPost } from "../api/posts/read.mjs";
import { getProfile } from "../api/profiles/read.mjs";
import { createPostsHTML } from "./posts.mjs";
// calling the individual post through this page instead of the index file. 
// As I did not figure out how yet. Due to the query parameters



// The individual post have a button where you can edit the post with. 
async function editPostButton(post, parentElement) { 
  const divElement = document.createElement("div"); 
  divElement.classList.add("container-md", "col-md-12","col-lg-7","mt-2","mb-2","mx-auto");
  parentElement.appendChild(divElement)

const editPost = document.createElement("a");
editPost.classList.add("btn", "btn-success", "mt-3", "w-100");
editPost.href = `/feed/post/edit/?id=${post.id}`;
editPost.innerText = `Edit post`;
divElement.appendChild(editPost);

const editPostMessage = document.createElement("p"); 
editPostMessage.innerText = `You can only edit posts that you have created.`
editPostMessage.classList.add("text-danger", "text-center", "fw-bold")
divElement.appendChild(editPostMessage);
}

export async function renderSinglePost(parentElement) {
  // Get the post ID from the query string
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const id = params.get("id"); // Extract the ID from the query string
  try {
    // Fetch the post data based on the ID
    const post = await getPost(id);

    // Render the post with the fetched data
    createPostsHTML(post, parentElement);
    editPostButton(post, parentElement);
  } catch (error) {
    console.error("Error fetching or rendering post:", error);
  }
}






