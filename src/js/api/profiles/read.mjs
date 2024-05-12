import { API_SOCIAL_URL } from "../constants.mjs";
import { fetchToken } from "../fetchToken.mjs";

const action = "/profiles";
const method = "post";
const queryParams = "_followers=true&_following=true&_posts=true";
const getProfilePosts = "/posts"

export async function getProfiles(limit = 100, offset = 0) {
  const getProfileURL = `${API_SOCIAL_URL}${action}?${queryParams}&limit=${limit}&offset=${offset}`; 
  const response = await fetchToken(getProfileURL);
  const result = await response.json();
  return result;
}




export async function getProfile(name) {
  if (!name) {
    throw new Error("GET requires a profile name");
  }

  const getProfileURL = `${API_SOCIAL_URL}${action}/${name}?${queryParams}`;
  const response = await fetchToken(getProfileURL);

  return await response.json();
}
