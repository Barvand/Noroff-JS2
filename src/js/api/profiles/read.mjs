import { API_SOCIAL_URL } from "../constants.mjs";
import { fetchToken } from "../fetchToken.mjs";

const action = "/profiles";
const method = "post";
const queryParams = "_followers=true&_following=true&_posts=true";
const getProfilePosts = "/posts"

export async function getProfiles() {
  const getProfileURL = `${API_SOCIAL_URL}${action}?${queryParams}`;
  const response = await fetchToken(getProfileURL);
  const result =  await response.json();
   return result;
}




export async function getProfile(id) {
  if (!id) {
    throw new Error("GET requires a profile name");
  }

  const getProfileURL = `${API_SOCIAL_URL}${action}/${id}?${queryParams}`;
  const response = await fetchToken(getProfileURL);

  
  return await response.json();
}
