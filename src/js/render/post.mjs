import { getPost } from "../api/posts/read.mjs";
import { getProfile } from "../api/profiles/read.mjs";
// calling the individual post through this page instead of the index file. 
// As I did not figure out how yet. Due to the query parameters

export async function renderPost(post) {
  try {
    const wrapperContainer = document.querySelector("#post-page-container");

    const cardWrap = document.createElement("div");
    cardWrap.classList.add("col-md-12", "col-lg-6", "mt-2", "mb-2");
    cardWrap.href = `/feed/post/?id=${post.id}`;
    wrapperContainer.appendChild(cardWrap);

    const postCard = document.createElement("div");
    postCard.classList.add("card", "my-custom-card", "h-100");
    cardWrap.appendChild(postCard);

    // Create image element

    const postImage = document.createElement("img");
    postImage.classList.add("card-img-post");
    postImage.alt = post.title; // Assuming title is the property holding the image alt text

    // Check if post has media
    if (post.media) {
      postImage.src = post.media; // Assuming media is the property holding the image URL
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
    postTag.innerText = post.id;
    cardBody.appendChild(postTag);

  const postAvatar = document.createElement("img");
  postAvatar.src = post.author.avatar;
  postAvatar.classList.add(
    "rounded-circle",
    "border-success",
    "border",
    "border-3",
    "profile-picture-posts"
  );
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

    const editPost = document.createElement("a");
    editPost.classList.add("btn", "btn-success", "w-100", "mt-3");
    editPost.href = `/feed/post/edit/?id=${post.id}`;
    editPost.innerText = `Edit post`;
    cardWrap.appendChild(editPost);
  } catch (error) {
    console.error("Error rendering post:", error);
  }
}

export async function renderSinglePost() {
  // Get the post ID from the query string
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const id = params.get("id"); // Extract the ID from the query string
  try {
    // Fetch the post data based on the ID
    const post = await getPost(id);


    // Render the post with the fetched data
    renderPost(post);
  } catch (error) {
    console.error("Error fetching or rendering post:", error);
  }
}





// export function renderPostTemplate(postData) {
//   const post = document.createElement("div")
//   post.classList.add("col-md-12", "col-lg-7", "mt-2", "mb-2", "mx-auto");
//   post.innerText = postData.title

//   const postImage = document.createElement("img"); 
//   postImage.classList.add("card-img-top");
//   postImage.alt = postData.title
//   if (postData.media) {
//     postImage.src = postData.media;
//   } else {
//     postImage.src = "/images/holidaypicture.jpg";
    

//     post.appendChild(postImage); // Example of setting a default image source
//   }
//   return post
// }


// export function renderPost(postData, parent) {
//   parent.append(renderPostTemplate(postData))
// }



// export function renderPostTemplates(postDataList, parent) { 
//   parent.append(...postDataList.map(renderPostTemplate));
// }




