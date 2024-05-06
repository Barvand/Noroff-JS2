
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
    loggedInAs.innerText = name; 
}


renderSideMenu();