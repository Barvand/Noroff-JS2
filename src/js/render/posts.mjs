import { getPosts } from "../api/posts/read.mjs";

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

export async function renderCompletePost(post, parentElement) {
  // Create post card anchor element
  const cardWrap = document.createElement("div");
  cardWrap.classList.add("col-md-12", "col-lg-6", "mt-2", "mb-2", "mx-auto");
  parentElement.appendChild(cardWrap);

  // Render post username and image
  renderPostUsernameAndImage(post, cardWrap);

  // Render post image
  renderPostImage(post, cardWrap);

  // Render post tags
  renderPostTags(post, cardWrap);

  // Render post card
  renderPostCard(post, cardWrap);

  renderCommentsAndReactions(post, cardWrap);
}


export async function renderPostUsernameAndImage(post, parentElement) {
const avatarFlexContainer = document.createElement("div");
avatarFlexContainer.classList.add(
  "d-flex",
  "p-1",
  "align-items-center",
  "name-tag",
  "bg-dark"
);
parentElement.appendChild(avatarFlexContainer);

// Avatar of the user
const postAvatar = document.createElement("img");
postAvatar.src = post.author.avatar;
postAvatar.href = post.author.name;
postAvatar.classList.add(
  "rounded-circle",
  "border-secondary",
  "border",
  "border-2",
  "profile-picture-posts"
);
avatarFlexContainer.appendChild(postAvatar);

// the name next to the avatar
const postAuthor = document.createElement("a");
postAuthor.innerText = `@${post.author.name}`;
postAuthor.classList.add("text-secondary", "fw-bold");
postAuthor.href = `/profile/?name=${post.author.name}`;
avatarFlexContainer.appendChild(postAuthor);

return avatarFlexContainer;
} 


export async function renderPostImage(post, parentElement) {
  const anchorTag = document.createElement("a"); 
  anchorTag.href = `/feed/post/?id=${post.id}`;

  // Create the image for the post
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

  parentElement.appendChild(anchorTag)
  anchorTag.appendChild(postImage);

  return anchorTag;
}

export async function renderPostTags(post, parentElement) {
  // Post tags
  const postTags = document.createElement("div");
  postTags.classList.add("post-tags");

  // Loop through the first two tags
  for (let i = 0; i < Math.min(post.tags.length, 2); i++) {
    const tag = document.createElement("span");
    tag.textContent = `#${post.tags[i]}`;
    tag.classList.add("badge", "bg-dark", "text-secondary", "fw-bold", "me-1");
    postTags.appendChild(tag);
  }

  parentElement.appendChild(postTags);
}

export async function renderPostCard(post, parentElement) {
    // The body of the card
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "p-1");
    parentElement.appendChild(cardBody);

    // Render post title
    renderPostTitle(post, cardBody);

    // Render post body
    renderPostBody(post, cardBody);

    // Render post date
    renderPostDate(post, cardBody);

    return cardBody;
}


export async function renderPostTitle(post, parentElement) {
  // Creates the title of the post
  const postTitle = document.createElement("h2");
  postTitle.classList.add(
    "display-6",
    "fw-bold",
    "text-uppercase",
    "fs-5"
  );
  postTitle.innerText = post.title;
  parentElement.appendChild(postTitle);
  return postTitle
}

export async function renderPostBody(post, parentElement) {
  const postBody = document.createElement("p");
  postBody.innerText = post.body;
  postBody.classList.add("fs-6");
  parentElement.appendChild(postBody);

  return postBody

}

export async function renderPostDate(post, parentElement) { 
const timestamp = new Date(post.created);
const day = timestamp.getDate();
const month = timestamp.getMonth() + 1; // Adding 1 because months are zero-based
const year = timestamp.getFullYear();

const formattedDate = `${day}/${month}/${year}`;

const postDate = document.createElement("p");
postDate.innerText = `Posted on ` + formattedDate;
postDate.classList.add("text-muted", "fst-italic");
parentElement.appendChild(postDate);

return postDate
}
 
export async function renderCommentsAndReactions(post, parentElement){ 
  const divElement = document.createElement("div");
  divElement.classList.add("d-flex", "justify-content-end","border-bottom", "border-black");
  parentElement.appendChild(divElement);

  const postComments = document.createElement("p");
  postComments.innerHTML = `<i class="fa-sharp fa-regular fa-heart" aria-hidden="true"> ${post._count.comments} </i>`;
  postComments.classList.add("me-2")
  divElement.appendChild(postComments);

  const postReactions = document.createElement("p");
  postReactions.innerHTML = `<i class="fa-regular fa-comment" aria-hidden="true"> ${post._count.reactions} </i>`;
  postComments.classList.add("ms-2");
  divElement.appendChild(postReactions);

  return divElement
}


export async function createPostsHTML(post, parentElement) { 
renderCompletePost(post, parentElement);
}