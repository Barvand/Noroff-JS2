import { feedProfiles } from "../filters/categories.mjs";
import { popularPosts } from "../filters/categories.mjs";
import { returnToAllPosts } from "../filters/categories.mjs";

export async function createFeedFilteredArrays() {
  try {
  
    const popularButton = document.querySelector("#popular-feed");
    const newPostsButton = document.querySelector("#new-posts");
    const profileButton = document.querySelector("#profiles-tag");

    newPostsButton.addEventListener("click", function () {
      returnToAllPosts();
      newPostsButton.classList.add("active");
      popularButton.classList.remove("active");
      profileButton.classList.remove("active");
    });

    popularButton.addEventListener("click", function () {
      popularPosts();
      popularButton.classList.add("active");
      newPostsButton.classList.remove("active");
      profileButton.classList.remove("active");
    });

    profileButton.addEventListener("click", function () {
      feedProfiles();
      profileButton.classList.add("active");
      popularButton.classList.remove("active"); // Remove "active" from other buttons
      newPostsButton.classList.remove("active"); // Remove "active" from other buttons
    });
  } catch (error) {
    console.error("Error in createFeedFilteredArrays:", error);
  }
}
