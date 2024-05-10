// import * as constants from "./api/constants.mjs";

// console.log(constants.API_SOCIAL_URL);

import * as listeners from "./handlers/index.mjs";
import * as postMethods from "./api/posts/index.mjs";
import * as render from "./render/index.mjs";
import * as search from "./filters/index.mjs";
import { getProfiles } from "./api/profiles/read.mjs";
import { renderCompleteProfile } from "./render/index.mjs";

const path = location.pathname;

const feedContainer = document.querySelector("#feed-container");
const wrapperContainer = document.querySelector("#post-page-container");
const loadMoreBtn = document.querySelector("#feed-load-more-btn");

if (path === "/profile/register/") {
  listeners.setRegisterFormListener();
} else if (path === "/profile/login/") {
  listeners.setLoginFormListener();
} else if (path === "/feed/post/create/") {
  listeners.setCreatePostFormListener();
} else if (path === "/feed/post/edit/") {
  listeners.setUpdatePostFormListener();
} else if (path === "/profile/edit/") {
  listeners.updateProfileFormListener();
}

if (path === "/feed/") {
  render.createLoadMoreBtn(loadMoreBtn);
  render.renderAllPosts(feedContainer); 
  search.searchBar();
} else if (path === "/feed/post/") {
  render.renderSinglePost(wrapperContainer);
} else if (path === "/profiles") {
}

// PROFILE Pathing

if (path === "/profile/") {
  renderCompleteProfile();
}


