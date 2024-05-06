import * as listeners from "./handlers/index.mjs";


const path = location.pathname;

const feedContainer = document.querySelector("#feed-container");

if (path === "/profile/register/") {
  listeners.setRegisterFormListener();
} else if (path === "/profile/login/") {
  listeners.setLoginFormListener();
}

// } else if (path === "/feed/post/create/") {
// //   listeners.setCreatePostFormListener();
// // } else if (path === "/feed/post/edit/") {
// //   listeners.setUpdatePostFormListener();
// // }
