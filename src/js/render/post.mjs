import { getPost } from "../api/posts/read.mjs";
import { getProfile } from "../api/profiles/read.mjs";
import { createPostsHTML } from "./posts.mjs";
// calling the individual post through this page instead of the index file. 
// As I did not figure out how yet. Due to the query parameters



// The individual post have a button where you can edit the post with. 
async function editPostButton(post, parentElement) { 
const editPost = document.createElement("a");
editPost.classList.add("btn", "btn-success", "w-100", "mt-3");
editPost.href = `/feed/post/edit/?id=${post.id}`;
editPost.innerText = `Edit post`;
parentElement.appendChild(editPost);

const editPostMessage = document.createElement("p"); 
editPostMessage.innerText = `You can only edit posts that you have created.`
editPostMessage.classList.add("text-warning", "text-center")
parentElement.appendChild(editPostMessage);
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





// export function renderPostTemplate(postData) {
//   const post = document.createElement("div")
//   post.classList.add("col-md-12", "col-lg-7", "mt-2", "mb-2", "mx-auto");
//   post.innerText = postData.title

//   const postImage = document.createElement("img"); 
//   postImage.classList.add("card-img-top");
//   postImage.alt = postData.title
//   if (postData.media) {
//     postImage.src = postData.media;
//   } else {
//     postImage.src = "/images/holidaypicture.jpg";
    

//     post.appendChild(postImage); // Example of setting a default image source
//   }
//   return post
// }


// export function renderPost(postData, parent) {
//   parent.append(renderPostTemplate(postData))
// }



// export function renderPostTemplates(postDataList, parent) { 
//   parent.append(...postDataList.map(renderPostTemplate));
// }




