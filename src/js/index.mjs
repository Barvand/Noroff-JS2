import * as listeners from "./handlers/index.mjs";
import * as postMethods from "./api/posts/index.mjs";
import * as render from "./render/index.mjs";
import * as search from "./filters/index.mjs";
import { getProfiles } from "./api/profiles/read.mjs";
import { renderCompleteProfile } from "./render/index.mjs";

const path = location.pathname;

const feedContainer = document.querySelector ("#feed-container")

if (path === "/profile/register/") {
  listeners.setRegisterFormListener();
} else if (path === "/profile/login/") {
  listeners.setLoginFormListener();
} else if (path === "/feed/post/create/") {
  listeners.setCreatePostFormListener();
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
