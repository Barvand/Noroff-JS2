
export async function renderSideMenu() {
  const currentUser = JSON.parse(localStorage.getItem("profile"));

  const avatar = currentUser.avatar;
  const username = currentUser.name;

  currentAvatar(avatar);
  currentUsername(username);
}


export async function currentAvatar(avatar) {
  const avatarImg = document.querySelector(".profile-picture-sidemenu");
  ("profile-picture-sidemenu");
  avatarImg.src = avatar;
  avatarImg.alt = "User Avatar";
}

export async function currentUsername(name)  { 
    const loggedInAs = document.querySelector("#currentUser");
    loggedInAs.classList.add("text-warning")
    loggedInAs.innerText = name; 
}

                 
export async function renderProfileLinks() { 
    const currentUser = JSON.parse(localStorage.getItem("profile"));
    const username = currentUser.name;

viewProfileLink(username);
editProfileLink(username); 
editProfileLinkMobile(username);
}

export async function viewProfileLink(username) { 
  const dropDownView = document.querySelector("#view-profile-link");
  dropDownView.href = `/profile/?name=${username}`
}

export async function editProfileLink(username) {
  const dropDownEdit = document.querySelector("#edit-profile-link");
  dropDownEdit.href = `/profile/edit/?name=${username}`;
}

export async function editProfileLinkMobile(username) { 
  const mobileMenuProfile = document.querySelector("#view-profile-link-mobile");
   mobileMenuProfile.href = `/profile/?name=${username}`;
}

