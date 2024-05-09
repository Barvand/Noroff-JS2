import { getPosts } from "../api/posts/read.mjs";
import { createPostsHTML } from "./posts.mjs";

export async function createLoadMoreBtn(parentElement) {

    const feedContainer = document.querySelector("#feed-container");
  parentElement.innerHTML = "";
  const loadButton = document.createElement("button");
  loadButton.classList.add("btn", "btn-succes", "text-white","w-100");
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
  });
}