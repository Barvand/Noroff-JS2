import { getProfile, updateProfile } from "../api/profiles/index.mjs"

import { load } from "../storage/index.mjs"

export async function updateProfileFormListener() {
  const form = document.querySelector("#editProfile");

  if (form) {
     const { name, email } = load("profile");
      form.name.value = name;
      form.email.value = email;

    const button = form.querySelector("button");
    button.disabled = true;

    const profile = await getProfile(name); 

    form.banner.value = profile.banner;
    form.avatar.value = profile.avatar;

    button.disabled = false;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const profile = Object.fromEntries(formData.entries());


       profile.name = name; 
       profile.email = email; 

      // send it to the API
      updateProfile(profile)

      // Display a message to indicate successful update
      const successMessage = document.createElement("p");
      successMessage.textContent = "Post updated successfully!";
      successMessage.classList.add("text-success", "text-center");
      form.appendChild(successMessage);

      window.location.href = `/profile/?name=${profile.name}`;
    });
  }
}

