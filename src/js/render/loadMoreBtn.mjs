import { getPosts } from "../api/posts/read.mjs";
import { createPostsHTML } from "./posts.mjs";
import { getProfiles } from "../api/profiles/read.mjs";
import { renderProfilesFeedPage } from "./profile.mjs";

export async function createLoadMoreBtn(parentElement) {

  const feedContainer = document.querySelector("#feed-container");
  parentElement.innerHTML = "";
  const loadButton = document.createElement("button");
  loadButton.classList.add("btn", "btn-primary", "text-white", "w-100");
  loadButton.innerText = "Load more";
  parentElement.appendChild(loadButton);

  const limit = 100; // Number of posts to fetch per request
  let offset = 100; // Initial offset

  loadButton.addEventListener("click", async () => {
    const posts = await getPosts(limit, offset);
    posts.forEach((post) => {
      createPostsHTML(post, feedContainer);
    });
    offset += limit;

    if (offset >= 500) {
      loadButton.style.display = "none"; // Hide the button
    }
  });
}





export async function createLoadMoreBtnProfiles(parentElement) {

  const feedContainer = document.querySelector("#feed-container");
  const loadButton = document.createElement("button");
  loadButton.classList.add("btn", "btn-primary", "text-white", "w-100");
  loadButton.innerText = "Load more";
  parentElement.appendChild(loadButton);

  const limit = 100; // Number of profiles to fetch per request
  let offset = 100; // Initial offset

  loadButton.addEventListener("click", async () => {
    try {
      const profiles = await getProfiles(limit, offset); // Assuming you have a function getProfiles(limit, offset) somewhere
      profiles.forEach((profile) => {
        renderProfilesFeedPage(profile, feedContainer);
      });
      offset += limit;

      if (offset >= 500) {
        loadButton.style.display = "none"; // Hide the button
      }
    } catch (error) {
      console.error("Error loading more profiles:", error);
    }
  });
}