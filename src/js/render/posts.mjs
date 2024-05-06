import { getPosts } from "../api/posts/read.mjs";

export async function createPostsHTML(post, parentElement) {
  
    // Create post card element
    const cardWrap = document.createElement("a");
    cardWrap.classList.add("col-md-12", "col-lg-6", "mt-2", "mb-2");
    cardWrap.href = `/feed/post/?id=${post.id}`;
    parentElement.appendChild(cardWrap);

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
    postTag.innerText = `This is just for convenience PostID` + post.id;
    cardBody.appendChild(postTag);

    const timestamp = new Date(post.created);
    const day = timestamp.getDate();
    const month = timestamp.getMonth() + 1; // Adding 1 because months are zero-based
    const year = timestamp.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;


     const postDate = document.createElement("p");
     postDate.innerText = `Posted on ` +  formattedDate;
     cardBody.appendChild(postDate);

    const postAvatar = document.createElement("img");
    postAvatar.src = post.author.avatar;
    postAvatar.href = post.author.name;
    postAvatar.classList.add("rounded-circle","border-success","border", "border-3","profile-picture-posts");
    cardBody.appendChild(postAvatar);
    
    const postAuthor = document.createElement("a");
    postAuthor.innerText = `@${post.author.name}`;
    postAuthor.classList.add("link-danger");
    postAuthor.href = `/profile/?id=${post.author.name}`;
    cardBody.appendChild(postAuthor);

    const divElement = document.createElement("div");
    divElement.classList.add("d-flex", "justify-content-between", "card-body");
    postCard.appendChild(divElement);

    const postComments = document.createElement("p");
    postComments.innerHTML = `<i class="fa-sharp fa-regular fa-heart" aria-hidden="true"> ${post._count.comments} </i>`;
    divElement.appendChild(postComments);

    const postReactions = document.createElement("p");
    postReactions.innerHTML = `<i class="fa-regular fa-comment" aria-hidden="true"> ${post._count.reactions} </i>`;
    divElement.appendChild(postReactions);
  };


export async function renderAllPosts(parentElement) {
  try {

    parentElement.innerHTML = "";
    const posts = await getPosts(); 
    
    posts.forEach(post => {
      createPostsHTML(post, parentElement);
    });
  } catch (error) {
    console.error("Error rendering posts:", error);
  }
};




export async function createProfileData(profiles, container) {
  // Create container for posts if not provided
  if (!container) {
    console.error("Container element is not provided.");
    return;
  }

  // Clear container
  container.innerHTML = "";

  // Iterate through posts
  profiles.forEach((profile) => {
    // Create post card element
    const cardWrap = document.createElement("a");
    cardWrap.classList.add("col-md-12", "col-lg-6", "mt-2", "mb-2");
    container.appendChild(cardWrap);

    // Create image element
    const profileAvatar = document.createElement("img");
    profileAvatar.classList.add("card-img-top");
    profileAvatar.alt = profile.avatar;
    profileAvatar.src = profile.avatar;
    cardWrap.appendChild(profileAvatar);

    // Check if post has media
    if (profileAvatar) {
      profileAvatar.src = profile.avatar;
    } else {
      // If no media available, set a default picture
      profileAvatar.src = "/images/dogpost.jpg"; // Replace "default-image.jpg" with your default image URL
    }
  });
}