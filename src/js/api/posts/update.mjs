
    import { API_SOCIAL_URL } from "../constants.mjs";

    import { fetchToken } from "../fetchToken.mjs";

    const action = "/posts";
    const method = "put";

    export async function updatePost(postData) {
        if (!postData.id) { 
            throw new Error("Update required a postID ")
        }
        
      const updatePostURL = `${API_SOCIAL_URL}${action}/${postData.id}`;

      const response = await fetchToken(updatePostURL, {
        method,
        body: JSON.stringify(postData),
      })

      return await response.json();
    }