import { getPosts } from "../api/posts/read.mjs";
import { createPostsHTML } from "../render/posts.mjs";



export async function searchBar() {
  const searchInput = document.getElementById("searchBar");
  const searchResultsContainer = document.querySelector("#feed-container");

  const allPosts = await getPosts();

  function performSearch(query) {
    searchResultsContainer.innerHTML = "";

    // If query is an empty string
    if (query === "") {
      allPosts.forEach((post) => {
        createPostsHTML(post, searchResultsContainer);
      });
            return;
    }

    // Filter posts based on the query
    const filteredPosts = allPosts.filter((post) => {
      return (
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.id.toString().toLowerCase().includes(query.toLowerCase())
      );
    });

    // Render search results
    filteredPosts.forEach((post) => {
      createPostsHTML(post, searchResultsContainer);
    });
  }

  // Initial call to performSearch to display all posts
  performSearch("");

  // Event listener for input field value changes
  searchInput.addEventListener("input", function () {
    const query = searchInput.value.trim();
    performSearch(query);
  });
}

// Call searchBar function to initialize the search functionality
searchBar();

