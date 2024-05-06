import { API_SOCIAL_URL } from "../constants.mjs";

import { fetchToken } from "../fetchToken.mjs";

const action = "/profiles";
const method = "put";

export async function updateProfile(profileData) {
  if (!profileData.name) {
    throw new Error("Update required a name");
  }

  const updateProfileURL = `${API_SOCIAL_URL}${action}/${profileData.name}/media`;

  const response = await fetchToken(updateProfileURL, {
    method,
    body: JSON.stringify(profileData),
  });


  return await response.json();
}
