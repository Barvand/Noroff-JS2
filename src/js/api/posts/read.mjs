



    import { API_SOCIAL_URL } from "../constants.mjs";

    import { fetchToken } from "../fetchToken.mjs";

    const action = "/posts";
    const comment = "comment"; 
    const method = "post";
    const queryParams = "_author=true&_reactions=true&_comments=true";


 
export async function getPosts() {
  
  const getPostsURL = `${API_SOCIAL_URL}${action}?${queryParams}`;
  const response = await fetchToken(getPostsURL);
  const result = await response.json();
  return result;
}

export async function getPost(id) {
  if (!id) {
    throw new Error("GET requires a postID");
  }
  const getPostURL = `${API_SOCIAL_URL}${action}/${id}?${queryParams}`;
  const response = await fetchToken(getPostURL);
  return await response.json();
}




