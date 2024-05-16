import { getProfile, updateProfile } from "../api/profiles/index.mjs"

import { load } from "../storage/index.mjs"



/**
 * Sets up a listener on the profile edit form to handle profile updates.
 * 
 * This function:
 * - Loads the existing profile data from localStorage.
 * - Populates the form fields with the loaded data.
 * - Fetches additional profile data and fills in the corresponding fields.
 * - Adds a submit event listener to handle form submission.
 * - Updates the profile through the API and localStorage.
 * - Displays a success message and redirects the user to their profile page.
 * 
 * @async
 * @function updateProfileFormListener
 * @throws Will log an error message if the form element is not found or if the profile update process fails.
 */
export async function updateProfileFormListener() {
  const form = document.querySelector("#editProfile");

  if (form) {
    try {
      // Load profile data
      const { name, email } = load("profile");
      console.log("Loaded profile:", { name, email });
      
      // Populate form fields
      form.elements.name.value = name;
      form.elements.email.value = email;

      const button = form.querySelector("button");
      button.disabled = true;

      // Fetch additional profile data
      const profile = await getProfile(name);
      console.log("Fetched profile:", profile);

      form.elements.banner.value = profile.banner;
      form.elements.avatar.value = profile.avatar;

      button.disabled = false;

      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const updatedProfile = Object.fromEntries(formData.entries());

        // Preserve original name and email
        updatedProfile.name = name; 
        updatedProfile.email = email;

        // Send it to the API
        const response = await updateProfile(updatedProfile);

        // Update localStorage with new profile data
        const updatedLocalStorageProfile = {
          name: updatedProfile.name,
          email: updatedProfile.email,
          banner: updatedProfile.banner || profile.banner,
          avatar: updatedProfile.avatar || profile.avatar,
        };
        localStorage.setItem('profile', JSON.stringify(updatedLocalStorageProfile));

        // Display a message to indicate successful update
        const successMessage = document.createElement("p");
        successMessage.textContent = "Profile updated successfully!";
        successMessage.classList.add("text-success", "text-center");
        form.appendChild(successMessage);

        // Redirect to profile page after a short delay to show the success message
        setTimeout(() => {
          window.location.href = `/profile/?name=${updatedProfile.name}`;
        }, 1000);
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  } else {
    console.error("Form element not found.");
  }
}

