
import * as listeners from "./handlers/index.mjs";
import * as filter from "./listeners/index.mjs"
import * as postMethods from "./api/posts/index.mjs";
import * as render from "./render/index.mjs";
import * as search from "./filters/index.mjs";
import { getProfiles } from "./api/profiles/read.mjs";
import { renderCompleteProfile } from "./render/index.mjs";
import { renderSideMenu } from "./render/index.mjs";

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
  search.searchBar();
  // This function calls 3 arrays with a click on the feedpage // New posts/Popular and Profiles. 
  filter.createFeedFilteredArrays();
} else if (path === "/feed/post/") {
  render.renderSinglePost(wrapperContainer);
}

// PROFILE Pathing

if (path === "/profile/") {
  renderCompleteProfile();
}

render.renderSideMenu();
render.renderProfileLinks();


