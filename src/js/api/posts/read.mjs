



    import { API_SOCIAL_URL } from "../constants.mjs";

    import { fetchToken } from "../fetchToken.mjs";

    const action = "/posts";
    const method = "post";
    const queryParams = "_author=true&_reactions=true&_comments=true";


 
export async function getPosts(limit = 100, offset = 0) {
  try {
    const getPostsURL = `${API_SOCIAL_URL}${action}?${queryParams}&limit=${limit}&offset=${offset}`;
    const response = await fetchToken(getPostsURL);
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    return await response.json();

  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}

export async function getPost(id) {
  if (!id) {
    throw new Error("GET requires a postID");
  }
  const getPostURL = `${API_SOCIAL_URL}${action}/${id}?${queryParams}`;
  const response = await fetchToken(getPostURL);
  return await response.json();
}




