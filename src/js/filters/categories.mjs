import { getPosts } from "../api/posts/read.mjs"; 
import { getProfiles } from "../api/profiles/read.mjs";
import { createPostsHTML, renderAllPosts } from "../render/posts.mjs";
import { renderProfilesFeedPage } from "../render/profile.mjs";
import { createLoadMoreBtnProfiles } from "../render/loadMoreBtn.mjs";
import { createLoadMoreBtn } from "../render/loadMoreBtn.mjs";


// fetching outside the functions to not have to call the api 3 times. All functions uses a copy of the result array. 
// except for profiles as they uses a different fetch URL!

const result = await getPosts();

const resultContainer = document.querySelector("#feed-container");

export async function popularPosts() {
  try {
    
    const posts = [...result];
    let reactionsArray = [];

    resultContainer.innerHTML = "";

    for (let i = 0; i < posts.length; i++) {
      const reactions = posts[i].reactions.length;
      if (reactions >= 1) {
        reactionsArray.push(posts[i]);
      }
    }

    // Sort reactionsArray by the number of reactions in descending order
    reactionsArray.sort((a, b) => b.reactions.length - a.reactions.length);

    // Display sorted posts
    for (let i = 0; i < reactionsArray.length; i++) {
      createPostsHTML(reactionsArray[i], resultContainer);
    }
    

    return reactionsArray;
  } catch (error) {
    console.error("Error in categoryInvestment:", error);
  }
}





export async function returnToAllPosts() {
  try {

    const posts = [...result];

    resultContainer.innerHTML = ""; // Clear the container before adding new posts

    for (let i = 0; i < posts.length; i++) {
      // Loop through all post
      createPostsHTML(posts[i], resultContainer);
    }


    return posts; // Return allPosts array after looping through all posts
  } catch (error) {
    console.error("Error in returnToAllPosts:", error);
  }
}


export async function feedProfiles() {
  try {

    const allProfiles = await getProfiles();

    resultContainer.innerHTML = "";

    for (let i = 0; i < allProfiles.length; i++) {
      renderProfilesFeedPage(allProfiles[i], resultContainer);
    }


    return profiles; 

    
  } catch (error) {
    console.error("Error in feedProfiles:", error);
  }
}
