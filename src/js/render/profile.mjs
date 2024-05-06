import { getProfile } from "../api/profiles/read.mjs";
import { createPostsHTML } from "./posts.mjs";
import { createProfilePostsHTML } from "./profilePosts.mjs";


export async function createProfilePage(profile) {
  const wrapperContainer = document.querySelector("#profilePage");
  wrapperContainer.innerHTML = ""; // Clear existing content

  // Create container for profile
  const container = document.createElement("div");
  container.classList.add(
    "d-flex",
    "flex-column",
    "mx-auto",
    "col-12",
    "col-sm-12",
    "col-md-12",
    "col-lg-6"
  );
  wrapperContainer.appendChild(container);

  // Profile picture
  const pictureContainer = document.createElement("div");
  pictureContainer.classList.add("d-flex", "justify-content-center", "mt-2");

  const profilePicture = document.createElement("img");
  profilePicture.classList.add(
    "rounded-circle",
    "profile-picture-profile",
    "w-100",
    "border",
    "border-3",
    "border-success",
    "object-fit-cover"
  );

  // Check if the profile has an avatar
  if (profile.avatar) {
    profilePicture.src = profile.avatar;
    profilePicture.alt = "Profile-picture";
  } else {
    // If there's no avatar, use a default avatar image
    profilePicture.src = "/images/dogpost.jpg"; // Replace with your default avatar image URL
    profilePicture.alt = "Default-avatar";
  }

  pictureContainer.appendChild(profilePicture);
  container.appendChild(pictureContainer);

  // Profile name
  const nameContainer = document.createElement("div");
  nameContainer.classList.add("row");
  const profileName = document.createElement("h2");
  profileName.classList.add("text-center");
  profileName.innerText = `@${profile.name}`;
  nameContainer.appendChild(profileName);
  container.appendChild(nameContainer);

  // Stats: Posts, Followers, Following
  const statsContainer = document.createElement("div");
  statsContainer.classList.add(
    "container-fluid",
    "d-flex",
    "align-items-center",
    "mb-4"
  );

  const createStat = (label, value) => {
    const col = document.createElement("div");
    col.classList.add(
      "col",
      "col-sm-4",
      "border-end",
      "border-3",
      "border-primary"
    );

    const row = document.createElement("div");
    row.classList.add("row", "text-center");

    const statLabel = document.createElement("h4");
    statLabel.classList.add("m-0");
    statLabel.innerText = label;

    const statValue = document.createElement("p");
    statValue.classList.add("text-muted", "m-0");
    statValue.innerText = value;

    row.appendChild(statLabel);
    row.appendChild(statValue);
    col.appendChild(row);
    return col;
  };

  statsContainer.appendChild(createStat("Posts", profile.posts.length));
  statsContainer.appendChild(createStat("Followers", profile.followers.length));
  statsContainer.appendChild(createStat("Following", profile.following.length));
  container.appendChild(statsContainer);

  // Buttons: Follow, Message
  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("container-fluid", "d-flex");

  const followButton = document.createElement("button");
  followButton.classList.add("col-5", "btn", "btn-primary");
  followButton.type = "button";
  followButton.innerText = "Follow";
  buttonsContainer.appendChild(followButton);

  const messageButton = document.createElement("button");
  messageButton.classList.add("col-5", "offset-2", "btn", "btn-success");
  messageButton.type = "button";
  messageButton.innerText = "Message";
  buttonsContainer.appendChild(messageButton);

  container.appendChild(buttonsContainer);
}


export async function renderCompleteProfile() {
  // Get the query string from the URL
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);

  // Get the profile name from the query string
  const profileName = params.get("id");

  try {
    // Fetch the profile data based on the name
    const profile = await getProfile(profileName);

    // Render the profile with the fetched data
    createProfilePage(profile);
    createProfilePostsHTML(profile);

    // Pass the container ID as a string to renderAllPosts function
  } catch (error) {
    console.error("Error fetching or rendering profile:", error);
  }
}

