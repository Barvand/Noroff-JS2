import { getProfile } from "../api/profiles/read.mjs";
import { renderPostDate } from "./posts.mjs";
import { renderPostImage } from "./posts.mjs";
import { renderPostCard } from "./posts.mjs";
import { renderPostTags } from "./posts.mjs";

export async function createProfilePostsHTML(profile) {
  const container = document.querySelector("#profilePosts");

  // Clear container
  container.innerHTML = "";

  // Iterate through posts
  profile.posts.forEach((post) => {
    // Create post card element
   const cardWrap = document.createElement("div");
   cardWrap.classList.add("col-md-12", "col-lg-6", "mt-2", "mb-2", "mx-auto");
   container.appendChild(cardWrap);

   // Render post image
   renderPostImage(post, cardWrap);

   // Render post tags
   renderPostTags(post, cardWrap);

   // Render post card
   renderPostCard(post, cardWrap);
    
   divBorderBottom(cardWrap);
  });
}

async function divBorderBottom(parentElement) { 
 const divElement = document.createElement("div");
 divElement.classList.add(
   "d-flex",
   "justify-content-end",
   "border-bottom",
   "border-black"
 );
 parentElement.appendChild(divElement);

}


export async function renderProfilePosts() {
  
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get("name"); // Retrieve 'id' query parameter from URL

    if (!name) {
      console.error("ID not found in URL query parameters.");
      return;
    }

    const profile = await getProfile(name); 

    createProfilePostsHTML(profile);
  } catch (error) {
    console.error("Error rendering profile posts:", error);
  }
}
