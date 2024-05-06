// import * as constants from "./api/constants.mjs";

// console.log(constants.API_SOCIAL_URL);

import * as listeners from "./handlers/index.mjs";
import * as postMethods from "./api/posts/index.mjs";
import * as render from "./render/index.mjs";
import { getProfiles } from "./api/profiles/read.mjs";
import { renderCompleteProfile } from "./render/index.mjs";

const path = location.pathname;

const feedContainer = document.querySelector("#feed-container");

if (path === "/profile/register/") {
  listeners.setRegisterFormListener();
} else if (path === "/profile/login/") {
  listeners.setLoginFormListener();
} else if (path === "/feed/post/create/") {
  listeners.setCreatePostFormListener();
} else if (path === "/feed/post/edit/") {
  listeners.setUpdatePostFormListener();
}

if (path === "/feed/") {
  render.renderAllPosts(feedContainer);
} else if (path === "/feed/post/") {
  render.renderSinglePost();
} else if (path === "/profiles") {
}

// PROFILE Pathing

if (path === "/profile/") {
  renderCompleteProfile();
}
