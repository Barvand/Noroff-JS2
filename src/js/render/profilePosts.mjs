import { getProfile } from "../api/profiles/read.mjs";

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

    // Create image element
    const postImage = document.createElement("img");
    postImage.classList.add("card-img-top");
    postImage.alt = post.title;

    // Check if post has media
    if (post.media) {
      postImage.src = post.media;
    } else {
      // If no media available, set a default picture
      postImage.src = "/images/dogpost.jpg"; // Replace "default-image.jpg" with your default image URL
    }

    // Append image to post card
    postCard.appendChild(postImage);

    // The body of the text elements.
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    postCard.appendChild(cardBody);

    // Create and append title element
    const postTitle = document.createElement("h2");
    postTitle.classList.add("display-6");
    postTitle.innerText = post.title;
    cardBody.appendChild(postTitle);

    const postBody = document.createElement("p");
    postBody.innerText = post.body;
    cardBody.appendChild(postBody);

    const postTag = document.createElement("p");
    postTag.innerText = `This is just for convenience PostID ${post.id}`;
    cardBody.appendChild(postTag);

    const timestamp = new Date(post.created);
    const day = timestamp.getDate();
    const month = timestamp.getMonth() + 1; // Adding 1 because months are zero-based
    const year = timestamp.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    const postDate = document.createElement("p");
    postDate.innerText = `Posted on ${formattedDate}`;
    cardBody.appendChild(postDate);
  });
}


export async function renderProfilePosts() {
  
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id"); // Retrieve 'id' query parameter from URL

    if (!id) {
      console.error("ID not found in URL query parameters.");
      return;
    }

    const profile = await getProfile(id); 

    createProfilePostsHTML(profile);
  } catch (error) {
    console.error("Error rendering profile posts:", error);
  }
}



renderProfilePosts();