import { getProfile } from "../api/profiles/read.mjs";
import { renderPostDate } from "./posts.mjs";
import { renderPostImage } from "./posts.mjs";
import { renderPostCard } from "./posts.mjs";

export async function createProfilePostsHTML(profile) {
  const container = document.querySelector("#profilePosts");

  // Clear container
  container.innerHTML = "";

  // Iterate through posts
  profile.posts.forEach((post) => {
    // Create post card element
    const cardWrap = document.createElement("a");
    cardWrap.classList.add("col-md-12", "col-lg-6", "mt-2", "mb-2");
    cardWrap.href = `/feed/post/?id=${post.id}`;
    container.appendChild(cardWrap);

    const postCard = document.createElement("div");
    postCard.classList.add("card", "my-custom-card", "h-100");
    cardWrap.appendChild(postCard);

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("post-image-container");
    postCard.appendChild(imageContainer)

    renderPostImage(post, imageContainer);

      const postTags = document.createElement("p");
      postTags.innerText = `#${post.tags}`;
      postTags.classList.add("border", "m-0", "post-tags");
      imageContainer.appendChild(postTags);

    renderPostCard(post, imageContainer);
    
  });
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
