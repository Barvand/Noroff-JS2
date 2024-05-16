import * as listeners from "./handlers/index.mjs";
import * as filter from "./listeners/index.mjs";
import * as render from "./render/index.mjs";
import * as search from "./filters/index.mjs";
import { renderCompleteProfile } from "./render/index.mjs";

const path = location.pathname;

const feedContainer = document.querySelector("#feed-container");
const wrapperContainer = document.querySelector("#post-page-container");
const loadMoreBtn = document.querySelector("#feed-load-more-btn");

switch (path) {
  case "/profile/register/":
    listeners.setRegisterFormListener();
    break;
  case "/profile/login/":
    listeners.setLoginFormListener();
    break;
  case "/feed/post/create/":
    listeners.setCreatePostFormListener();
    render.renderSideMenu();
    render.renderProfileLinks();
    break;
  case "/feed/post/edit/":
    listeners.setUpdatePostFormListener();
    render.renderSideMenu();
    render.renderProfileLinks();
    break;
  case "/profile/edit/":
    listeners.updateProfileFormListener();
    render.renderSideMenu();
    render.renderProfileLinks();
    break;
  case "/feed/":
    render.createLoadMoreBtn(loadMoreBtn);
    search.searchBar();
    filter.createFeedFilteredArrays();
    render.renderSideMenu();
    render.renderProfileLinks();
    break;
  case "/feed/post/":
    render.renderSinglePost(wrapperContainer);
    render.renderSideMenu();
    render.renderProfileLinks();
    break;
  case "/profile/":
    renderCompleteProfile();
    render.renderSideMenu();
    render.renderProfileLinks();
    break;
 

}



