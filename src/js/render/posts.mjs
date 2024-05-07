import { getPosts } from "../api/posts/read.mjs";

export async function createPostsHTML(post, parentElement) {
  // Create post card anchor element
  const cardWrap = document.createElement("a");
  cardWrap.classList.add("col-md-12", "col-lg-6", "mt-2", "mb-2");
  cardWrap.href = `/feed/post/?id=${post.id}`;
  parentElement.appendChild(cardWrap);

  // Create post card div
  const postCard = document.createElement("div");
  postCard.classList.add("card", "my-custom-card", "h-100");
  cardWrap.appendChild(postCard);

  // Flex container for the avatar and the name of the profile.
  const avatarFlexContainer = document.createElement("div");
  avatarFlexContainer.classList.add("d-flex", "p-1", "align-items-center");
  postCard.appendChild(avatarFlexContainer);

  // Avatar of the user
  const postAvatar = document.createElement("img");
  postAvatar.src = post.author.avatar;
  postAvatar.href = post.author.name;
  postAvatar.classList.add(
    "rounded-circle",
    "border-white",
    "border",
    "border-2",
    "profile-picture-posts"
  );
  avatarFlexContainer.appendChild(postAvatar);

  // Author
  const postAuthor = document.createElement("a");
  postAuthor.innerText = `@${post.author.name}`;
  postAuthor.classList.add("link-danger");
  postAuthor.href = `/profile/?name=${post.author.name}`;
  avatarFlexContainer.appendChild(postAuthor);

  // Creates the image container 
  const imageContainer = document.createElement("div");
  imageContainer.classList.add("post-image-container");
  postCard.appendChild(imageContainer);

  // Create the image post
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

  imageContainer.appendChild(postImage);


  // Post tags
  const postTags = document.createElement("p");
  postTags.innerText = `#${post.tags}`;
  postTags.classList.add("border", "m-0", "post-tags");
  imageContainer.appendChild(postTags);

  // The body of the card
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  postCard.appendChild(cardBody);

  // Creates the title of the post
  const postTitle = document.createElement("h2");
  postTitle.classList.add("display-6");
  postTitle.innerText = post.title;
  cardBody.appendChild(postTitle);


  // post body text. 
  const postBody = document.createElement("p");
  postBody.innerText = post.body;
  cardBody.appendChild(postBody);

  const postId = document.createElement("p");
  postId.innerText = `This is just for convenience PostID` + post.id;
  cardBody.appendChild(postId);

  const timestamp = new Date(post.created);
  const day = timestamp.getDate();
  const month = timestamp.getMonth() + 1; // Adding 1 because months are zero-based
  const year = timestamp.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  const postDate = document.createElement("p");
  postDate.innerText = `Posted on ` + formattedDate;
  cardBody.appendChild(postDate);

  const divElement = document.createElement("div");
  divElement.classList.add("d-flex", "justify-content-between");
  cardBody.appendChild(divElement);

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




export async function createProfileData(profiles, parentElement) {
  // Create container for posts if not provided
  if (!parentElement) {
    console.error("parentElement is not provided."); 
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